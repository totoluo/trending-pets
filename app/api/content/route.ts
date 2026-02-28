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
    const buildQuery = (daysCutoff: number, withTimeFilter: boolean) => {
      let q = supabase
        .from('content_items')
        .select('*')
        .eq('is_active', true);

      if (withTimeFilter) {
        const cutoff = new Date(Date.now() - daysCutoff * 86400000).toISOString();
        q = q.or(`published_at.gte.${cutoff},published_at.is.null`);
      }

      // Platform filter
      if (platform && platform !== 'all') {
        q = q.eq('platform', platform as Platform);
      }

      // Sort order
      switch (sort) {
        case 'trending':
          // Minimum score threshold to hide low-quality long tail
          q = q.gt('trending_score', 3).order('trending_score', { ascending: false });
          break;
        case 'recent':
          q = q.order('scraped_at', { ascending: false });
          break;
        case 'likes':
          q = q.order('likes', { ascending: false });
          break;
        case 'rising':
          // Require real previous data and meaningful growth
          q = q
            .not('prev_scraped_at', 'is', null)
            .gt('prev_likes', 0)
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

      return q.limit(limit);
    };

    let data;
    let error;

    // Trending uses 30-day window; other sorts try 30 days with fallback
    const result = await buildQuery(30, true);
    if (result.error) {
      const fallback = await buildQuery(30, false);
      data = fallback.data;
      error = fallback.error;
    } else {
      data = result.data;
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
    }

    // Determine next cursor
    const nextCursor = data && data.length === limit
      ? data[data.length - 1].id
      : null;

    return NextResponse.json({
      items: data || [],
      nextCursor,
      hasMore: !!nextCursor,
    });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ items: [], nextCursor: null, hasMore: false });
  }
}
