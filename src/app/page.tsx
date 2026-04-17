'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Zap, ShieldCheck, Database, Cpu } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BiasDetectionDashboard from '@/components/BiasDetectionDashboard';

const mockTrafficData = [
  { time: '00:00', ingress: 120, egress: 80 },
  { time: '04:00', ingress: 180, egress: 150 },
  { time: '08:00', ingress: 450, egress: 300 },
  { time: '12:00', ingress: 600, egress: 400 },
  { time: '16:00', ingress: 800, egress: 550 },
  { time: '20:00', ingress: 350, egress: 200 },
  { time: '24:00', ingress: 150, egress: 100 },
];

const fullLogsData = [
  { time: '14:02:11', event: 'Unrecognized handshake protocol from IP 192.168.1.45', level: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-400/10' },
  { time: '13:45:02', event: 'Packet drop near node 4A - Retrying transmission', level: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { time: '12:15:59', event: 'Model drift detected (0.02%) in regional heuristic analysis', level: 'INFO', color: 'text-[var(--accent-emerald)]', bg: 'bg-[var(--accent-emerald)]/10' },
  { time: '11:00:00', event: 'Daily snapshot verified and checksum validated successfully', level: 'OK', color: 'text-green-400', bg: 'bg-green-400/10' },
  { time: '10:30:15', event: 'New user authentication node established', level: 'INFO', color: 'text-[var(--accent-emerald)]', bg: 'bg-[var(--accent-emerald)]/10' },
  { time: '09:45:22', event: 'Bandwidth saturation at 95% for server cluster B', level: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { time: '08:12:05', event: 'Unauthorized access attempt blocked on port 22', level: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-400/10' },
  { time: '07:00:00', event: 'System booted cleanly', level: 'OK', color: 'text-green-400', bg: 'bg-green-400/10' },
];

export default function Dashboard() {
  const [dataIngested, setDataIngested] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('aegis_uploaded_data')) {
      setDataIngested(true);
    }
  }, []);

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
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 uppercase">Dashboard</h1>
          <p className="text-gray-400 font-mono text-sm tracking-wider">AEGIS-FLOW &gt; SYSTEM OVERVIEW &gt; REAL-TIME METRICS</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
            <Activity className="w-4 h-4 text-[var(--accent-emerald)] animate-pulse" />
            <span className="text-sm font-mono tracking-wider font-bold text-[var(--accent-emerald)]">LIVE FEED</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(dataIngested ? [
          { label: 'Data Throughput', value: '4.82 TB/s', icon: Database, color: 'var(--accent-emerald)' },
          { label: 'Threats Mitigated', value: '12,941', icon: ShieldCheck, color: 'var(--accent-sapphire)' },
          { label: 'Processing Power', value: '100%', icon: Cpu, color: 'var(--accent-emerald)' },
          { label: 'Latency', value: '1.8ms', icon: Zap, color: 'var(--accent-sapphire)' }
        ] : [
          { label: 'Data Throughput', value: '1.24 TB/s', icon: Database, color: 'var(--accent-emerald)' },
          { label: 'Threats Mitigated', value: '8,432', icon: ShieldCheck, color: 'var(--accent-sapphire)' },
          { label: 'Processing Power', value: '98.4%', icon: Cpu, color: 'var(--accent-emerald)' },
          { label: 'Latency', value: '4.2ms', icon: Zap, color: 'var(--accent-sapphire)' }
        ]).map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <stat.icon className="w-16 h-16" style={{ color: stat.color }} />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-mono text-gray-400 tracking-wider mb-2 uppercase">{stat.label}</p>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {stat.value}
              </h2>
            </div>
            
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[var(--accent-emerald)] to-[var(--accent-sapphire)] group-hover:w-full transition-all duration-700 ease-out"></div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 min-h-[400px] flex flex-col relative overflow-hidden border border-white/5">
          <div className="absolute -inset-2 bg-gradient-to-b from-[rgba(var(--accent-emerald-rgb),0.03)] to-transparent opacity-50"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-lg font-semibold tracking-wide uppercase text-white">Network Activity Topography</h3>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]"></span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent-sapphire)]"></span>
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
            </div>
          </div>
          <div className="flex-1 relative border border-white/5 rounded-xl bg-black/20 overflow-hidden">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrafficData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-emerald)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-emerald)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-sapphire)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-sapphire)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace'}} />
                <YAxis stroke="rgba(255,255,255,0.2)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(var(--accent-emerald-rgb),0.3)', borderRadius: '8px', fontFamily: 'monospace' }}
                  itemStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="ingress" stroke="var(--accent-emerald)" strokeWidth={2} fillOpacity={1} fill="url(#colorIngress)" />
                <Area type="monotone" dataKey="egress" stroke="var(--accent-sapphire)" strokeWidth={2} fillOpacity={1} fill="url(#colorEgress)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="glass-panel rounded-2xl p-6 flex flex-col border border-white/5 hover:border-[var(--accent-sapphire)]/30 transition-colors duration-500">
          <h3 className="text-lg font-semibold tracking-wide uppercase text-white mb-6">System Anomalies</h3>
          <div className="flex-1 flex flex-col gap-4">
            {[
              { time: '14:02:11', event: 'Unrecognized handshake protocol', level: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-400/10' },
              { time: '13:45:02', event: 'Packet drop near node 4A', level: 'WARNING', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
              { time: '12:15:59', event: 'Model drift detected (0.02%)', level: 'INFO', color: 'text-[var(--accent-emerald)]', bg: 'bg-[var(--accent-emerald)]/10' },
              { time: '11:00:00', event: 'Daily snapshot verified', level: 'OK', color: 'text-green-400', bg: 'bg-green-400/10' }
            ].map((log, i) => (
              <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/5 flex flex-col gap-2 hover:bg-white/5 transition-colors cursor-default group">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-mono px-2 py-1 rounded ${log.bg} ${log.color} font-bold tracking-widest`}>
                    {log.level}
                  </span>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-gray-300 transition-colors">{log.time}</span>
                </div>
                <p className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{log.event}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsLogModalOpen(true)}
            className="magnetic-btn w-full mt-4 py-3 rounded-xl border border-white/10 hover:border-[var(--accent-sapphire)] text-gray-400 hover:text-white hover:bg-[var(--accent-sapphire)]/10 transition-all font-mono text-xs tracking-widest uppercase font-bold text-center cursor-pointer"
          >
            View Full Logs
          </button>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <BiasDetectionDashboard onUploadSuccess={() => setDataIngested(true)} />
      </motion.div>

      {/* Logs Modal Overlay */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-3xl glass-panel rounded-2xl border border-[var(--accent-sapphire)]/30 overflow-hidden shadow-[0_0_50px_rgba(var(--accent-sapphire-rgb),0.2)] flex flex-col max-h-[80vh] relative">
             <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
               <h2 className="text-xl font-bold tracking-widest uppercase text-white flex items-center gap-3">
                 <ShieldCheck className="w-6 h-6 text-[var(--accent-sapphire)]" />
                 Comprehensive System Logs
               </h2>
               <button onClick={() => setIsLogModalOpen(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
             </div>
             <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-3 custom-scrollbar">
                {fullLogsData.map((log, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/5 flex gap-4 hover:bg-white/5 transition-colors cursor-default items-center">
                    <span className={`text-xs font-mono px-3 py-1.5 rounded w-28 text-center ${log.bg} ${log.color} font-bold tracking-widest flex-shrink-0`}>
                      {log.level}
                    </span>
                    <span className="text-sm font-mono text-gray-500 flex-shrink-0 w-24">{log.time}</span>
                    <p className="text-sm text-gray-300 font-medium">{log.event}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
