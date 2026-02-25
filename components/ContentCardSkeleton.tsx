'use client';

export function ContentCardSkeleton() {
  return (
    <div className="bg-white border-3 border-[#2D2438] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#2D2438]">
      <div className="aspect-[4/5] bg-[#FFE0ED] animate-pulse border-b-3 border-[#2D2438]" />

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-[#FFC2DB] border-2 border-[#2D2438] animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#FFE0ED] border border-[#E8D5E0] rounded w-24 animate-pulse" />
            <div className="h-3 bg-[#FFE0ED] border border-[#E8D5E0] rounded w-16 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-3 bg-[#FFE0ED] border border-[#E8D5E0] rounded w-full animate-pulse" />
          <div className="h-3 bg-[#FFE0ED] border border-[#E8D5E0] rounded w-3/4 animate-pulse" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 bg-[#FFE0ED] border-2 border-[#2D2438] rounded-lg w-16 animate-pulse" />
          <div className="h-8 bg-[#E8D5FF] border-2 border-[#2D2438] rounded-lg w-16 animate-pulse" />
          <div className="h-8 bg-[#D1F5EA] border-2 border-[#2D2438] rounded-lg w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
