'use client';

import { useState } from 'react';
import { ContentItem } from '@/lib/supabase';
import { EmbedPlayer } from './EmbedPlayer';

interface ContentCardProps {
  item: ContentItem;
}

const PLATFORM_STYLES: Record<string, { bg: string; label: string }> = {
  tiktok: { bg: 'bg-[#F5A623]', label: 'TikTok' },
  xiaohongshu: { bg: 'bg-[#FF9642]', label: '小红书' },
  youtube: { bg: 'bg-[#D4891A]', label: 'YouTube' },
};

export function ContentCard({ item }: ContentCardProps) {
  const [hidden, setHidden] = useState(false);
  const platformStyle = PLATFORM_STYLES[item.platform] || { bg: 'bg-[#6B5B7A]', label: item.platform };

  if (hidden) return null;

  return (
    <div className="group bg-white border-3 border-[#2D2438] rounded-2xl overflow-hidden shadow-[4px_4px_0px_#2D2438] hover:shadow-[6px_6px_0px_#2D2438] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer">
      {/* Media with platform badge */}
      <div className="relative border-b-3 border-[#2D2438]">
        <EmbedPlayer item={item} onThumbnailError={() => setHidden(true)} />

        {/* Platform badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 ${platformStyle.bg} border-2 border-[#2D2438] rounded-lg shadow-[2px_2px_0px_#2D2438]`}>
          <span className="text-xs font-bold text-white">{platformStyle.label}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Creator info */}
        <div className="flex items-center gap-3 mb-3">
          {item.creator_avatar ? (
            <img
              src={item.creator_avatar}
              alt={item.creator_name || 'Creator'}
              className="w-10 h-10 rounded-lg object-cover border-2 border-[#2D2438]"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#FFF3CD] border-2 border-[#2D2438] flex items-center justify-center">
              <span className="text-[#F5A623] text-sm font-black">
                {(item.creator_name || 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <a
              href={item.creator_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#2D2438] hover:text-[#F5A623] truncate block transition-colors cursor-pointer"
            >
              {item.creator_name || 'Unknown'}
            </a>
            <span className="text-xs font-semibold text-[#6B5B7A]">Creator</span>
          </div>
        </div>

        {/* Title/Description */}
        {(item.title || item.description) && (
          <p className="text-sm text-[#6B5B7A] font-medium line-clamp-2 mb-4 leading-relaxed">
            {item.title || item.description}
          </p>
        )}

        {/* Stats with 2D styling */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Likes */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF3CD] border-2 border-[#2D2438] rounded-lg cursor-pointer hover:bg-[#FFE4A0] transition-colors">
            <svg className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-xs font-bold text-[#2D2438]">{formatNumber(item.likes)}</span>
          </div>

          {/* Comments */}
          {item.comments !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8D5FF] border-2 border-[#2D2438] rounded-lg cursor-pointer hover:bg-[#D4BBFF] transition-colors">
              <svg className="w-4 h-4 text-[#9F7AEA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span className="text-xs font-bold text-[#2D2438]">{formatNumber(item.comments)}</span>
            </div>
          )}

          {/* Views */}
          {item.views !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D1F5EA] border-2 border-[#2D2438] rounded-lg cursor-pointer hover:bg-[#B3EDD9] transition-colors">
              <svg className="w-4 h-4 text-[#38C99A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <span className="text-xs font-bold text-[#2D2438]">{formatNumber(item.views)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
