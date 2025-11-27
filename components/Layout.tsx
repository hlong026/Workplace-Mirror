import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  // Minimalist Ink Wash Mountain SVG
  const ShanshuiBackground = () => (
    <div className="fixed inset-x-0 bottom-0 h-[45vh] z-0 pointer-events-none select-none overflow-hidden">
      {/* Fog/Mist Gradient overlay to blend mountains into paper */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-stone-50/50 to-stone-50 z-20"></div>

      <svg 
        viewBox="0 0 1440 320" 
        className="absolute bottom-0 w-full h-full" 
        preserveAspectRatio="none"
      >
        {/* Furthest Mountain (Lightest) */}
        <path 
          fill="#e7e5e4" 
          fillOpacity="0.6" 
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        
        {/* Middle Mountain */}
        <path 
          fill="#d6d3d1" 
          fillOpacity="0.5" 
          d="M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,266.7C840,277,960,267,1080,245.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
        
        {/* Closest Mountain (Darkest - Ink) */}
        <path 
          fill="#a8a29e" 
          fillOpacity="0.3" 
          d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,250.7C672,267,768,277,864,288C960,299,1056,309,1152,298.7C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );

  // Corner Decoration (Top only, to let the mountains breathe at bottom)
  const CornerDecor = ({ className }: { className?: string }) => (
    <div className={`absolute w-32 h-32 pointer-events-none opacity-30 z-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-stone-500">
        <path d="M0 0 C 20 0, 40 5, 50 20 C 60 35, 60 50, 60 70" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M0 0 C 0 20, 5 40, 20 50 C 35 60, 50 60, 70 60" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center py-12 px-4 sm:px-6 relative selection:bg-stone-200 selection:text-stone-900 overflow-hidden font-serif">
        
        {/* Layer 1: Subtle Paper Gradient (Vignette) */}
        <div className="fixed inset-0 pointer-events-none z-[-2] bg-[radial-gradient(circle_at_center,#fafaf9_0%,#f5f5f4_100%)]"></div>

        {/* Layer 2: Base Noise Texture (Paper feel) - Reduced opacity for cleaner look */}
        <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Layer 3: Shanshui (Mountain) Background */}
        <ShanshuiBackground />

        {/* Layer 4: Corner Decorations (Top Only) */}
        <div className="fixed inset-0 pointer-events-none z-0 max-w-7xl mx-auto border-transparent">
            <CornerDecor className="top-0 left-0" />
            <CornerDecor className="top-0 right-0 transform scale-x-[-1]" />
        </div>

        <header className="mb-12 text-center relative z-10 animate-fade-in mt-6">
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4 tracking-[0.2em] relative z-10">
                  职场明镜
              </h1>
              {/* Red Stamp effect behind title */}
              <div className="absolute -top-2 -right-4 w-8 h-8 rounded-sm border border-cinnabar opacity-20 rotate-12 z-0"></div>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-stone-500 font-serif text-sm md:text-base mt-2">
                <span className="opacity-50">———</span>
                <span className="tracking-[0.3em]">以此言 · 观此心</span>
                <span className="opacity-50">———</span>
            </div>
        </header>

        <main className="w-full relative z-10 flex flex-col items-center flex-grow">
            {children}
        </main>

        <footer className="mt-16 py-8 text-center text-stone-400 text-[10px] tracking-[0.3em] relative z-10 opacity-60">
             <p>© {new Date().getFullYear()} WORKPLACE MIRROR AI</p>
        </footer>
    </div>
  );
};

export default Layout;