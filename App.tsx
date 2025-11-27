import React, { useState } from 'react';
import { ReportPage1 } from './components/ReportPage1';
import { ReportPage2 } from './components/ReportPage2';
import { INITIAL_DATA } from './constants';
import { ReportData } from './types';
import { Printer, Sparkles, RefreshCcw } from 'lucide-react';
import { generateReportInsights } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<ReportData>(INITIAL_DATA);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    try {
      const insights = await generateReportInsights(data);
      setData(prev => ({
        ...prev,
        learnings: insights.learnings,
        topPostsInsight: insights.topPostsInsight
      }));
    } catch (error) {
      console.error("Failed to generate insights", error);
      alert("Could not generate AI insights. Please check your configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      
      {/* Navigation / Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
              SI
            </div>
            <span className="font-bold text-slate-800 text-lg hidden sm:block">SocialInsights Pro</span>
          </div>
          
          <div className="flex gap-3">
             <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCcw size={16} />
              <span className="hidden sm:inline">Reset Data</span>
            </button>

            <button 
              onClick={handleGenerateInsights}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-sm
                ${isGenerating 
                  ? 'bg-brand-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700'
                }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Thinking...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>AI Analysis</span>
                </>
              )}
            </button>

            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="py-8 px-4 flex flex-col items-center gap-8">
        <ReportPage1 data={data} />
        <ReportPage2 data={data} />
      </main>

      {/* Footer Disclaimer */}
      <div className="text-center text-slate-400 text-sm no-print mb-8">
        <p>Pro Tip: Click "AI Analysis" to regenerate insights based on the current data using Gemini.</p>
        <p className="mt-1">Use Browser Print (Ctrl+P) to save as PDF.</p>
      </div>

    </div>
  );
};

export default App;