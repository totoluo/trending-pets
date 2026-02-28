'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { ContentItem } from '@/lib/supabase';

interface EmbedPlayerProps {
  item: ContentItem;
}

export function EmbedPlayer({ item }: EmbedPlayerProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowEmbed(false);
    setEmbedError(false);
  }, [item.id]);

  useEffect(() => {
    if (!showEmbed || !item.embed_code) return;

    const loadScript = (src: string) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    if (item.platform === 'tiktok') {
      loadScript('https://www.tiktok.com/embed.js');
    }
  }, [showEmbed, item.embed_code, item.platform]);

  const sanitizedEmbed = item.embed_code
    ? DOMPurify.sanitize(item.embed_code, {
        ADD_TAGS: ['iframe', 'blockquote', 'script'],
        ADD_ATTR: ['data-instgrm-permalink', 'data-instgrm-version', 'data-video-id', 'cite', 'allow', 'allowfullscreen'],
        ALLOW_DATA_ATTR: true,
      })
    : '';

  const showThumbnailFallback = !item.embed_code || embedError || !showEmbed;

  if (showThumbnailFallback) {
    return (
      <div className="relative aspect-[4/5] bg-gradient-to-br from-pink-50 to-gray-50 overflow-hidden group">
        {item.thumbnail_url ? (
          <Image
            src={item.thumbnail_url}
            alt={item.title || item.description || 'Cat video'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setEmbedError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-50">🐱</span>
          </div>
        )}

        {/* Clickable overlay - plays embed or opens original URL */}
        {item.embed_code && !embedError ? (
          <button
            onClick={() => setShowEmbed(true)}
            className="
              absolute inset-0 flex items-center justify-center
              bg-black/0 group-hover:bg-black/20
              transition-all duration-200 cursor-pointer
            "
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-100 scale-90">
              <svg className="w-6 h-6 text-[#F5A623] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        ) : (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-200 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-100 scale-90">
              <svg className="w-6 h-6 text-[#F5A623] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>
        )}

        {/* Platform badge */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/90 text-gray-600 backdrop-blur-sm shadow-sm">
            {getPlatformIcon(item.platform)} {getPlatformLabel(item.platform)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] bg-gray-50 overflow-hidden"
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: sanitizedEmbed }}
      />

      <button
        onClick={() => setShowEmbed(false)}
        className="
          absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-md
          bg-white/90 text-gray-500 flex items-center justify-center
          hover:bg-pink-500 hover:text-white transition-colors shadow-sm
        "
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function getPlatformIcon(platform: string): string {
  switch (platform) {
    case 'tiktok': return '🎵';
    case 'xiaohongshu': return '📕';
    case 'youtube': return '▶️';
    default: return '🌐';
  }
}

function getPlatformLabel(platform: string): string {
  switch (platform) {
    case 'tiktok': return 'TikTok';
    case 'xiaohongshu': return '小红书';
    case 'youtube': return 'YouTube';
    default: return platform;
  }
}
