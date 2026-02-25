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
    let query = supabase
      .from('content_items')
      .select('*')
      .eq('is_active', true);

    // Platform filter
    if (platform && platform !== 'all') {
      query = query.eq('platform', platform as Platform);
    }

    // Sort order
    switch (sort) {
      case 'trending':
        query = query.order('trending_score', { ascending: false });
        break;
      case 'recent':
        query = query.order('scraped_at', { ascending: false });
        break;
      case 'likes':
        query = query.order('likes', { ascending: false });
        break;
      default:
        query = query.order('trending_score', { ascending: false });
    }

    // Cursor-based pagination
    if (cursor) {
      query = query.lt('id', cursor);
    }

    // Limit results
    query = query.limit(limit);

    const { data, error } = await query;

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
