import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { DemoBanner } from "@/components/DemoBanner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Cute Pets | Trending Pet Content",
  description: "Discover the cutest trending pet videos and photos from TikTok, 小红书, and YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased bg-[#FFF0F5]`}>
        <DemoBanner />

        {/* Header - 2D style */}
        <header className="sticky top-0 z-50 bg-white border-b-3 border-[#2D2438]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-[#FF5C9D] border-3 border-[#2D2438] rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#2D2438] group-hover:shadow-[4px_4px_0px_#2D2438] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <ellipse cx="12" cy="17" rx="5" ry="4"/>
                    <circle cx="6.5" cy="10" r="2.5"/>
                    <circle cx="17.5" cy="10" r="2.5"/>
                    <circle cx="9" cy="6" r="2"/>
                    <circle cx="15" cy="6" r="2"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-black text-[#2D2438] block leading-tight tracking-tight">Cute Pets</span>
                  <span className="text-[10px] text-[#FF5C9D] font-bold tracking-widest uppercase">Trending Daily</span>
                </div>
              </a>

              {/* Nav */}
              <nav className="flex items-center gap-2">
                <a href="#" className="px-4 py-2 text-sm font-bold text-[#2D2438] hover:bg-[#FFE0ED] border-2 border-transparent hover:border-[#2D2438] rounded-lg transition-all cursor-pointer">
                  Cats
                </a>
                <a href="#" className="px-4 py-2 text-sm font-bold text-[#2D2438] hover:bg-[#FFE0ED] border-2 border-transparent hover:border-[#2D2438] rounded-lg transition-all cursor-pointer">
                  Dogs
                </a>
                <a
                  href="/api/health"
                  target="_blank"
                  className="ml-2 px-4 py-2 text-sm font-bold text-white bg-[#2D2438] border-2 border-[#2D2438] rounded-lg hover:bg-[#3D3448] transition-colors cursor-pointer"
                >
                  Status
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-200px)]">
          {children}
        </main>

        {/* Footer - 2D style */}
        <footer className="bg-white border-t-3 border-[#2D2438] pt-12 pb-8 mt-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FF5C9D] border-2 border-[#2D2438] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <ellipse cx="12" cy="17" rx="5" ry="4"/>
                      <circle cx="6.5" cy="10" r="2.5"/>
                      <circle cx="17.5" cy="10" r="2.5"/>
                      <circle cx="9" cy="6" r="2"/>
                      <circle cx="15" cy="6" r="2"/>
                    </svg>
                  </div>
                  <span className="text-lg font-black text-[#2D2438]">Cute Pets</span>
                </div>
                <p className="text-sm text-[#6B5B7A] max-w-xs leading-relaxed font-medium">
                  Discover the cutest and most trending pet content from around the world. Updated daily.
                </p>
              </div>

              {/* Platforms */}
              <div>
                <h4 className="text-sm font-black text-[#2D2438] mb-4 uppercase tracking-wide">Platforms</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#FF5C9D] transition-colors cursor-pointer">TikTok</a></li>
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#FF5C9D] transition-colors cursor-pointer">小红书</a></li>
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#FF5C9D] transition-colors cursor-pointer">YouTube</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-black text-[#2D2438] mb-4 uppercase tracking-wide">Categories</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#FF5C9D] transition-colors cursor-pointer">Cute Cats</a></li>
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#FF5C9D] transition-colors cursor-pointer">Funny Dogs</a></li>
                  <li><a href="#" className="text-sm font-semibold text-[#6B5B7A] hover:text-[#FF5C9D] transition-colors cursor-pointer">Trending</a></li>
                </ul>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="pt-6 border-t-2 border-[#E8D5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#6B5B7A] font-medium">
                All content belongs to its respective creators
              </p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FF5C9D] border-2 border-[#2D2438] rounded-full"></div>
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
