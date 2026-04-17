'use client';

import React, { useState } from 'react';
import { Terminal, Bot, ShieldAlert, AlertTriangle, Zap, CheckCircle2, Download } from 'lucide-react';

interface AnalysisResponse {
  summary: string;
  potential_harm: string;
  mitigation_strategy: string[];
}

export default function AIEthicsReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const generateAnalysis = async () => {
    const storedData = typeof window !== 'undefined' ? localStorage.getItem('aegis_uploaded_data') : null;
    if (!storedData) {
      setToast('Please upload a dataset on the Dashboard first');
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/analyze-bias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          biasData: storedData
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Did you configure GEMINI_API_KEY in your environment variables?');
      }

      const data: AnalysisResponse = await response.json();
      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    const textContent = `AEGIS FLOW - AI ETHICS AUDIT REPORT\n\nSUMMARY OBSERVATION:\n${report.summary}\n\nPOTENTIAL HARM ASSESSMENT:\n${report.potential_harm}\n\nMITIGATION STRATEGIES:\n${report.mitigation_strategy.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aegis_Ethics_Audit.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-12">
      <header className="flex items-center justify-between mb-2 mt-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[var(--accent-sapphire)]" />
            AI Ethics Report
          </h1>
          <p className="text-gray-400 font-mono text-sm tracking-wider">AEGIS-FLOW &gt; AUDIT LOG &gt; ALGORITHMIC BIAS VULNERABILITY REPORT</p>
        </div>
      </header>
      
      {!report && !isLoading && (
        <div className="glass-panel rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-white/5 py-32 group">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[var(--accent-emerald)] blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Bot className="w-20 h-20 text-[var(--accent-emerald)] relative z-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">Awaiting Command</h2>
          <p className="text-gray-400 font-mono text-sm mb-10 max-w-lg text-center leading-relaxed">
            System ready. Initiate deep-layer contextual audit of the latest ML deployments using the Gemini generative ethics core.
          </p>
          <button 
            onClick={generateAnalysis}
            className="magnetic-btn px-8 py-4 rounded-xl text-sm font-mono tracking-widest uppercase font-bold text-white bg-gradient-to-r from-[var(--accent-emerald)] to-[var(--accent-sapphire)] hover:shadow-[0_0_30px_rgba(var(--accent-sapphire-rgb),0.6)] transition-all flex items-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <Zap className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Generate Gemini Analysis</span>
          </button>
        </div>
      )}

      {isLoading && (
        <div className="glass-panel rounded-2xl p-16 flex flex-col items-center justify-center border border-[var(--accent-emerald)]/30 min-h-[500px]">
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 border-2 border-[var(--accent-emerald)]/30 rounded-full shadow-[0_0_30px_rgba(var(--accent-emerald-rgb),0.2)]"></div>
            <div className="absolute inset-6 border border-[var(--accent-emerald)]/20 rounded-full"></div>
            <div className="absolute inset-12 border border-[var(--accent-emerald)]/10 rounded-full"></div>
            
            {/* Radar sweeping beam */}
            <div 
               className="absolute inset-0 rounded-full origin-center animate-[spin_2s_linear_infinite]" 
               style={{ 
                 background: 'conic-gradient(from 0deg, transparent 70%, rgba(var(--accent-emerald-rgb), 0.4) 100%)',
                 borderRadius: '50%'
               }}
            ></div>
            
            {/* Core Scanner */}
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center border border-[var(--accent-emerald)] shadow-[0_0_20px_var(--accent-emerald)] z-10 relative">
              <Bot className="w-8 h-8 text-[var(--accent-emerald)] animate-pulse" />
              <div className="absolute inset-0 bg-[var(--accent-emerald)] opacity-20 rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="text-xl font-mono text-[var(--accent-emerald)] font-bold tracking-widest uppercase mt-10 animate-pulse text-center">
            Establishing Link...<br/>
            <span className="text-xs text-gray-500 font-normal">Analyzing latent systemic bias topographies via Gemini 2.5 Flash</span>
          </h2>
        </div>
      )}

      {error && !isLoading && (
         <div className="glass-panel rounded-2xl p-8 border-l-4 border-l-red-500 text-red-400 font-mono tracking-wide relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)]">
           <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle className="w-24 h-24 text-red-500" /></div>
           <p className="font-bold flex items-center gap-2 mb-2 text-lg"><AlertTriangle className="w-5 h-5"/> Error Protocol Triggered</p>
           <p className="text-sm text-gray-300 max-w-2xl">{error}</p>
           <button 
             onClick={() => setError(null)}
             className="mt-6 px-4 py-2 border border-red-500/50 text-red-400 uppercase text-xs tracking-widest font-bold hover:bg-red-500 hover:text-white transition-colors rounded"
           >
             Acknowledge & Reset
           </button>
         </div>
      )}

      {report && !isLoading && (
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-[var(--accent-sapphire)]/70 shadow-[0_0_50px_rgba(var(--accent-sapphire-rgb),0.35)] flex flex-col relative group animate-in slide-in-from-bottom-8 duration-700">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--accent-sapphire-rgb),0.05)] to-transparent pointer-events-none"></div>
          
          <div className="bg-[#1e293b] px-4 py-3 border-b border-black/40 flex items-center relative z-10 shadow-sm">
            <div className="flex gap-2 absolute left-4">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.6)]"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.6)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
            </div>
            <div className="mx-auto flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="font-mono text-xs tracking-widest text-gray-400 font-bold">ETHICS_OVERSEER.sh</span>
            </div>
          </div>

          <div className="p-8 font-mono relative z-10 flex flex-col gap-8 text-sm">
            <div className="relative">
               <h3 className="text-[var(--accent-emerald)] text-sm tracking-widest font-bold mb-3 uppercase flex items-center gap-2">
                 <span className="text-white">&gt;_</span> Summary of Vector Space
               </h3>
               <p className="text-gray-300 leading-relaxed pl-6 border-l-2 border-[var(--accent-emerald)]/30 text-sm">
                 {report.summary}
               </p>
            </div>

            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.15)] relative overflow-hidden">
               <h3 className="text-red-400 text-sm tracking-widest font-bold mb-3 uppercase flex items-center gap-2">
                 <AlertTriangle className="w-5 h-5 text-red-500" /> Assessment of Potential Harm
               </h3>
               <p className="text-red-100 leading-relaxed text-sm font-medium">
                 {report.potential_harm}
               </p>
               <div className="absolute top-0 right-0 h-full w-1 bg-red-500 shadow-[0_0_10px_red]"></div>
            </div>

            <div>
               <h3 className="text-[var(--accent-emerald)] text-sm tracking-widest font-bold mb-4 uppercase flex items-center gap-2">
                 <Zap className="w-5 h-5 text-[var(--accent-emerald)]" /> Mitigation Strategy Protocols
               </h3>
               <div className="flex flex-col gap-3">
                 {report.mitigation_strategy.map((step, idx) => (
                   <div key={idx} className="flex gap-4 items-start p-4 hover:bg-white/5 transition-colors rounded-lg group">
                     <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_8px_var(--accent-emerald)]">
                     </span>
                     <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{step}</p>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 text-xs text-gray-600 mt-6 flex justify-between items-center font-bold">
              <span className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 [ SECURE TRANSMISSION COMPLETED ]
              </span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={downloadReport}
                  className="hover:text-[var(--accent-emerald)] transition-colors tracking-widest text-[var(--accent-sapphire)] hover:shadow-[0_0_10px_var(--accent-emerald)] p-2 rounded flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> [ DOWNLOAD REPORT (.txt) ]
                </button>
                <button 
                  onClick={generateAnalysis}
                  className="hover:text-[var(--accent-emerald)] transition-colors tracking-widest text-[var(--accent-sapphire)] hover:shadow-[0_0_10px_var(--accent-emerald)] p-2 rounded"
                >
                  [ RE-RUN DIAGNOSTIC ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 bg-red-500/90 text-white font-mono text-sm px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.6)] border border-red-400 z-50 animate-in slide-in-from-bottom-5 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          {toast}
        </div>
      )}
    </div>
  );
}
