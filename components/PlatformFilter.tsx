'use client';

import { Platform } from '@/lib/supabase';

type FilterOption = Platform | 'all';

interface PlatformFilterProps {
  selected: FilterOption;
  onChange: (platform: FilterOption) => void;
}

const PLATFORMS: { value: FilterOption; label: string; activeColor: string }[] = [
  { value: 'all', label: 'All Cats', activeColor: 'bg-[#2D2438] text-white' },
  { value: 'tiktok', label: 'TikTok', activeColor: 'bg-[#F5A623] text-white' },
  { value: 'xiaohongshu', label: '小红书', activeColor: 'bg-[#FF9642] text-white' },
  { value: 'youtube', label: 'YouTube', activeColor: 'bg-[#D4891A] text-white' },
];

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {PLATFORMS.map(({ value, label, activeColor }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-bold cursor-pointer
            transition-all duration-150 border-2 border-[#2D2438]
            ${selected === value
              ? `${activeColor} shadow-[2px_2px_0px_#2D2438]`
              : 'bg-white text-[#2D2438] hover:bg-[#FFF3CD] shadow-[2px_2px_0px_#2D2438] hover:shadow-[3px_3px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px]'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
