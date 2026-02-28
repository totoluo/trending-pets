'use client';

import { Platform } from '@/lib/supabase';
import { ReactNode } from 'react';

type FilterOption = Platform | 'all';

interface PlatformFilterProps {
  selected: FilterOption;
  onChange: (platform: FilterOption) => void;
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.79a4.85 4.85 0 01-1-.1z"/>
    </svg>
  );
}

function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF2442">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5h-2V11h-2V9h4v7.5zm5 0h-2v-4h-2v-2h4v6z"/>
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19 31.68 31.68 0 000 12a31.68 31.68 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.68 31.68 0 0024 12a31.68 31.68 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  );
}

function AllIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F5A623">
      <ellipse cx="12" cy="17" rx="5" ry="4"/>
      <circle cx="6.5" cy="10" r="2.5"/>
      <circle cx="17.5" cy="10" r="2.5"/>
      <circle cx="9" cy="6" r="2"/>
      <circle cx="15" cy="6" r="2"/>
    </svg>
  );
}

const PLATFORMS: { value: FilterOption; label: string; icon: ReactNode; activeColor: string }[] = [
  { value: 'all', label: 'All', icon: <AllIcon className="w-4 h-4" />, activeColor: 'bg-[#2D2438] text-white' },
  { value: 'tiktok', label: 'TikTok', icon: <TikTokIcon className="w-4 h-4" />, activeColor: 'bg-[#F5A623] text-white' },
  { value: 'xiaohongshu', label: '小红书', icon: <XiaohongshuIcon className="w-4 h-4" />, activeColor: 'bg-[#FF9642] text-white' },
  { value: 'youtube', label: 'YouTube', icon: <YouTubeIcon className="w-4 h-4" />, activeColor: 'bg-[#D4891A] text-white' },
];

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:max-w-md">
      {PLATFORMS.map(({ value, label, icon, activeColor }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold cursor-pointer
            transition-all duration-150 border-2 border-[#2D2438]
            ${selected === value
              ? `${activeColor} shadow-[2px_2px_0px_#2D2438]`
              : 'bg-white text-[#2D2438] hover:bg-[#FFF3CD] shadow-[2px_2px_0px_#2D2438] hover:shadow-[3px_3px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px]'
            }
          `}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}
