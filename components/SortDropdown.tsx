'use client';

import { SortOption } from '@/lib/supabase';

interface SortDropdownProps {
  selected: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'rising', label: 'Rising' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'likes', label: 'Most Liked' },
];

export function SortDropdown({ selected, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-[#6B5B7A]">Sort:</span>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="
            appearance-none bg-white border-2 border-[#2D2438] rounded-lg
            pl-4 pr-10 py-2 text-sm font-bold text-[#2D2438]
            cursor-pointer hover:bg-[#FFF3CD]
            focus:outline-none focus:ring-0
            transition-colors shadow-[2px_2px_0px_#2D2438]
          "
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-[#2D2438]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
