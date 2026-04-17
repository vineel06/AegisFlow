'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  ShieldAlert, 
  Settings,
  Hexagon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Data Inspector', icon: Database, href: '/inspector' },
  { name: 'AI Ethics Report', icon: ShieldAlert, href: '/ethics' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 flex flex-col p-6 border-r border-[#1e293b] glass-panel z-50 transition-all duration-300">
      <div className="flex flex-col items-center gap-4 mb-10 group cursor-pointer text-center">
        <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-slate-700 shadow-[0_0_20px_rgba(var(--accent-sapphire-rgb),0.4)] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(var(--accent-sapphire-rgb),0.6)]">
          <img src="/logo.jpeg" alt="AegisFlow Logo" className="absolute w-[180%] max-w-none left-1/2 top-0 -translate-x-1/2" />
        </div>
        <h1 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase mt-2">
          Aegis<span className="text-[var(--accent-sapphire)]">Flow</span>
        </h1>
      </div>

      <nav className="flex-1 flex flex-col gap-3 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 border border-transparent font-medium tracking-wide w-full
                ${isActive 
                  ? 'bg-white/5 glow-active-sapphire bg-gradient-to-r from-[rgba(var(--accent-sapphire-rgb),0.1)] to-transparent' 
                  : 'text-gray-400 hover:bg-white/5 glow-hover-emerald'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-md">
          <p className="text-xs text-gray-400 font-mono tracking-wider flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] shadow-[0_0_5px_var(--accent-emerald)] animate-pulse inline-block"></span>
            SYSTEM STATUS
          </p>
          <div className="text-sm font-semibold text-white">All nodes active</div>
        </div>
      </div>
    </aside>
  );
}
