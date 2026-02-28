'use client';

import Image from 'next/image';

const CAT_IMAGES = ['/cats/sitting.png', '/cats/playful.png', '/cats/curious.png', '/cats/sleeping.png'];

const CATS = [
  { img: 0, x: '1%',  y: '15%', size: 110, duration: 18, delay: 0 },
  { img: 1, x: '84%', y: '22%', size: 95,  duration: 22, delay: 3 },
  { img: 2, x: '3%',  y: '52%', size: 100, duration: 20, delay: 7 },
  { img: 3, x: '88%', y: '60%', size: 90,  duration: 16, delay: 5 },
  { img: 0, x: '0%',  y: '82%', size: 85,  duration: 24, delay: 10 },
  { img: 2, x: '90%', y: '42%', size: 80,  duration: 19, delay: 2 },
  { img: 3, x: '2%',  y: '34%', size: 75,  duration: 21, delay: 8 },
  { img: 1, x: '86%', y: '78%', size: 90,  duration: 17, delay: 12 },
];

export function FloatingCats() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {CATS.map((cat, i) => (
        <div
          key={i}
          className="absolute opacity-70"
          style={{
            left: cat.x,
            top: cat.y,
            width: cat.size,
            height: cat.size,
            animation: `float-cat ${cat.duration}s ease-in-out ${cat.delay}s infinite`,
          }}
        >
          <Image
            src={CAT_IMAGES[cat.img]}
            alt=""
            width={cat.size}
            height={cat.size}
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
