'use client';

import React, { useState } from 'react';
import { Database, Filter, Search } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from 'recharts';

const mockScatterData = [
  { group: 'Demographic A', id: 1, score: 85, exp: 5 },
  { group: 'Demographic A', id: 2, score: 78, exp: 3 },
  { group: 'Demographic A', id: 3, score: 92, exp: 6 },
  { group: 'Demographic A', id: 4, score: 88, exp: 4 },
  { group: 'Demographic B', id: 5, score: 65, exp: 5 },
  { group: 'Demographic B', id: 6, score: 72, exp: 4 },
  { group: 'Demographic B', id: 7, score: 58, exp: 2 },
  { group: 'Demographic B', id: 8, score: 62, exp: 3 },
  { group: 'Demographic C', id: 9, score: 90, exp: 7 },
  { group: 'Demographic C', id: 10, score: 82, exp: 4 },
  { group: 'Demographic C', id: 11, score: 86, exp: 5 },
  { group: 'Demographic C', id: 12, score: 75, exp: 3 },
];

const mockTableData = [
  { id: 'CAND-8901', role: 'Software Engineer', group: 'Demographic A', score: 92, decision: 'Approved' },
  { id: 'CAND-8902', role: 'Product Manager', group: 'Demographic C', score: 86, decision: 'Approved' },
  { id: 'CAND-8903', role: 'Data Analyst', group: 'Demographic B', score: 65, decision: 'Rejected' },
  { id: 'CAND-8904', role: 'Software Engineer', group: 'Demographic A', score: 78, decision: 'Approved' },
  { id: 'CAND-8905', role: 'UX Designer', group: 'Demographic B', score: 58, decision: 'Rejected' },
  { id: 'CAND-8906', role: 'DevOps Engineer', group: 'Demographic A', score: 85, decision: 'Approved' },
  { id: 'CAND-8907', role: 'Product Manager', group: 'Demographic B', score: 72, decision: 'Approved' },
  { id: 'CAND-8908', role: 'Data Analyst', group: 'Demographic C', score: 90, decision: 'Approved' },
  { id: 'CAND-8909', role: 'Software Engineer', group: 'Demographic B', score: 62, decision: 'Rejected' },
];

