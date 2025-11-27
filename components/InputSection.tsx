'use client';

import React, { useRef, useState, useCallback } from 'react';
import { AnalysisStatus } from '../types';

interface InputSectionProps {
  onAnalyze: (text: string, image: string | null) => void;
  status: AnalysisStatus;
}

const EXAMPLES = [
  "年轻人眼光要放长远，不要只盯着这点工资，我在给你机会锻炼。",
  "我对你严厉是因为我看重你，别人想让我骂我都不骂。",
  "公司就是家，不要总是计较个人得失，要懂得感恩平台。",
  "这点抗压能力都没有，以后怎么在社会上立足？"
];

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, status }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!text.trim() && !image) return;
    onAnalyze(text, image);
  };

  const isAnalyzing = status === AnalysisStatus.ANALYZING;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 animate-fade-in flex flex-col items-center">
      
      <div 
        className="w-full relative group bg-white/80 backdrop-blur-sm border border-stone-200 hover:border-stone-400 transition-all duration-700 rounded-sm p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <textarea
          className="w-full min-h-[180px] bg-transparent border-none outline-none resize-none text-stone-800 text-lg placeholder-stone-300 font-serif leading-loose tracking-wide"
          placeholder="在此输入上级语录，或拖入聊天截图..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isAnalyzing}
        />
        
        {image && (
          <div className="mt-6 relative inline-block group/img">
            <img src={image} alt="Upload preview" className="max-h-48 rounded-sm border border-stone-200 shadow-md grayscale group-hover/img:grayscale-0 transition-all duration-500" />
            <button 
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-stone-100 text-stone-500 rounded-full p-1 hover:bg-stone-200 transition-colors shadow-sm opacity-0 group-hover/img:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-stone-300 hover:text-stone-600 transition-colors p-2"
            title="上传图片"
            disabled={isAnalyzing}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Examples Section */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4 justify-center opacity-60">
           <span className="h-[1px] w-8 bg-stone-300"></span>
           <p className="text-[10px] text-stone-400 tracking-[0.2em] uppercase">点击填入示例</p>
           <span className="h-[1px] w-8 bg-stone-300"></span>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {EXAMPLES.map((ex, index) => (
            <button
              key={index}
              onClick={() => setText(ex)}
              disabled={isAnalyzing}
              className="text-sm text-stone-500 bg-transparent border border-stone-200 px-5 py-2 rounded-sm hover:border-stone-400 hover:text-stone-800 transition-all shadow-sm font-serif disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {ex.length > 12 ? ex.substring(0, 12) + '...' : ex}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleSubmit}
          disabled={(!text && !image) || isAnalyzing}
          className={`
            group relative px-14 py-3 overflow-hidden rounded-sm transition-all duration-500
            ${(!text && !image) || isAnalyzing
              ? 'border border-stone-200 text-stone-300 cursor-not-allowed'
              : 'text-stone-100 shadow-md hover:shadow-lg'
            }
          `}
        >
           {/* Button background logic */}
           {!((!text && !image) || isAnalyzing) && (
              <div className="absolute inset-0 w-full h-full bg-stone-800 group-hover:bg-stone-900 transition-colors"></div>
           )}
           
           <span className={`relative text-lg tracking-[0.5em] font-serif pl-2`}>
             {isAnalyzing ? '审视中' : '明镜鉴之'}
           </span>
        </button>
      </div>
    </div>
  );
};

export default InputSection;