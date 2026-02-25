import { ContentCardSkeleton } from '@/components/ContentCardSkeleton';

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero skeleton */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-pink-100 animate-pulse" />
          <div className="h-10 bg-gray-100 rounded-lg w-48 animate-pulse" />
        </div>
        <div className="h-6 bg-gray-100 rounded-lg w-96 animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-16 bg-white rounded-md animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-32 bg-white border border-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ContentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
