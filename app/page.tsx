'use client';

import { useState } from 'react';
import { Platform, SortOption } from '@/lib/supabase';
import { PlatformFilter } from '@/components/PlatformFilter';
import { SortDropdown } from '@/components/SortDropdown';
import { ContentGrid } from '@/components/ContentGrid';

export default function Home() {
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('recent');

  return (
    <>
      {/* Hero Section - 2D style */}
      <section className="relative overflow-hidden bg-[#FFF3CD] border-b-3 border-[#2D2438]">
        {/* Decorative cat shapes - behind text */}
        <div className="absolute z-0 top-8 left-12 w-16 h-16 bg-[#FF9CB8] border-3 border-[#2D2438] rounded-full flex items-center justify-center overflow-hidden">
          <img src="/cats/sitting.png" alt="" className="w-12 h-12 object-contain" />
        </div>
        <div className="absolute z-0 top-24 right-16 w-14 h-14 bg-[#B794F6] border-3 border-[#2D2438] rounded-lg rotate-12 flex items-center justify-center overflow-hidden">
          <img src="/cats/playful.png" alt="" className="w-10 h-10 object-contain -rotate-12" />
        </div>
        <div className="absolute z-0 bottom-12 left-1/4 w-12 h-12 bg-[#5AD9B3] border-3 border-[#2D2438] rounded-full flex items-center justify-center overflow-hidden">
          <img src="/cats/curious.png" alt="" className="w-9 h-9 object-contain" />
        </div>
        <div className="absolute z-0 bottom-20 right-1/4 w-12 h-12 bg-[#7EB8DA] border-2 border-[#2D2438] rounded-lg -rotate-12 flex items-center justify-center overflow-hidden">
          <img src="/cats/sleeping.png" alt="" className="w-9 h-9 object-contain rotate-12" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto bg-white/40 backdrop-blur-sm rounded-3xl px-6 sm:px-10 py-8 sm:py-10">
            {/* Main heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2D2438] mb-4 sm:mb-6 leading-tight tracking-tight">
              Discover the Cutest
              <span className="block text-[#F5A623]">Cat Videos</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B5B7A] mb-6 sm:mb-8 leading-relaxed font-medium">
              I watch way too many cat videos, so I built this to bring the best ones from
              <span className="text-[#F5A623] font-bold"> TikTok</span>,
              <span className="text-[#FF9642] font-bold"> 小红书</span>, and
              <span className="text-[#D4891A] font-bold"> YouTube</span>
              — all in one place.
            </p>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-[#F5A623] border-2 border-[#2D2438] rounded-sm"></div>
          <h2 className="text-2xl font-black text-[#2D2438] tracking-tight">Trending Now</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-3 border-[#2D2438] rounded-2xl shadow-[4px_4px_0px_#2D2438]">
          <PlatformFilter selected={platform} onChange={setPlatform} />
          <SortDropdown selected={sort} onChange={setSort} />
        </div>

        <ContentGrid platform={platform} sort={sort} />
      </div>

      {/* Guestbook / Thoughts */}
      <div id="guestbook" className="max-w-6xl mx-auto px-6 pb-10">
        <div className="bg-white border-3 border-[#2D2438] rounded-2xl shadow-[4px_4px_0px_#2D2438] p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-8 bg-[#B794F6] border-2 border-[#2D2438] rounded-sm"></div>
            <h2 className="text-2xl font-black text-[#2D2438] tracking-tight">Thoughts Welcome</h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B5B7A] font-medium mb-6 max-w-md mx-auto">
            Have ideas, feedback, or just want to share your favorite cat? Leave a message — I'd love to hear from you.
          </p>
          <a
            href="https://github.com/totoluo/trending-pets/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B794F6] text-white text-sm font-bold border-2 border-[#2D2438] rounded-xl shadow-[3px_3px_0px_#2D2438] hover:shadow-[4px_4px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
            </svg>
            Leave a Message
          </a>
        </div>
      </div>
    </>
  );
}
