import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Platform, SortOption } from '@/lib/supabase';

// Validate whether a video URL is still accessible
async function isVideoAccessible(item: { platform: string; url: string }): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    let res: Response;
    if (item.platform === 'tiktok') {
      res = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(item.url)}`,
        { signal: controller.signal },
      );
    } else if (item.platform === 'youtube') {
      res = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(item.url)}&format=json`,
        { signal: controller.signal },
      );
    } else if (item.platform === 'xiaohongshu') {
      // Can't do network check (XHS blocks server requests), so validate URL pattern
      // Valid XHS note IDs are 24 hex characters
      const match = item.url.match(/\/explore\/([a-f0-9]+)/);
      clearTimeout(timeout);
      return !!match && match[1].length >= 24;
    } else {
      clearTimeout(timeout);
      return true;
    }

    clearTimeout(timeout);
    return res.ok;
  } catch {
    // Timeout or network error — assume valid to avoid over-filtering
    return true;
  }
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query parameters
  const platform = searchParams.get('platform') || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'trending';
  const cursor = searchParams.get('cursor');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

  const supabase = getSupabaseClient();

  // Return empty if no database configured
  if (!supabase) {
    return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
  }

  try {
    // published_at: original content within 30 days
    // scraped_at: no filter — show all accumulated crawled data
    const publishCutoff = new Date(Date.now() - 30 * 86400000).toISOString();

    let q = supabase
      .from('content_items')
      .select('*')
      .or(`published_at.gte.${publishCutoff},published_at.is.null`)
      .not('url', 'is', null)
      .neq('url', '')
      .not('thumbnail_url', 'is', null)
      .gt('likes', 0)
      .or('comments.gt.0,comments.is.null');

    // Platform filter
    if (platform && platform !== 'all') {
      q = q.eq('platform', platform as Platform);
    }

    // Require views > 0 for platforms that track views (TikTok, YouTube)
    // XHS doesn't have view counts, so skip for XHS and 'all'
    if (platform === 'tiktok' || platform === 'youtube') {
      q = q.gt('views', 0);
    } else if (platform === 'all') {
      q = q.or('views.gt.0,platform.eq.xiaohongshu');
    }

    // Sort order
    switch (sort) {
      case 'trending':
        q = q.gt('trending_score', 0).order('trending_score', { ascending: false });
        break;
      case 'recent':
        q = q.order('scraped_at', { ascending: false });
        break;
      case 'likes':
        q = q.order('likes', { ascending: false });
        break;
      case 'rising':
        q = q.gt('growth_score', 0).order('growth_score', { ascending: false });
        break;
      default:
        q = q.order('trending_score', { ascending: false });
    }

    // Cursor-based pagination
    if (cursor) {
      q = q.lt('id', cursor);
    }

    // Over-fetch to compensate for items filtered out by URL validation
    const fetchLimit = Math.ceil(limit * 1.5);
    const { data, error } = await q.limit(fetchLimit);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
    }

    // Validate URLs in parallel — filter out private/deleted videos
    const results = await Promise.all(
      (data || []).map(async (item) => ({
        item,
        valid: await isVideoAccessible(item),
      })),
    );
    const validItems = results.filter((r) => r.valid).map((r) => r.item);
    const items = validItems.slice(0, limit);

    const nextCursor = items.length === limit ? items[items.length - 1].id : null;

    return NextResponse.json({
      items,
      nextCursor,
      hasMore: !!nextCursor,
    });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
  }
}
