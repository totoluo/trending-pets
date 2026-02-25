'use client';

import { useState } from 'react';
import { Platform, SortOption } from '@/lib/supabase';
import { PlatformFilter } from '@/components/PlatformFilter';
import { SortDropdown } from '@/components/SortDropdown';
import { ContentGrid } from '@/components/ContentGrid';
import { LastUpdated } from '@/components/LastUpdated';

export default function Home() {
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('trending');

  return (
    <>
      {/* Hero Section - 2D style */}
      <section className="relative overflow-hidden bg-[#FFE0ED] border-b-3 border-[#2D2438]">
        {/* Decorative shapes */}
        <div className="absolute top-8 left-12 w-16 h-16 bg-[#FFB067] border-3 border-[#2D2438] rounded-full"></div>
        <div className="absolute top-24 right-16 w-12 h-12 bg-[#B794F6] border-3 border-[#2D2438] rounded-lg rotate-12"></div>
        <div className="absolute bottom-12 left-1/4 w-10 h-10 bg-[#5AD9B3] border-3 border-[#2D2438] rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-8 h-8 bg-[#FF5C9D] border-2 border-[#2D2438] rounded-lg -rotate-12"></div>

        {/* Paw prints */}
        <div className="absolute top-16 right-1/3">
          <svg className="w-10 h-10 text-[#2D2438] opacity-10" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="17" rx="5" ry="4"/>
            <circle cx="6.5" cy="10" r="2.5"/>
            <circle cx="17.5" cy="10" r="2.5"/>
            <circle cx="9" cy="6" r="2"/>
            <circle cx="15" cy="6" r="2"/>
          </svg>
        </div>
        <div className="absolute bottom-24 left-1/3 rotate-[-15deg]">
          <svg className="w-8 h-8 text-[#2D2438] opacity-10" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="17" rx="5" ry="4"/>
            <circle cx="6.5" cy="10" r="2.5"/>
            <circle cx="17.5" cy="10" r="2.5"/>
            <circle cx="9" cy="6" r="2"/>
            <circle cx="15" cy="6" r="2"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 relative">
          <div className="text-center max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#2D2438] rounded-full shadow-[3px_3px_0px_#2D2438] mb-6">
              <span className="w-2 h-2 bg-[#5AD9B3] border border-[#2D2438] rounded-full"></span>
              <span className="text-sm font-bold text-[#2D2438]">Updated daily with fresh content</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2438] mb-6 leading-tight tracking-tight">
              Discover the Cutest
              <span className="block text-[#FF5C9D]">Pet Videos</span>
            </h1>

            <p className="text-lg text-[#6B5B7A] mb-10 leading-relaxed font-medium">
              Your daily dose of adorable cats, dogs, and pets from
              <span className="text-[#FF5C9D] font-bold"> TikTok</span>,
              <span className="text-[#FF9642] font-bold"> 小红书</span>, and
              <span className="text-[#E8458A] font-bold"> YouTube</span>
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StatBadge value="50+" label="Cute Videos" color="pink" />
              <StatBadge value="Daily" label="Updates" color="orange" />
              <StatBadge value="3" label="Platforms" color="purple" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <LastUpdated />

        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-[#FF5C9D] border-2 border-[#2D2438] rounded-sm"></div>
          <h2 className="text-2xl font-black text-[#2D2438] tracking-tight">Trending Now</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-3 border-[#2D2438] rounded-2xl shadow-[4px_4px_0px_#2D2438]">
          <PlatformFilter selected={platform} onChange={setPlatform} />
          <SortDropdown selected={sort} onChange={setSort} />
        </div>

        <ContentGrid platform={platform} sort={sort} />
      </div>
    </>
  );
}

function StatBadge({ value, label, color }: { value: string; label: string; color: 'pink' | 'orange' | 'purple' }) {
  const colors = {
    pink: 'bg-[#FF5C9D]',
    orange: 'bg-[#FFB067]',
    purple: 'bg-[#B794F6]',
  };

  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white border-3 border-[#2D2438] rounded-xl shadow-[3px_3px_0px_#2D2438]">
      <div className={`w-3 h-3 ${colors[color]} border-2 border-[#2D2438] rounded-full`}></div>
      <div className="text-left">
        <div className="text-xl font-black text-[#2D2438]">{value}</div>
        <div className="text-xs font-bold text-[#6B5B7A] uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}
