'use client';

import { useState, useEffect } from 'react';

export function DemoBanner() {
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkDemo = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        setIsDemo(data.status === 'not_configured');
      } catch {
        setIsDemo(true);
      }
    };
    checkDemo();
  }, []);

  if (!isDemo) return null;

  return (
    <div className="bg-[#2D2438] text-white px-4 py-2.5 text-center border-b-2 border-[#F5A623]">
      <div className="flex items-center justify-center gap-2">
        <div className="w-3 h-3 bg-[#F5A623] border border-white rounded-full"></div>
        <span className="text-sm font-bold">
          Demo Mode
          <span className="font-medium opacity-80"> — Showing sample cat content</span>
        </span>
      </div>
    </div>
  );
}
