'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BotMessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { id: string; text: string; isUser: boolean };

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', text: 'Hello! I am the automated Help Desk for AegisFlow. Ask me anything about algorithmic auditing or bias detection.', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: newMessageId, text: userMsg, isUser: true }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/support-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMsg })
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), text: data.response || data.error, isUser: false }]);
    } catch (error) {
       setMessages(prev => [...prev, { id: Date.now().toString(), text: "System Error: Unable to reach processing core.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col glass-panel rounded-2xl border border-[var(--accent-sapphire)]/30 overflow-hidden shadow-[0_0_40px_rgba(var(--accent-sapphire-rgb),0.3)] mb-4"
            >
              <div className="bg-[#0B0F19]/80 border-b border-white/10 px-4 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-sapphire)]/20 border border-[var(--accent-sapphire)]/50 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[var(--accent-sapphire)]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wider uppercase font-mono">Aegis Helper</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">System Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--accent-sapphire-rgb),0.02)] to-transparent pointer-events-none"></div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} w-full relative z-10`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-mono leading-relaxed shadow-lg ${
                      msg.isUser 
                        ? 'bg-[var(--accent-emerald)]/20 border border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] rounded-br-none' 
                        : 'bg-black/40 border border-[var(--accent-sapphire)]/20 text-gray-300 rounded-bl-none hover:border-[var(--accent-sapphire)]/40 transition-colors'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start w-full relative z-10">
                    <div className="max-w-[85%] rounded-2xl rounded-bl-none px-4 py-3 bg-black/40 border border-[var(--accent-sapphire)]/20 text-[var(--accent-sapphire)] flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs font-mono uppercase tracking-widest">Processing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-[#0B0F19]/90 border-t border-white/10 p-3 z-10">
                <form onSubmit={sendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your query..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[var(--accent-sapphire)]/50 transition-colors placeholder:text-gray-600"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-[var(--accent-sapphire)]/20 border border-[var(--accent-sapphire)]/50 text-[var(--accent-sapphire)] hover:bg-[var(--accent-sapphire)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                     <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[rgba(var(--accent-sapphire-rgb),0.8)] to-[rgba(var(--accent-sapphire-rgb),0.6)] border border-[var(--accent-sapphire)] shadow-[0_0_20px_rgba(var(--accent-sapphire-rgb),0.6)] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--accent-sapphire-rgb),0.8)] transition-all z-50 relative cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6 animate-in zoom-in duration-200" /> : <BotMessageSquare className="w-6 h-6 animate-in zoom-in duration-200" />}
          
          {/* Subtle pulse effect underneath */}
          {!isOpen && (
            <>
               <div className="absolute inset-0 rounded-full bg-[var(--accent-sapphire)] opacity-40 animate-ping -z-10"></div>
               <div className="absolute -inset-1 rounded-full bg-[var(--accent-sapphire)] opacity-20 animate-pulse -z-10"></div>
            </>
          )}
        </button>
      </div>
    </>
  );
}
