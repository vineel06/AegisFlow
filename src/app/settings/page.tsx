'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Server, ShieldCheck, Cloud, Link2, Database, Briefcase, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [autoScanEnabled, setAutoScanEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state with next-themes hook
  useEffect(() => {
    setDarkModeEnabled(theme === 'dark');
  }, [theme]);

  const toggleDarkMode = () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    setTheme(newMode ? 'dark' : 'light');
  };

  const handleEnterpriseClick = () => {
    setToastMessage('Feature unlocking in AegisFlow v2.0 - Enterprise Edition');
    // Hide toast after 3 seconds
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out relative">
      <header className="flex items-center justify-between mt-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase flex items-center gap-3">
            <Settings className="w-8 h-8 text-[var(--accent-emerald)]" />
            System Configuration
          </h1>
          <p className="text-gray-400 font-mono text-sm tracking-wider">AEGIS-FLOW &gt; CORE PREFERENCES &gt; INTEGRATION MODULES</p>
        </div>
      </header>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 border border-[var(--accent-sapphire)] shadow-[0_0_30px_rgba(var(--accent-sapphire-rgb),0.3)] bg-[#020617]">
            <Lock className="w-4 h-4 text-[var(--accent-sapphire)]" />
            <span className="font-mono text-sm tracking-wide text-white font-bold">{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        
        {/* Section 1: API Status */}
        <section className="glass-panel rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors shadow-lg">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Server className="w-32 h-32" /></div>
           <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-8 flex items-center gap-2">
             <Server className="w-5 h-5 text-gray-400" /> API Status Loop
           </h2>
           
           <div className="bg-black/40 border border-white/5 rounded-xl p-6 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
               <span className="font-mono text-gray-400 text-sm tracking-wider uppercase">Gemini Generative Core</span>
               <div className="flex items-center gap-3 bg-[#020617] px-3 py-1.5 rounded-lg border border-white/5">
                 <span className="text-sm font-bold text-green-400 tracking-widest uppercase">Active</span>
                 <div className="relative flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full bg-green-500 z-10 shadow-[0_0_10px_#22c55e]"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500 absolute animate-ping opacity-75"></div>
                 </div>
               </div>
             </div>
                          <div className="flex items-center justify-between">
               <span className="font-mono text-gray-400 text-sm tracking-wider uppercase">Local DB Instance</span>
               <div className="flex items-center gap-3 bg-[#020617] px-3 py-1.5 rounded-lg border border-white/5">
                 <span className="text-sm font-bold text-green-400 tracking-widest uppercase">Connected</span>
                 <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
               </div>
             </div>

             <div className="w-full h-px bg-white/5 my-2"></div>
             <p className="text-xs font-mono text-gray-500">Latency: 24ms // Uptime: 99.99% // No anomalies detected.</p>
           </div>
        </section>

        {/* Section 2: Automated Scanning */}
        <section className="glass-panel rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors shadow-lg">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldCheck className="w-32 h-32" /></div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-8 flex items-center gap-2 relative z-10">
             <ShieldCheck className="w-5 h-5 text-[var(--accent-emerald)]" /> Automated Auditing
           </h2>

           <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between gap-6 bg-black/40 border border-[var(--accent-emerald)]/20 p-6 rounded-xl shadow-inner group/toggle relative z-10 w-full">
               <div className="flex-1 pr-4">
                 <h3 className="text-white font-bold tracking-wide mb-2 uppercase">Deep Dark Mode</h3>
                 <p className="text-gray-400 text-xs font-mono leading-relaxed">Lock the dashboard into the Aegis default dark aesthetic.</p>
               </div>
               
               {/* Toggle Switch */}
               <button 
                 onClick={toggleDarkMode}
                 className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex-shrink-0 ${darkModeEnabled ? 'bg-[var(--accent-emerald)]/80 shadow-[0_0_15px_rgba(var(--accent-emerald-rgb),0.4)]' : 'bg-gray-800 border border-white/10'}`}
               >
                 <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 flex items-center justify-center ${darkModeEnabled ? 'transform translate-x-9 shadow-md' : 'transform translate-x-1'}`}>
                   {darkModeEnabled && <div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_5px_var(--accent-emerald)]"></div>}
                 </div>
               </button>
             </div>

             <div className="flex items-center justify-between gap-6 bg-black/40 border border-[var(--accent-emerald)]/20 p-6 rounded-xl shadow-inner group/toggle relative z-10 w-full">
               <div className="flex-1 pr-4">
                 <h3 className="text-white font-bold tracking-wide mb-2 uppercase">Run weekly bias scans</h3>
                 <p className="text-gray-400 text-xs font-mono leading-relaxed">Automatically inject historical sets into the Gemini analyzer every Sunday at 00:00 UTC.</p>
               </div>
               
               {/* Toggle Switch */}
               <button 
                 onClick={() => setAutoScanEnabled(!autoScanEnabled)}
                 className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex-shrink-0 ${autoScanEnabled ? 'bg-[var(--accent-emerald)]/80 shadow-[0_0_15px_rgba(var(--accent-emerald-rgb),0.4)]' : 'bg-gray-800 border border-white/10'}`}
               >
                 <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 flex items-center justify-center ${autoScanEnabled ? 'transform translate-x-9 shadow-md' : 'transform translate-x-1'}`}>
                   {autoScanEnabled && <div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_5px_var(--accent-emerald)]"></div>}
                 </div>
               </button>
             </div>
           </div>
        </section>

        {/* Section 3: Enterprise Integrations */}
        <section className="glass-panel rounded-2xl p-8 border border-[var(--accent-sapphire)]/20 lg:col-span-2 relative overflow-hidden shadow-xl">
           <div className="absolute -inset-10 bg-gradient-to-tr from-transparent via-[rgba(var(--accent-sapphire-rgb),0.04)] to-transparent pointer-events-none"></div>
           
           <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-2 flex items-center gap-2 relative z-10">
             <Link2 className="w-5 h-5 text-[var(--accent-sapphire)]" /> Enterprise Integrations
           </h2>
           <p className="text-gray-400 font-mono text-sm tracking-wider mb-8 relative z-10">
             Connect core external pipelines directly to the Aegis analysis engine.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                { name: 'Workday', desc: 'HR & Pipeline Sync', icon: Briefcase },
                { name: 'Salesforce', desc: 'CRM Data Import', icon: Cloud },
                { name: 'AWS S3', desc: 'Raw Datalake Connect', icon: Database }
              ].map((integration, idx) => (
                <div 
                  key={idx} 
                  onClick={handleEnterpriseClick}
                  className="bg-black/30 border border-[var(--accent-sapphire)]/10 rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 hover:border-[var(--accent-sapphire)]/40 hover:bg-[var(--accent-sapphire)]/10 transition-all cursor-pointer group/btn"
                >
                  <div className="w-20 h-20 rounded-full bg-[#020617] border border-white/5 flex items-center justify-center mb-5 group-hover/btn:shadow-[0_0_20px_rgba(var(--accent-sapphire-rgb),0.3)] transition-all">
                    <integration.icon className="w-8 h-8 text-gray-500 group-hover/btn:text-[var(--accent-sapphire)] transition-colors" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-gray-300 group-hover/btn:text-white transition-colors">{integration.name}</h3>
                  <p className="text-xs font-mono text-gray-400 mt-2 mb-6 uppercase tracking-widest">{integration.desc}</p>
                  
                  <div className="px-5 py-2 rounded-lg bg-[#020617] border border-white/10 text-gray-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover/btn:border-[var(--accent-sapphire)]/50 group-hover/btn:text-[var(--accent-sapphire)] transition-colors">
                    <Lock className="w-3 h-3" /> Connect Node
                  </div>
                </div>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
}
