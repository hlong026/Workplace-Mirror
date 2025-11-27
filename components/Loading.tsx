import React from 'react';

const Loading: React.FC = () => {
  const loadingMessages = [
    "正在斟酌...",
    "探寻言外之意...",
    "分析语境...",
    "洞察动机...",
    "明辨真伪..."
  ];
  
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 flex flex-col items-center justify-center animate-fade-in space-y-8">
      {/* Minimalist Spinner: Just a breathing circle */}
      <div className="relative">
        <div className="w-16 h-16 border border-stone-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-stone-800 rounded-full animate-spin duration-[3s]"></div>
      </div>
      
      <p className="text-stone-500 font-serif tracking-widest text-lg animate-pulse">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default Loading;
