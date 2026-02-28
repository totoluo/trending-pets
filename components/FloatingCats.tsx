'use client';

const CAT_IMAGES = ['/cats/sitting.png', '/cats/playful.png', '/cats/curious.png', '/cats/sleeping.png'];

/* ── Header cats (inline, bounce in the nav bar) ── */

const HEADER_CATS = [
  { img: 0, duration: 3.5, delay: 0 },
  { img: 1, duration: 4.2, delay: 0.8 },
  { img: 2, duration: 3.8, delay: 0.3, desktopOnly: true },
  { img: 3, duration: 4.5, delay: 1.2, desktopOnly: true },
];

export function FloatingCats() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {HEADER_CATS.map((cat, i) => (
        <div
          key={i}
          className={`shrink-0 rounded-full bg-[#FFF3CD] flex items-center justify-center
            w-9 h-9 sm:w-12 sm:h-12
            ${cat.desktopOnly ? 'hidden sm:flex' : ''}`}
          style={{
            animation: `bounce-cat ${cat.duration}s ease-in-out ${cat.delay}s infinite`,
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
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

/* ── Background cats (full page, behind content) ── */

const BG_CATS = [
  { img: 0, x: '1%',  y: '15%', size: 100, duration: 18, delay: 0 },
  { img: 1, x: '86%', y: '22%', size: 90,  duration: 22, delay: 3 },
  { img: 2, x: '3%',  y: '52%', size: 95,  duration: 20, delay: 7 },
  { img: 3, x: '90%', y: '60%', size: 85,  duration: 16, delay: 5 },
  { img: 0, x: '0%',  y: '82%', size: 80,  duration: 24, delay: 10 },
  { img: 2, x: '92%', y: '42%', size: 75,  duration: 19, delay: 2 },
  { img: 3, x: '2%',  y: '34%', size: 70,  duration: 21, delay: 8 },
  { img: 1, x: '88%', y: '78%', size: 85,  duration: 17, delay: 12 },
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
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(5deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
          75% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
