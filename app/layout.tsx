import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { DemoBanner } from "@/components/DemoBanner";
import { FloatingCats, BackgroundCats } from "@/components/FloatingCats";
import { ScrollButtons } from "@/components/ScrollButtons";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Cute Cats | Trending Cat Videos",
  description: "Trending cat videos from TikTok, 小红书, and YouTube — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased bg-[#FFFBEB]`}>
        <BackgroundCats />
        <DemoBanner />

        {/* Header - 2D style */}
        <header className="sticky top-0 z-50 bg-white border-b-3 border-[#2D2438] overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#F5A623] border-3 border-[#2D2438] rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#2D2438] group-hover:shadow-[4px_4px_0px_#2D2438] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <ellipse cx="12" cy="17" rx="5" ry="4"/>
                    <circle cx="6.5" cy="10" r="2.5"/>
                    <circle cx="17.5" cy="10" r="2.5"/>
                    <circle cx="9" cy="6" r="2"/>
                    <circle cx="15" cy="6" r="2"/>
                  </svg>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-[#2D2438] block leading-tight tracking-tight">Cute Cats</span>
                  <span className="text-[10px] text-[#F5A623] font-bold tracking-widest uppercase">Trending Daily</span>
                </div>
              </a>

              {/* Floating cats + GitHub */}
              <div className="flex items-center gap-2 sm:gap-3">
                <FloatingCats />
                <a
                  href="https://github.com/totoluo/trending-pets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-[#2D2438] border-2 border-[#2D2438] rounded-xl flex items-center justify-center hover:bg-[#F5A623] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 min-h-[calc(100vh-200px)]">
          {children}
        </main>

        <ScrollButtons />

        {/* Footer - 2D style */}
        <footer className="bg-white border-t-3 border-[#2D2438] pt-12 pb-8 mt-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#F5A623] border-2 border-[#2D2438] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <ellipse cx="12" cy="17" rx="5" ry="4"/>
                      <circle cx="6.5" cy="10" r="2.5"/>
                      <circle cx="17.5" cy="10" r="2.5"/>
                      <circle cx="9" cy="6" r="2"/>
                      <circle cx="15" cy="6" r="2"/>
                    </svg>
                  </div>
                  <span className="text-lg font-black text-[#2D2438]">Cute Cats</span>
                </div>
                <p className="text-sm text-[#6B5B7A] max-w-xs leading-relaxed font-medium mb-4">
                  Built by a cat video addict who wanted one place to find the cutest cats from every platform. Thoughts welcome!
                </p>
                <a
                  href="https://github.com/totoluo/trending-pets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D2438] text-white text-sm font-bold rounded-lg border-2 border-[#2D2438] shadow-[2px_2px_0px_#2D2438] hover:bg-[#F5A623] hover:shadow-[3px_3px_0px_#2D2438] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Contribute on GitHub
                </a>
              </div>

              {/* Platforms */}
              <div>
                <h4 className="text-sm font-black text-[#2D2438] mb-4 uppercase tracking-wide">Platforms</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#F5A623] transition-colors cursor-pointer">TikTok</a></li>
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#F5A623] transition-colors cursor-pointer">小红书</a></li>
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#F5A623] transition-colors cursor-pointer">YouTube</a></li>
                </ul>
              </div>

            </div>

            {/* Footer bottom */}
            <div className="pt-6 border-t-2 border-[#E0D5C0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#6B5B7A] font-medium">
                All content belongs to its respective creators
              </p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#F5A623] border-2 border-[#2D2438] rounded-full"></div>
                <div className="w-4 h-4 bg-[#FFB067] border-2 border-[#2D2438] rounded-full"></div>
                <div className="w-4 h-4 bg-[#B794F6] border-2 border-[#2D2438] rounded-full"></div>
                <div className="w-4 h-4 bg-[#5AD9B3] border-2 border-[#2D2438] rounded-full"></div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
