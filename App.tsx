
import React, { useState, useEffect, useRef } from 'react';
import { CHARACTERS } from './constants';
import { Character } from './types';
import CharacterCard from './components/CharacterCard';
import StatRadar from './components/StatRadar';
import Worldview from './components/Worldview';
import Helper from './components/Helper';
import CursorEffect from './components/CursorEffect';
import StarryBackground from './components/StarryBackground';

// 제공해주신 배경음악 링크
const BGM_URL = "https://mangae.uk/%EC%84%A4%EC%9B%90%20%EC%95%84%EB%9E%98%20%EC%9E%A0%EB%93%A0%20%EC%88%B2.mp3";
// 부드러운 UI 클릭 효과음 (무료 라이선스)
const CLICK_SFX_URL = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8b417b165.mp3?filename=mouse-click-153941.mp3";
// 링크 설정
const CRACK_LINK = "https://share.crack.wrtn.ai/znedgt"; // 하단 Crack 버튼용
const START_STORY_LINK = "https://share.crack.wrtn.ai/8jxc9yz"; // 메인 Start Story 버튼용
const POSTYPE_LINK = "https://www.postype.com/@k-mangae";

type Tab = 'worldview' | 'characters' | 'helper';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('worldview');
  const [selectedId, setSelectedId] = useState<string>(CHARACTERS[0].id);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  
  // 음악 상태 관리
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  const selectedChar = CHARACTERS.find(c => c.id === selectedId) || CHARACTERS[0];

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    
    clickAudioRef.current = new Audio(CLICK_SFX_URL);
    clickAudioRef.current.volume = 0.4; 

    const handleGlobalClick = () => {
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(() => {});
      }
      
      if (audioRef.current && isMusicPlaying && audioRef.current.paused) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => {
          setIsMusicPlaying(false); 
        });
      }
    };

    window.addEventListener('mousedown', handleGlobalClick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log("Playback failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleRevealSecret = () => {
    if (isRevealing || secretRevealed) return;
    setIsRevealing(true);
    
    setTimeout(() => {
      setSecretRevealed(true);
      setIsRevealing(false);
    }, 1500); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'worldview':
        return <Worldview />;
      case 'characters':
        return (
          <div className="flex flex-col items-center gap-12 animate-in fade-in duration-500">
            
            {/* 1. 상단 중앙: 캐릭터 선택 리스트 */}
            <div className="w-full max-w-3xl relative z-20">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-xl">
                 <div className="text-center mb-6">
                    <h3 className="text-xl font-serif italic text-amber-100 mb-2 tracking-[0.2em] uppercase">Destined Partners</h3>
                    <div className="h-px w-8 bg-amber-200/30 mx-auto"></div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CHARACTERS.map(char => (
                      <CharacterCard
                        key={char.id}
                        character={char}
                        isSelected={selectedId === char.id}
                        onClick={() => {
                          setSelectedId(char.id);
                          setSecretRevealed(false);
                        }}
                      />
                    ))}
                 </div>
              </div>
            </div>

            {/* 2. 중앙: 캐릭터 상세 정보 */}
            <div className="w-full max-w-6xl">
                <div className="bg-slate-900/40 backdrop-blur-lg rounded-[2rem] overflow-hidden border border-white/10 h-full flex flex-col relative group shadow-2xl">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent z-20"></div>

                  {/* 메인 비주얼 */}
                  <div 
                    className="relative h-[24rem] md:h-[30rem] overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <img
                      src={selectedChar.imageUrl}
                      alt={selectedChar.name}
                      className="w-full h-full object-cover transition-all duration-[1s] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    {/* 어두운 그라데이션 (호버 시 사라짐) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10 transition-opacity duration-700 group-hover:opacity-0"></div>
                    
                    {/* 좌측: 이름 및 기본 정보 (호버 시 투명도 조절 선택 가능, 현재는 유지) */}
                    <div className="absolute bottom-20 left-6 md:bottom-24 md:left-10 z-20 text-white text-left transition-opacity duration-500 group-hover:opacity-0">
                      <div className="flex items-center space-x-3 mb-2">
                          <div className="h-px w-8 bg-amber-200/70"></div>
                          <p className="text-[10px] tracking-[0.4em] text-amber-100 uppercase font-light">{selectedChar.japaneseName}</p>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-serif text-white mb-3 tracking-wide drop-shadow-lg">{selectedChar.name.split(' (')[0]}</h2>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-indigo-900/50 text-indigo-100 px-3 py-1 rounded-full text-xs tracking-wider border border-indigo-500/30 backdrop-blur-sm">
                          {selectedChar.role}
                        </span>
                        <span className="bg-white/5 text-slate-300 px-3 py-1 rounded-full text-xs tracking-wider border border-white/10 backdrop-blur-sm">
                          {selectedChar.birthday}
                        </span>
                      </div>
                    </div>

                    {/* 중앙 하단: 캐릭터 대사 (호버 시 투명도 조절) */}
                    <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center px-4 transition-opacity duration-500 group-hover:opacity-0">
                        <div className="max-w-5xl w-full text-center">
                            <p className="font-serif italic text-lg md:text-xl text-slate-100/90 leading-relaxed drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis px-4 py-2">
                              "{selectedChar.catchphrase}"
                            </p>
                        </div>
                    </div>
                  </div>

                  {/* 기본 프로필 요약 */}
                  <div className="p-8 md:p-10 flex-1 bg-gradient-to-b from-slate-900 to-slate-900/80">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                      <section className="space-y-4">
                        <h4 className="text-[10px] text-amber-200/50 tracking-[0.3em] uppercase border-l border-amber-500/30 pl-3">Profile</h4>
                        <ul className="space-y-3 text-slate-300">
                          <li className="flex justify-between border-b border-white/5 pb-2 text-xs font-light">
                            <span className="text-slate-500 uppercase tracking-wider">Age</span>
                            <span>{selectedChar.age}세</span>
                          </li>
                          <li className="flex justify-between border-b border-white/5 pb-2 text-xs font-light">
                            <span className="text-slate-500 uppercase tracking-wider">Height</span>
                            <span>{selectedChar.height}cm</span>
                          </li>
                          {/* Scent (체향) */}
                          <li className="flex flex-col border-b border-white/5 pb-2 text-xs font-light gap-1">
                            <span className="text-slate-500 uppercase tracking-wider">Scent</span>
                            <span className="text-amber-100/90">{selectedChar.scent}</span>
                          </li>
                          {/* Romance Style (연애 스타일) */}
                          <li className="flex flex-col border-b border-white/5 pb-2 text-xs font-light gap-1">
                            <span className="text-slate-500 uppercase tracking-wider">Romance Style</span>
                            <span className="text-indigo-200/90 leading-relaxed">{selectedChar.romanceStyle}</span>
                          </li>
                        </ul>
                      </section>

                      <section className="space-y-4">
                        <h4 className="text-[10px] text-amber-200/50 tracking-[0.3em] uppercase border-l border-amber-500/30 pl-3">Description</h4>
                        <p className="text-slate-300 leading-7 text-xs font-light tracking-wide text-justify">{selectedChar.description}</p>
                      </section>

                      <section className="space-y-2">
                        <h4 className="text-[10px] text-amber-200/50 tracking-[0.3em] uppercase border-l border-amber-500/30 pl-3">Ability</h4>
                        <StatRadar stats={selectedChar.stats} color={selectedChar.color} />
                      </section>
                    </div>
                  </div>
                </div>
            </div>

            {/* 3. 하단: 비밀 설정 (중앙 정렬) */}
            <div className="w-full max-w-6xl">
              <div className="bg-gradient-to-br from-slate-900/90 to-[#0c0518] backdrop-blur-md rounded-[2rem] p-10 md:p-14 relative overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] select-none pointer-events-none">
                   {/* Decorative Icon Background */}
                </div>
                
                {/* Header */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                  <div>
                    <h4 className="text-amber-100 font-serif italic text-2xl tracking-wide mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-amber-200/60 rotate-45 mr-4"></span>
                      Confidential Archive
                    </h4>
                    <p className="text-slate-500 text-xs tracking-wider font-light">이 기록은 대상의 심연을 다루며, 열람 시 주의가 필요합니다.</p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative z-10 min-h-[140px] flex items-center justify-center">
                  {isRevealing ? (
                    <div className="flex flex-col items-center space-y-6">
                      <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-200 to-transparent animate-pulse"></div>
                      <p className="text-amber-100/30 text-[10px] tracking-[0.5em] uppercase">Decrypting...</p>
                    </div>
                  ) : secretRevealed ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full">
                      {/* 비밀 상세 내용 (Full Width) */}
                      <div className="w-full bg-black/20 border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-amber-500/80 text-[10px] tracking-[0.2em] uppercase py-1 px-3 border border-amber-500/20 rounded-sm">Top Secret</span>
                            <div className="h-px flex-1 bg-white/5"></div>
                        </div>
                        <div className="text-slate-300 text-sm leading-8 whitespace-pre-wrap font-light tracking-wide">
                          {selectedChar.secretIdentity}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleRevealSecret}
                      className="w-full text-center py-12 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer group rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5"
                    >
                       <span className="text-5xl font-serif text-slate-500 group-hover:text-amber-200 transition-colors block mb-4 transform group-hover:scale-110 duration-500">?</span>
                      <p className="text-slate-500 group-hover:text-amber-100 text-xs tracking-[0.3em] font-light uppercase transition-colors">
                        Click to Decrypt Archive
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'helper':
        return <Helper />;
    }
  };

  // 모달 컴포넌트 (미연시 스타일 팝업)
  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div 
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
        onClick={() => setShowModal(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          {/* 이미지 래퍼: 이미지 크기에 맞춰짐 (inline-block) */}
          <div className="relative max-w-full max-h-[90vh] pointer-events-auto flex justify-center">
             <img 
               src={selectedChar.imageUrl} 
               alt={selectedChar.name} 
               className="max-w-full max-h-[90vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg"
             />

             {/* 하단 미연시 대화창 - 이미지 내부 하단 배치 */}
             <div 
               className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%]"
               onClick={(e) => e.stopPropagation()} 
             >
               <div className="w-full bg-black/80 border border-slate-500/50 rounded-xl p-4 md:p-6 shadow-2xl relative backdrop-blur-md">
                  
                  {/* 이름표 */}
                  <div className="absolute -top-3 left-4 bg-[#1a1525] text-amber-100 px-4 py-1 border border-slate-600 rounded-t-lg shadow-lg font-serif text-sm md:text-base tracking-wider">
                    {selectedChar.name.split(' (')[0]}
                  </div>

                  {/* 대사 텍스트 */}
                  <div className="mt-1 flex items-center justify-center text-center">
                    <p className="text-slate-100 font-serif text-sm md:text-lg leading-relaxed tracking-wide drop-shadow-md whitespace-nowrap">
                      "{selectedChar.catchphrase}"
                    </p>
                  </div>

                  {/* 진행 화살표 아이콘 */}
                  <div className="absolute bottom-3 right-3 text-amber-200/70 animate-bounce">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-[#0a0510] flex flex-col items-center justify-center z-50">
        <h1 className="font-cinzel text-5xl md:text-7xl text-amber-100/90 animate-pulse mb-6 tracking-[0.2em] uppercase text-center font-thin">Twilight</h1>
        <p className="text-slate-500 text-[10px] tracking-[0.6em] uppercase mb-12">Between Dog and Wolf</p>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-amber-200/50 to-transparent"></div>
      </div>
    );
  }

  return (
    // 배경: 아주 깊은 밤의 색 (다크 바이올렛/네이비)
    <div className="min-h-screen bg-[#0f0b15] pb-12 flex flex-col relative overflow-hidden text-slate-200 selection:bg-amber-900/30 selection:text-amber-100">
      <StarryBackground />
      <CursorEffect />

      <audio ref={audioRef} src={BGM_URL} loop autoPlay />

      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/5 hover:bg-white/10 text-amber-100/70 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 group"
        title="BGM On/Off"
      >
        {isMusicPlaying ? (
           <div className="flex items-end justify-center space-x-0.5 h-3">
             <div className="w-0.5 bg-amber-100/70 animate-[pulse_0.6s_infinite] h-full"></div>
             <div className="w-0.5 bg-amber-100/70 animate-[pulse_0.8s_infinite] h-2"></div>
             <div className="w-0.5 bg-amber-100/70 animate-[pulse_0.5s_infinite] h-full"></div>
           </div>
        ) : (
           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.017 21L14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V20H21.017C21.017 21.1046 20.1216 22 19.017 22H9.01701C7.91244 22 7.01701 21.1046 7.01701 20H10.017V21ZM14.017 13.5V6.5L10.017 6.5V13.5L14.017 13.5Z" transform="scale(0.8) translate(2,2)" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
        )}
      </button>

      <header className="pt-20 pb-10 px-6 text-center z-10">
        <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-slate-200 to-slate-400 font-normal mb-6 tracking-[0.2em] drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] uppercase">
          Twilight
        </h1>
        <p className="text-xs md:text-sm text-slate-500 tracking-[0.8em] uppercase mb-12 font-light">The Time Between Dog and Wolf</p>
        
        <nav className="inline-flex justify-center p-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
          {(['worldview', 'characters', 'helper'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 md:px-10 py-2.5 rounded-full text-xs md:text-sm transition-all duration-500 uppercase tracking-widest ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-indigo-900/80 to-slate-800/80 text-amber-100 shadow-[0_0_15px_rgba(99,102,241,0.2)] border border-white/10' 
                  : 'text-slate-500 hover:text-slate-300 font-light'
              }`}
            >
              {tab === 'worldview' ? 'World' : tab === 'characters' ? 'Partner' : 'Guide'}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-4 flex-grow z-10">
        {renderContent()}
      </main>

      <div className="mt-24 flex justify-center pb-16 z-10">
        <a href={START_STORY_LINK} target="_blank" rel="noreferrer" className="group relative">
          <div className="absolute inset-0 bg-amber-200/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <button className="relative bg-[#1a1525] hover:bg-[#201a2e] text-amber-100/90 px-16 py-4 rounded-full font-serif italic text-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all group-hover:tracking-widest border border-amber-200/20 flex items-center">
             <span className="mr-3 text-sm not-italic font-sans tracking-widest uppercase opacity-70">Start Story</span>
             <svg className="w-4 h-4 text-amber-200/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </a>
      </div>

      <footer className="py-12 text-center border-t border-white/5 mt-auto z-10 bg-[#0a0510]/50 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-4">
           <div className="w-px h-8 bg-gradient-to-b from-white/10 to-transparent"></div>
           <div className="flex items-center text-slate-600 text-[10px] tracking-[0.3em] uppercase gap-4 font-light">
             <a href={POSTYPE_LINK} target="_blank" rel="noreferrer" className="hover:text-amber-200/50 transition-colors">
               Postype
             </a>
             <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
             <span>mangae</span>
             <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
             <a href={CRACK_LINK} target="_blank" rel="noreferrer" className="hover:text-amber-200/50 transition-colors">
               Crack
             </a>
           </div>
        </div>
      </footer>

      {/* 모달 렌더링 */}
      {renderModal()}
    </div>
  );
};

export default App;
