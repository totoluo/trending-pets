import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

export async function GET() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({
      status: 'not_configured',
      error: 'Database credentials not set',
      totalActiveItems: 0,
      lastScrapes: {},
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  }

  try {
    // Get last successful scrape time for each platform
    const { data: scrapeRuns, error } = await supabase
      .from('scrape_runs')
      .select('platform, completed_at, status, items_found')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json({
        status: 'degraded',
        error: error.message,
        lastScrapes: {},
      }, { status: 200 });
    }

    // Group by platform to get latest for each
    const lastScrapes: Record<string, { completedAt: string; itemsFound: number }> = {};
    for (const run of scrapeRuns || []) {
      if (!lastScrapes[run.platform]) {
        lastScrapes[run.platform] = {
          completedAt: run.completed_at,
          itemsFound: run.items_found,
        };
      }
    }

    // Get total content count
    const { count } = await supabase
      .from('content_items')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    return NextResponse.json({
      status: 'healthy',
      totalActiveItems: count || 0,
      lastScrapes,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    return NextResponse.json({
      status: 'error',
      error: 'Failed to check health',
    }, { status: 500 });
  }
}
