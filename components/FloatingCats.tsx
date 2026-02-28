'use client';

const CAT_IMAGES = ['/cats/sitting.png', '/cats/playful.png', '/cats/curious.png', '/cats/sleeping.png'];

/* ── Header cats (inline, bounce in the nav bar) ── */

const HEADER_CATS = [
  { img: 0, duration: 1.8, delay: 0 },
  { img: 1, duration: 2.1, delay: 0.3 },
  { img: 2, duration: 1.9, delay: 0.1 },
  { img: 3, duration: 2.3, delay: 0.5 },
];

export function FloatingCats() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {HEADER_CATS.map((cat, i) => (
        <div
          key={i}
          className="shrink-0 rounded-full bg-[#FFF3CD] flex items-center justify-center
            w-9 h-9 sm:w-12 sm:h-12"
          style={{
            animation: `bounce-cat ${cat.duration}s ease-in-out ${cat.delay}s infinite`,
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CAT_IMAGES[cat.img]}
            alt=""
            className="w-6 h-6 sm:w-9 sm:h-9"
          />
        </div>
      ))}

      <style>{`
        @keyframes bounce-cat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}

/* ── Background cats (full page, behind content) ── */

const BG_CATS = [
  { img: 0, x: '1%',  y: '15%', size: 100, duration: 1,   delay: 0 },
  { img: 1, x: '86%', y: '22%', size: 90,  duration: 1.1, delay: 0.2 },
  { img: 2, x: '3%',  y: '52%', size: 95,  duration: 0.9, delay: 0.4 },
  { img: 3, x: '90%', y: '60%', size: 85,  duration: 1,   delay: 0.3 },
  { img: 0, x: '0%',  y: '82%', size: 80,  duration: 1.1, delay: 0.5 },
  { img: 2, x: '92%', y: '42%', size: 75,  duration: 0.9, delay: 0.1 },
  { img: 3, x: '2%',  y: '34%', size: 70,  duration: 1,   delay: 0.3 },
  { img: 1, x: '88%', y: '78%', size: 85,  duration: 1.1, delay: 0.6 },
];

export function BackgroundCats() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {BG_CATS.map((cat, i) => (
        <div
          key={i}
          className="absolute opacity-30"
          style={{
            left: cat.x,
            top: cat.y,
            width: cat.size,
            height: cat.size,
            animation: `float-cat ${cat.duration}s ease-in-out ${cat.delay}s infinite`,
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CAT_IMAGES[cat.img]}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      <style>{`
        @keyframes float-cat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