export default function DataInspectorPage() {
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' 
    ? mockTableData 
    : mockTableData.filter(d => d.group === filter);

  const handleExportCSV = () => {
    if (!filteredData || filteredData.length === 0) return;
    const headers = ['Candidate ID', 'Role Applied', 'Demographic Group', 'Algorithm Score', 'Decision'];
    const csvRows = [headers.join(',')];
    for (const row of filteredData) {
      csvRows.push([row.id, row.role, row.group, row.score, row.decision].join(','));
    }
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aegis_Demographics_Export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="flex flex-col gap-8 pb-12"
    >
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase flex items-center gap-3">
            <Database className="w-8 h-8 text-[var(--accent-emerald)]" />
            Data Inspector
          </h1>
          <p className="text-gray-400 font-mono text-sm tracking-wider">AEGIS-FLOW &gt; AUDIT VISUALIZATION &gt; HIRING RECORDS ANALYSIS</p>
        </div>
      </header>

      {/* Scatter Plot Section */}
      <motion.section variants={itemVariants} className="glass-panel rounded-2xl p-6 border border-[var(--accent-emerald)]/20 shadow-[0_0_30px_rgba(var(--accent-emerald-rgb),0.05)] w-full relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--accent-emerald-rgb),0.03)] to-transparent pointer-events-none rounded-2xl"></div>
        <h3 className="text-lg font-mono tracking-widest text-white mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse inline-block"></span>
          Score Distribution by Demographic
        </h3>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" dataKey="id" name="Candidate Index" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace'}} />
              <YAxis type="number" dataKey="score" name="Algorithm Score" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace'}} domain={[40, 100]} />
              <ZAxis type="number" range={[60, 60]} />
              <Tooltip 
                cursor={{strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.2)'}} 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(var(--accent-emerald-rgb),0.3)', borderRadius: '8px', fontFamily: 'monospace' }}
                itemStyle={{ color: 'white' }}
              />
              <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }} />
              
              <Scatter name="Demographic A" data={mockScatterData.filter(d=>d.group==='Demographic A')} fill="var(--accent-emerald)" />
              <Scatter name="Demographic B" data={mockScatterData.filter(d=>d.group==='Demographic B')} fill="var(--accent-sapphire)" />
              <Scatter name="Demographic C" data={mockScatterData.filter(d=>d.group==='Demographic C')} fill="#f59e0b" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Complex Data Table */}
      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white">Historical Hiring Pipeline</h2>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={handleExportCSV}
               className="magnetic-btn bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)] hover:text-black px-4 py-2 rounded-lg text-sm font-mono tracking-widest uppercase font-bold transition-all shadow-[0_0_15px_rgba(var(--accent-emerald-rgb),0.2)] cursor-pointer"
             >
               Export Data
             </button>
             <div className="relative">
               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder="Search ID..." 
                 className="bg-black/30 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-[var(--accent-emerald)]/50 transition-colors"
                 disabled
               />
             </div>
             
             <div className="relative group/filter z-50">
               <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm font-mono tracking-wide text-gray-300 group-hover/filter:border-[var(--accent-sapphire)] transition-colors cursor-pointer">
                 <Filter className="w-4 h-4" />
                 <span>Filter: {filter}</span>
               </div>
               
               {/* Dropdown Menu */}
               <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f1525] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover/filter:opacity-100 group-hover/filter:visible transition-all overflow-hidden">
                 {['All', 'Demographic A', 'Demographic B', 'Demographic C'].map(opt => (
                   <div 
                     key={opt}
                     onClick={() => setFilter(opt)}
                     className={`px-4 py-2 text-sm font-mono cursor-pointer hover:bg-white/5 transition-colors ${filter === opt ? 'text-[var(--accent-sapphire)] font-bold' : 'text-gray-300'}`}
                   >
                     {opt}
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        <div className="glass-panel border border-[var(--accent-emerald)]/30 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(var(--accent-emerald-rgb),0.08)] relative z-10 w-full relative group">
           <table className="w-full text-left border-collapse z-10 relative">
             <thead>
               <tr className="bg-black/40 border-b border-[var(--accent-emerald)]/20 text-xs uppercase font-mono tracking-widest text-[var(--accent-emerald)]/80">
                 <th className="px-6 py-4 font-semibold">Candidate ID</th>
                 <th className="px-6 py-4 font-semibold">Role Applied</th>
                 <th className="px-6 py-4 font-semibold">Demographic Group</th>
                 <th className="px-6 py-4 font-semibold">Algorithm Score</th>
                 <th className="px-6 py-4 font-semibold text-right">Decision</th>
               </tr>
             </thead>
             <tbody className="font-mono text-sm text-gray-300">
               {filteredData.map((row, idx) => (
                 <tr 
                   key={row.id} 
                   className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-black/20'}`}
                 >
                   <td className="px-6 py-4 font-bold text-white">{row.id}</td>
                   <td className="px-6 py-4 tracking-wide">{row.role}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded text-xs tracking-wider border ${
                       row.group === 'Demographic A' ? 'bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] border-[var(--accent-emerald)]/30' :
                       row.group === 'Demographic B' ? 'bg-[var(--accent-sapphire)]/10 text-[var(--accent-sapphire)] border-[var(--accent-sapphire)]/30' :
                       'bg-amber-500/10 text-amber-500 border-amber-500/30'
                     }`}>
                       {row.group}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-black rounded-full overflow-hidden border border-white/10">
                          <div 
                            className={`h-full ${row.score >= 80 ? 'bg-green-500' : row.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${row.score}%` }}
                          ></div>
                        </div>
                        <span className="font-bold">{row.score}</span>
                      </div>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <span className={`px-3 py-1 font-bold tracking-widest uppercase text-xs rounded-lg border ${
                       row.decision === 'Approved' 
                         ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]' 
                         : 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                     }`}>
                       {row.decision}
                     </span>
                   </td>
                 </tr>
               ))}
               {filteredData.length === 0 && (
                 <tr>
                   <td colSpan={5} className="px-6 py-8 text-center text-gray-500 uppercase tracking-widest">
                     No records found for selected demographic mapping.
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      </motion.section>
    </motion.div>
  );
}
