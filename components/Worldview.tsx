
import React from 'react';
import { WORLDVIEW } from '../constants';

const Worldview: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-12">
      
      {/* 1. Text Intro Section */}
      <div className="text-center py-16 md:py-24 max-w-4xl mx-auto px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 space-y-8">
          <span className="inline-block px-4 py-1.5 border border-slate-700 text-slate-500 text-[10px] tracking-[0.4em] uppercase rounded-full bg-[#0a0510]/50 backdrop-blur-md">
            L'heure entre chien et loup
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl text-slate-200 font-normal tracking-wide leading-tight">
            {WORLDVIEW.title}
          </h2>
          
          <div className="flex items-center justify-center gap-6 opacity-30">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-slate-400"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-slate-400"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-slate-400"></div>
          </div>

          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed serif italic">
            "저 언덕 너머로 다가오는 실루엣이<br/>
            내가 기르던 개인지, 나를 해치러 오는 늑대인지<br/>
            분간할 수 없는 시간."
          </p>
          
          <p className="text-xs md:text-sm text-slate-500 font-light mt-8 tracking-wider max-w-xl mx-auto leading-8 text-justify md:text-center whitespace-pre-line">
            {WORLDVIEW.description}
          </p>
        </div>
      </div>

      {/* 2. World Map Visualization */}
      <div className="max-w-5xl mx-auto px-4 mb-24">
        <div className="w-full h-[350px] md:h-[450px] bg-[#100c18] rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
          {/* Map Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
          </div>
          
          <div className="absolute top-8 left-8 z-10">
            <h3 className="text-slate-600 text-[10px] tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
              Tactical Map
            </h3>
          </div>

          <div className="relative w-full h-full">
            {/* North (Fenrir) */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-1000 z-10">
               <span className="text-2xl opacity-80 mb-2">🏔️</span>
               <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent"></div>
               <span className="text-slate-400 font-serif tracking-widest text-[10px] uppercase mt-2">The Grey Mountains</span>
            </div>

            {/* West (Taxidea / Badger / Underground) */}
            <div className="absolute top-[60%] left-[15%] md:left-[20%] flex flex-col items-center group-hover:translate-x-2 transition-transform duration-1000 z-10">
               <span className="text-xl opacity-70 mb-1">🕳️</span>
               <div className="w-8 h-px bg-gradient-to-l from-slate-600 to-transparent block md:hidden"></div>
               <span className="text-slate-500 font-serif tracking-widest text-[9px] uppercase mt-1">Underground Market</span>
            </div>

            {/* East (Corvus / Crow / Forest) */}
            <div className="absolute top-[35%] right-[15%] md:right-[20%] flex flex-col items-center group-hover:-translate-x-2 transition-transform duration-1000 z-10">
               <span className="text-xl opacity-70 mb-1">🌲</span>
               <div className="w-8 h-px bg-gradient-to-r from-slate-600 to-transparent block md:hidden"></div>
               <span className="text-slate-500 font-serif tracking-widest text-[9px] uppercase mt-1">Shadow Forest</span>
            </div>

            {/* Center (Fallen Empire) */}
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-0">
               <div className="absolute w-[300px] h-[1px] bg-white/5 rotate-45"></div>
               <div className="absolute w-[300px] h-[1px] bg-white/5 -rotate-45"></div>
               <span className="text-xl opacity-50 grayscale">🏚️</span>
               <span className="text-slate-600 font-serif tracking-widest text-[9px] uppercase mt-2">Fallen Empire</span>
            </div>

            {/* South (Coyote) */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col-reverse items-center group-hover:translate-y-2 transition-transform duration-1000 z-10">
               <span className="text-2xl opacity-80 mt-2">🌪️</span>
               <div className="h-8 w-px bg-gradient-to-t from-slate-600 to-transparent"></div>
               <span className="text-slate-400 font-serif tracking-widest text-[10px] uppercase mb-2">Windy Plains</span>
            </div>
            
            {/* Radar Animation */}
            <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none opacity-30">
                <div className="w-full h-1/2 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent blur-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Factions Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-6 mb-16">
            <span className="text-slate-500 font-serif italic text-lg opacity-50">Chronicles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORLDVIEW.chapters.map((chapter, index) => {
            return (
              <div 
                key={chapter.id} 
                className="relative flex flex-col p-8 md:p-10 bg-[#151020]/40 backdrop-blur-sm rounded-3xl border border-white/5 hover:border-indigo-500/10 transition-all duration-700 group hover:bg-[#1a1525]"
              >
                <div className="absolute top-8 right-8 text-slate-800 font-serif text-5xl opacity-50 group-hover:text-indigo-950 transition-colors">
                  0{index + 1}
                </div>

                <div className="w-12 h-12 mb-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                  {chapter.id.includes('north') && <span className="text-xl opacity-70 grayscale group-hover:grayscale-0 transition-all">🏔️</span>}
                  {chapter.id.includes('south') && <span className="text-xl opacity-70 grayscale group-hover:grayscale-0 transition-all">🌪️</span>}
                  {chapter.id.includes('humanity') && <span className="text-xl opacity-70 grayscale group-hover:grayscale-0 transition-all">🏚️</span>}
                  {chapter.id.includes('magic') && <span className="text-xl opacity-70 grayscale group-hover:grayscale-0 transition-all">✨</span>}
                </div>

                <h3 className="text-lg font-normal text-slate-200 mb-4 serif tracking-wide">
                  {chapter.title.split(' (')[0]}
                  <span className="block text-[10px] text-slate-600 font-sans tracking-[0.2em] uppercase mt-2">
                    {chapter.title.match(/\((.*?)\)/)?.[1]}
                  </span>
                </h3>
                <div className="h-px w-8 bg-slate-700 mb-6 group-hover:w-16 group-hover:bg-indigo-400/50 transition-all duration-700"></div>
                <p className="text-slate-400 leading-7 text-xs font-light flex-grow text-justify">
                  {chapter.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Footer Quote */}
      <div className="mt-24 p-12 text-center relative max-w-3xl mx-auto">
        <div className="relative z-10">
            <h3 className="serif text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed font-light italic">
            "당신을 기다리는 <span className="text-amber-100/80 not-italic border-b border-amber-200/20 pb-1">두 짐승</span>을 만나러 가는 길."
            </h3>
            <div className="w-1 h-8 bg-gradient-to-b from-slate-700 to-transparent mx-auto mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Worldview;
