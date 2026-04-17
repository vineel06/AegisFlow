'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, AlertTriangle, CheckCircle, BarChart3, Database, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { name: 'Group A (Majority)', approvals: 85, rejections: 15 },
  { name: 'Group B (Minority)', approvals: 45, rejections: 55 },
  { name: 'Group C (Protected)', approvals: 58, rejections: 42 },
  { name: 'Group D (Elderly)', approvals: 72, rejections: 28 },
];

export default function BiasDetectionDashboard({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('aegis_uploaded_data')) {
      setIsUploaded(true);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawText = event.target?.result as string;
        localStorage.setItem('aegis_uploaded_data', rawText);
        setIsUploaded(true);
        if (onUploadSuccess) onUploadSuccess();
      };
      reader.readAsText(file);
    }
  };

  const handleClearDataset = () => {
    localStorage.removeItem('aegis_uploaded_data');
    setIsUploaded(false);
  };

  const handleExportData = () => {
    const csvContent = [
      ['Group Name', 'Approvals', 'Rejections'],
      ...mockData.map(row => [row.name, row.approvals, row.rejections])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dashboard_Metrics.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-10 mt-8 mb-4 border-t border-white/10 pt-10">
      {/* Data Ingestion Component */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
          <Database className="w-5 h-5 text-[var(--accent-emerald)]" />
          Data Ingestion Pipeline
        </h2>
        {isUploaded ? (
          <div className="glass-panel border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-green-500/10 rounded-2xl p-16 flex flex-col items-center justify-center transition-all duration-500 relative">
            <button 
              onClick={handleClearDataset}
              className="absolute top-4 right-4 p-2 text-red-500 hover:text-white hover:bg-red-500/80 bg-red-500/10 border border-red-500/30 rounded-lg transition-all duration-300 flex items-center gap-2 group shadow-[0_0_15px_rgba(239,68,68,0.1)]"
              title="Clear Dataset"
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase hidden group-hover:inline-block">Clear Dataset</span>
            </button>
            <CheckCircle className="w-16 h-16 text-green-400 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
            <h3 className="text-2xl font-black tracking-widest uppercase mb-3 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              Dataset Loaded Successfully
            </h3>
            <p className="text-sm text-green-400/80 font-mono tracking-wider text-center max-w-lg leading-relaxed">
              Target CSV ingested. Systemic bias detection models are now analyzing the dataset.
            </p>
          </div>
        ) : (
          <div className="glass-panel border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center transition-all duration-500 border-white/20 hover:border-[var(--accent-sapphire)] hover:shadow-[0_0_20px_rgba(var(--accent-sapphire-rgb),0.2)] group">
            <div className="bg-black/40 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <UploadCloud className="w-16 h-16 transition-colors duration-500 text-[var(--accent-sapphire)] group-hover:text-[var(--accent-sapphire)]" />
            </div>
            <h3 className="text-2xl font-black tracking-widest uppercase mb-3 text-white transition-colors duration-500 group-hover:text-[var(--accent-sapphire)]">
              Initialize Secure Ingestion
            </h3>
            <p className="text-sm text-gray-400 font-mono tracking-wider mb-8 text-center max-w-lg leading-relaxed">
              Select target CSV datasets to begin deep-layer algorithmic auditing and systemic bias detection.
            </p>
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="magnetic-btn px-8 py-3 rounded-lg text-sm font-mono tracking-widest uppercase font-bold text-white bg-gradient-to-r from-[rgba(var(--accent-sapphire-rgb),0.3)] to-[rgba(var(--accent-sapphire-rgb),0.1)] border border-[var(--accent-sapphire)]/50 hover:bg-[var(--accent-sapphire)] hover:text-white transition-all shadow-[0_0_15px_rgba(var(--accent-sapphire-rgb),0.4)] cursor-pointer"
            >
              Upload CSV Dataset
            </button>
          </div>
        )}
      </section>

      {/* Bias Detection Overview Dashboard */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[var(--accent-sapphire)]" />
          Bias Detection Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-green-400 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><CheckCircle className="w-16 h-16 text-green-400" /></div>
             <p className="text-sm font-mono text-gray-400 tracking-wider mb-2 uppercase">Overall Data Health</p>
             <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-white">
               92.4<span className="text-2xl text-gray-400">%</span>
             </h2>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-red-500 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><AlertTriangle className="w-16 h-16 text-red-500" /></div>
             <p className="text-sm font-mono text-gray-400 tracking-wider mb-2 uppercase">Disparate Impact Ratio</p>
             <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">0.52</h2>
             <p className="text-xs text-red-400 mt-3 font-mono bg-red-500/10 inline-block px-3 py-1 rounded-md font-bold tracking-widest border border-red-500/20">WARNING &lt; 0.80</p>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-[var(--accent-sapphire)] relative overflow-hidden group">
             <p className="text-sm font-mono text-gray-400 tracking-wider mb-4 uppercase">High-Risk Features</p>
             <div className="flex flex-wrap gap-3">
                {['Age', 'Zip Code', 'Gender', 'Income Bracket'].map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1.5 bg-[var(--accent-sapphire)]/10 text-[var(--accent-sapphire)] border border-[var(--accent-sapphire)]/30 rounded-md font-bold tracking-wider hover:bg-[var(--accent-sapphire)]/30 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
             </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5 h-[450px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--accent-emerald)]" />
              Demographic Approval Variance
            </h3>
            <button 
              onClick={handleExportData}
              className="px-3 py-1 rounded bg-black/40 border border-white/10 text-xs font-mono text-gray-400 tracking-widest cursor-pointer hover:text-white transition-colors"
            >
              EXPORT DATA
            </button>
          </div>
          <div className="h-full pb-10">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'monospace'}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'monospace'}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}} 
                  contentStyle={{ backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                  itemStyle={{ fontFamily: 'monospace', fontSize: '13px' }}
                  labelStyle={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }} />
                <Bar dataKey="approvals" name="Approval Rate (%)" fill="var(--accent-emerald)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="rejections" name="Rejection Rate (%)" fill="var(--accent-sapphire)" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
