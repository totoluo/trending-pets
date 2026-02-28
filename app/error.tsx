'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-50 mb-6">
          <span className="text-4xl">😿</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-6 max-w-sm">
          We couldn&apos;t load the cat videos. This might be a temporary issue.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-pink-500 text-white text-sm font-medium rounded-lg hover:bg-pink-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
