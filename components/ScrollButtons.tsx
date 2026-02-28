'use client';

import { useState, useEffect } from 'react';

export function ScrollButtons() {
  const [show, setShow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
      const guestbook = document.getElementById('guestbook');
      if (guestbook) {
        const rect = guestbook.getBoundingClientRect();
        setAtBottom(rect.top < window.innerHeight);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBottom = () => {
    // Pause infinite scroll, jump instantly, then resume
    document.body.dataset.pauseScroll = '1';
    const guestbook = document.getElementById('guestbook');
    if (guestbook) {
      guestbook.scrollIntoView({ behavior: 'instant' });
    }
    setTimeout(() => { delete document.body.dataset.pauseScroll; }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {!atBottom && (
        <button
          onClick={scrollToBottom}
          className="w-10 h-10 bg-[#F5A623] text-white border-2 border-[#2D2438] rounded-xl shadow-[2px_2px_0px_#2D2438] hover:shadow-[3px_3px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center cursor-pointer"
          aria-label="Scroll to bottom"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 bg-white text-[#2D2438] border-2 border-[#2D2438] rounded-xl shadow-[2px_2px_0px_#2D2438] hover:shadow-[3px_3px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center cursor-pointer"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
