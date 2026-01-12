
import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center p-3 rounded-2xl transition-all duration-500 w-full text-left group border backdrop-blur-sm overflow-hidden ${
        isSelected 
          ? 'bg-indigo-900/30 border-indigo-300/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
      }`}
    >
      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-700 relative ${
        isSelected ? 'opacity-100 ring-1 ring-indigo-200/50' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80'
      }`}>
        <img
          src={character.imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-5 flex-1 relative z-10">
        <p className={`text-[9px] tracking-[0.2em] uppercase mb-1 font-light ${isSelected ? 'text-indigo-200' : 'text-slate-600 group-hover:text-slate-500'}`}>
          {character.japaneseName}
        </p>
        <p className={`text-lg font-serif transition-colors ${isSelected ? 'text-amber-100' : 'text-slate-400 group-hover:text-slate-300'}`}>
          {character.name.split(' (')[0]}
        </p>
        <div className={`h-px w-4 mt-2 transition-all duration-500 ${isSelected ? 'bg-amber-200/50 w-8' : 'bg-slate-700'}`}></div>
      </div>
      
      {isSelected && (
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-400/50 to-transparent"></div>
      )}
    </button>
  );
};

export default CharacterCard;
