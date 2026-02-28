'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ContentItem, Platform, SortOption } from '@/lib/supabase';
import { ContentCard } from './ContentCard';
import { ContentCardSkeleton } from './ContentCardSkeleton';

interface ContentGridProps {
  platform: Platform | 'all';
  sort: SortOption;
}

interface ApiResponse {
  items: ContentItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

// Two-layer cache: promises (for dedup) + resolved data (for instant access)
const promiseCache = new Map<string, Promise<ApiResponse>>();
const dataCache = new Map<string, ApiResponse>();

function cacheKey(platform: string, sort: string) {
  return `${platform}:${sort}`;
}

function prefetch(platform: string, sort: string) {
  const key = cacheKey(platform, sort);
  if (promiseCache.has(key)) return;
  const params = new URLSearchParams({ platform, sort, limit: '20' });
  const promise = fetch(`/api/content?${params}`)
    .then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); })
    .then((data: ApiResponse) => { dataCache.set(key, data); return data; });
  promiseCache.set(key, promise);
}

const PLATFORMS = ['all', 'tiktok', 'xiaohongshu', 'youtube'];

// Start preloading immediately when this module loads (before any component mounts)
if (typeof window !== 'undefined') {
  PLATFORMS.forEach(p => prefetch(p, 'recent'));
}

export function ContentGrid({ platform, sort }: ContentGridProps) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Preload all tabs when sort changes
  useEffect(() => {
    PLATFORMS.forEach(p => prefetch(p, sort));
  }, [sort]);

  const loadMore = useCallback(async () => {
    if (!cursor || loadingMore) return;

    setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        platform,
        sort,
        limit: '20',
        cursor,
      });

      const response = await fetch(`/api/content?${params}`);
      if (!response.ok) throw new Error('Failed to fetch content');

      const data: ApiResponse = await response.json();

      setItems(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = data.items.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingMore(false);
    }
  }, [platform, sort, cursor, loadingMore]);

  useEffect(() => {
    let cancelled = false;
    const key = cacheKey(platform, sort);

    // If retry, clear caches to force fresh fetch
    if (retryCount > 0) {
      promiseCache.delete(key);
      dataCache.delete(key);
    }

    // Instant path: data already resolved in cache — no loading spinner
    const cached = dataCache.get(key);
    if (cached) {
      setItems(cached.items);
      setCursor(cached.nextCursor);
      setHasMore(cached.hasMore);
      setLoading(false);
      setError(null);
      return;
    }

    // Async path: show loading, await promise
    setLoading(true);
    setError(null);
    prefetch(platform, sort);
    promiseCache.get(key)!.then(data => {
      if (cancelled) return;
      setItems(data.items);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    }).catch(err => {
      if (cancelled) return;
      promiseCache.delete(key);
      dataCache.delete(key);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [platform, sort, retryCount]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (document.body.dataset.pauseScroll) return;
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasMore, loadingMore, loading, loadMore]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ContentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFF3CD] border-3 border-[#2D2438] rounded-2xl shadow-[4px_4px_0px_#2D2438] mb-6">
          <svg className="w-10 h-10 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 className="text-xl font-black text-[#2D2438] mb-2">Oops! Something went wrong</h3>
        <p className="text-[#6B5B7A] font-medium text-sm mb-6 max-w-xs mx-auto">{error}</p>
        <button
          onClick={() => setRetryCount(c => c + 1)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5A623] text-white text-sm font-bold border-2 border-[#2D2438] rounded-xl shadow-[3px_3px_0px_#2D2438] hover:shadow-[4px_4px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Try Again
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFF3CD] border-3 border-[#2D2438] rounded-2xl shadow-[4px_4px_0px_#2D2438] mb-6">
          <svg className="w-10 h-10 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="17" rx="5" ry="4"/>
            <circle cx="6.5" cy="10" r="2.5"/>
            <circle cx="17.5" cy="10" r="2.5"/>
            <circle cx="9" cy="6" r="2"/>
            <circle cx="15" cy="6" r="2"/>
          </svg>
        </div>
        <h3 className="text-xl font-black text-[#2D2438] mb-2">No cuties found yet</h3>
        <p className="text-[#6B5B7A] font-medium text-sm max-w-xs mx-auto">
          Check back soon for adorable cat videos!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-24 flex items-center justify-center">
        {loadingMore && (
          <div className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#2D2438] rounded-xl shadow-[3px_3px_0px_#2D2438]">
            <svg className="animate-spin w-5 h-5 text-[#F5A623]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm font-bold text-[#2D2438]">Finding more cuties...</span>
          </div>
        )}
        {!hasMore && items.length > 0 && (
          <div className="flex items-center gap-2 text-[#6B5B7A] text-sm font-bold">
            <svg className="w-5 h-5 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="12" cy="17" rx="5" ry="4"/>
              <circle cx="6.5" cy="10" r="2.5"/>
              <circle cx="17.5" cy="10" r="2.5"/>
              <circle cx="9" cy="6" r="2"/>
              <circle cx="15" cy="6" r="2"/>
            </svg>
            <span>You&apos;ve seen all the cuties!</span>
          </div>
        )}
      </div>
    </>
  );
}
