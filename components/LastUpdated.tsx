'use client';

import { useState, useEffect } from 'react';

interface HealthStatus {
  status: string;
  totalActiveItems: number;
  lastScrapes: Record<string, { completedAt: string; itemsFound: number }>;
  timestamp: string;
}

export function LastUpdated() {
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        }
      } catch {
        // Silently fail
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!health) return null;

  const lastScrape = Object.values(health.lastScrapes).reduce((latest, current) => {
    if (!latest || new Date(current.completedAt) > new Date(latest.completedAt)) {
      return current;
    }
    return latest;
  }, null as { completedAt: string; itemsFound: number } | null);

  if (!lastScrape) return null;

  const lastUpdated = new Date(lastScrape.completedAt);
  const now = new Date();
  const diffMs = now.getTime() - lastUpdated.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  let timeAgo: string;
  if (diffMins < 1) {
    timeAgo = 'just now';
  } else if (diffMins < 60) {
    timeAgo = `${diffMins}m ago`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours}h ago`;
  } else {
    timeAgo = lastUpdated.toLocaleDateString();
  }

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="inline-flex items-center gap-4 px-5 py-3 bg-white border-2 border-[#2D2438] rounded-xl shadow-[3px_3px_0px_#2D2438]">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 border-2 border-[#2D2438] rounded-full ${health.status === 'healthy' ? 'bg-[#5AD9B3]' : 'bg-[#FFB067]'}`} />
          <span className="text-sm font-bold text-[#6B5B7A]">Updated {timeAgo}</span>
        </div>
        <div className="w-px h-5 bg-[#E0D5C0]"></div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="17" rx="5" ry="4"/>
            <circle cx="6.5" cy="10" r="2.5"/>
            <circle cx="17.5" cy="10" r="2.5"/>
            <circle cx="9" cy="6" r="2"/>
            <circle cx="15" cy="6" r="2"/>
          </svg>
          <span className="text-sm font-black text-[#2D2438]">{health.totalActiveItems.toLocaleString()}</span>
          <span className="text-sm font-bold text-[#6B5B7A]">cuties</span>
        </div>
      </div>
    </div>
  );
}
