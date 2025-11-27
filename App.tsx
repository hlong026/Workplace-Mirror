import React, { useState } from 'react';
import Layout from './components/Layout';
import InputSection from './components/InputSection';
import ResultView from './components/ResultView';
import Loading from './components/Loading';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult, AnalysisStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string, image: string | null) => {
    setStatus(AnalysisStatus.ANALYZING);
    setError(null);

    try {
      const data = await analyzeContent(text, image);
      setResult(data);
      setStatus(AnalysisStatus.COMPLETED);
    } catch (err) {
      console.error(err);
      setError('分析过程中出现了意外，请稍后再试。');
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStatus(AnalysisStatus.IDLE);
    setError(null);
  };

  return (
    <Layout>
      {status === AnalysisStatus.IDLE && (
        <InputSection onAnalyze={handleAnalyze} status={status} />
      )}

      {status === AnalysisStatus.ANALYZING && (
        <Loading />
      )}

      {status === AnalysisStatus.COMPLETED && result && (
        <ResultView result={result} onReset={handleReset} />
      )}

      {status === AnalysisStatus.ERROR && (
        <div className="text-center space-y-6 animate-fade-in max-w-md">
          <div className="text-cinnabar text-5xl mb-4">
             Error
          </div>
          <p className="text-stone-600 mb-8 font-serif">{error || '未知错误'}</p>
          <button 
            onClick={handleReset}
            className="px-8 py-2 border border-stone-300 hover:border-stone-800 hover:bg-stone-50 transition-colors text-stone-800"
          >
            返回
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
