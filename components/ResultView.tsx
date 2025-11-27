import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import html2canvas from 'html2canvas';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const [isExporting, setIsExporting] = useState(false);

  // Determine risk level
  const score = result.score;
  const isSafe = score < 30;
  const isWarning = score >= 30 && score < 70;
  
  // Theme configuration based on risk
  const theme = {
    color: isSafe ? 'text-bamboo' : isWarning ? 'text-stone-600' : 'text-cinnabar',
    borderColor: isSafe ? 'border-bamboo' : isWarning ? 'border-stone-600' : 'border-cinnabar',
    bgColor: isSafe ? 'bg-green-50/50' : isWarning ? 'bg-stone-100/50' : 'bg-red-50/50', // Added transparency
    iconColor: isSafe ? '#15803d' : isWarning ? '#57534e' : '#b91c1c',
  };

  const handleExport = async () => {
    setIsExporting(true);
    const element = document.getElementById('analysis-report');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        backgroundColor: '#fafaf9',
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `职场明镜鉴定-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed', err);
      alert('图片生成失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in pb-20 flex flex-col items-center">
      
      {/* Report Card - capture target */}
      <div 
        id="analysis-report" 
        className="bg-white/90 backdrop-blur-[2px] border border-stone-200 shadow-xl relative overflow-hidden w-full"
        style={{
          // Subtle noise texture overlay for paper feel
          backgroundImage: 'radial-gradient(#a8a29e 0.5px, transparent 0.5px)', 
          backgroundSize: '12px 12px'
        }}
      >
        {/* Top Decorative Border */}
        <div className={`h-1.5 w-full ${isSafe ? 'bg-bamboo' : isWarning ? 'bg-stone-400' : 'bg-cinnabar'} opacity-80`}></div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-end border-b border-stone-300 pb-4 mb-8">
            <div>
              <h1 className="text-2xl font-serif font-bold text-ink tracking-widest mb-1">分析报告</h1>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em]">Analysis Report</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-stone-400 font-mono">{new Date().toLocaleDateString('zh-CN')}</p>
              <div className="text-[10px] text-stone-300 font-serif tracking-widest mt-1">职场明镜 · 制</div>
            </div>
          </div>

          {/* Verdict Section */}
          <div className="relative mb-10 flex justify-between items-start">
            <div className="w-2/3 pr-4">
              <h2 className="text-[10px] text-stone-400 font-bold tracking-widest mb-2 uppercase">鉴定结论 / Verdict</h2>
              <div className={`text-4xl md:text-5xl font-bold font-serif leading-tight ${theme.color} mb-4`}>
                {result.verdict}
              </div>
              <div className="inline-block px-3 py-1 bg-stone-100/80 rounded-sm text-xs font-serif text-stone-600 tracking-wide border border-stone-100">
                语气: {result.tone}
              </div>
            </div>

            {/* Stamp / Seal */}
            <div className="relative">
              <div className={`
                w-24 h-24 md:w-32 md:h-32 border-[3px] rounded-full flex flex-col items-center justify-center 
                transform rotate-[-12deg] opacity-90 backdrop-blur-sm bg-white/40
                ${theme.borderColor} ${theme.color}
              `} style={{
                maskImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
                boxShadow: `inset 0 0 0 2px ${theme.iconColor}20`
              }}>
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-80">Risk Level</span>
                <span className="text-4xl md:text-5xl font-bold font-mono my-1 tracking-tighter">{result.score}</span>
                <span className="text-[9px] tracking-[0.3em] font-serif border-t border-current pt-1 mt-1 opacity-80">PUA指数</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-10 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-stone-100"></div>
            <p className="text-lg text-stone-800 leading-loose font-serif text-justify">
              <span className="text-3xl float-left mr-2 font-bold opacity-20">“</span>
              {result.summary}
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-10">
            <h3 className="text-[10px] text-stone-400 font-bold tracking-widest mb-4 uppercase flex items-center gap-2">
              <span className="w-4 h-[1px] bg-stone-300"></span>
              深度剖析
            </h3>
            <ul className="space-y-4">
              {result.details.map((detail, index) => (
                <li key={index} className="flex gap-4 group">
                  <span className={`flex-shrink-0 w-5 h-5 mt-1 rounded-full border border-stone-200 flex items-center justify-center text-[10px] font-mono text-stone-400 group-hover:border-stone-400 group-hover:text-stone-600 transition-colors`}>
                    {index + 1}
                  </span>
                  <p className="text-stone-700 leading-relaxed text-sm md:text-base font-serif border-b border-transparent group-hover:border-stone-100 transition-all pb-1">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Advice Box */}
          <div className={`${theme.bgColor} p-6 border-l-2 ${theme.borderColor} relative rounded-r-sm`}>
            <h3 className={`text-[10px] font-bold tracking-widest mb-2 uppercase ${theme.color} opacity-80`}>
              应对建议 / Advice
            </h3>
            <p className="text-stone-800 font-medium leading-relaxed font-serif text-sm md:text-base">
              {result.advice}
            </p>
          </div>
          
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 mt-10">
        <button 
          onClick={onReset}
          className="group flex flex-col items-center gap-1 text-stone-400 hover:text-stone-800 transition-colors"
        >
           <div className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-stone-800 bg-white/50">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
           </div>
           <span className="text-xs tracking-widest font-serif">重测</span>
        </button>

        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="group flex flex-col items-center gap-1 text-stone-400 hover:text-stone-800 transition-colors"
        >
           <div className={`w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-stone-800 bg-white/50 ${isExporting ? 'bg-stone-100' : ''}`}>
             {isExporting ? (
                <div className="w-4 h-4 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin"></div>
             ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
             )}
           </div>
           <span className="text-xs tracking-widest font-serif">留存</span>
        </button>
      </div>

    </div>
  );
};

export default ResultView;