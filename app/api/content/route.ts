import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Platform, SortOption } from '@/lib/supabase';

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
      .or(`published_at.gte.${publishCutoff},published_at.is.null`);

    // Platform filter
    if (platform && platform !== 'all') {
      q = q.eq('platform', platform as Platform);
    }

    // Sort order
    switch (sort) {
      case 'trending':
        q = q.gt('trending_score', 1).order('trending_score', { ascending: false });
        break;
      case 'recent':
        q = q.order('scraped_at', { ascending: false });
        break;
      case 'likes':
        q = q.order('likes', { ascending: false });
        break;
      case 'rising':
        q = q
          .not('prev_scraped_at', 'is', null)
          .gt('growth_score', 0)
          .order('growth_score', { ascending: false });
        break;
      default:
        q = q.order('trending_score', { ascending: false });
    }

    // Cursor-based pagination
    if (cursor) {
      q = q.lt('id', cursor);
    }

    const { data, error } = await q.limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
    }

    // Determine next cursor
    const nextCursor = data && data.length === limit
      ? data[data.length - 1].id
      : null;

    // Get total count (same 30-day published_at window)
    let totalCount: number | null = null;
    try {
      const countResult = await supabase
        .from('content_items')
        .select('*', { count: 'exact', head: true })
        .or(`published_at.gte.${publishCutoff},published_at.is.null`);
      totalCount = countResult.count;
    } catch { /* ignore */ }

    return NextResponse.json({
      items: data || [],
      nextCursor,
      hasMore: !!nextCursor,
      totalCount,
    });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
  }
}
