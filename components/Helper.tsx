
import React from 'react';
import { WORLD_KEYWORDS, CHAT_COMMANDS } from '../constants';

const Helper: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header */}
      <div className="text-center mb-20 relative">
         <h2 className="font-cinzel text-3xl md:text-5xl text-amber-100/80 font-normal mb-4 tracking-widest relative z-10">
           GUIDE & KEYWORDS
         </h2>
         <div className="w-12 h-px bg-slate-700 mx-auto"></div>
      </div>

      {/* 1. Chat Commands Section */}
      <div className="mb-24">
        <div className="flex items-center justify-center space-x-4 mb-10">
            <h3 className="text-xl font-serif italic text-slate-300 tracking-wide">Player Commands</h3>
        </div>

        {/* Changed grid to single column for full width to prevent text wrapping */}
        <div className="grid grid-cols-1 gap-6 px-2">
          {CHAT_COMMANDS.map((group, idx) => (
            <div key={idx} className="bg-[#151020]/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-indigo-500/20 transition-colors group">
              <div className="flex items-center mb-6 border-b border-white/5 pb-4">
                <span className="text-xl mr-3 opacity-70 grayscale group-hover:grayscale-0 transition-all">{group.icon}</span>
                <h4 className="text-lg font-bold text-slate-300 tracking-widest uppercase">{group.category}</h4>
              </div>
              <ul className="space-y-6">
                {group.items.map((item, i) => (
                  <li key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 border-b border-white/5 last:border-0 pb-4 last:pb-0">
                    <span className="text-amber-200 font-mono text-lg tracking-wider min-w-[160px] flex-shrink-0 text-left font-medium">
                      {item.command}
                    </span>
                    <span className="text-slate-400 text-sm md:text-base leading-7 font-light">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Worldview Keywords Section */}
      <div className="px-2">
        <div className="flex items-center justify-center space-x-4 mb-10">
            <h3 className="text-xl font-serif italic text-slate-300 tracking-wide">Glossary</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORLD_KEYWORDS.map((item, index) => {
              // Extract term inside parenthesis if exists, otherwise title
              const mainTitle = item.term.split(' (')[0];
              const subTitle = item.term.match(/\((.*?)\)/)?.[1]?.split(';').pop()?.trim() || item.term.match(/\((.*?)\)/)?.[1];

              return (
                <div key={index} className="bg-[#151020]/40 p-8 rounded-2xl border border-white/5 hover:bg-[#1a1525] transition-all group relative overflow-hidden">
                  <div className="absolute top-4 right-6 font-serif text-4xl text-slate-800/50 group-hover:text-indigo-900/30 transition-colors">
                    0{index + 1}
                  </div>
                  
                  <h4 className="text-lg text-slate-200 font-serif mb-3 relative z-10 flex items-center">
                    {mainTitle}
                    {subTitle && (
                      <span className="text-[10px] text-slate-600 ml-3 font-sans font-light uppercase tracking-widest border border-slate-800 px-2 py-0.5 rounded-full">
                        {subTitle}
                      </span>
                    )}
                  </h4>
                  
                  <p className="text-slate-400 leading-7 text-sm md:text-base font-light relative z-10">
                    {item.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Helper;
