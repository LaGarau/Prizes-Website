'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SloganImage from './slogan.png'; 
import NPLogo from './nplogo.png'; // 1. Import the logo

export default function DateGuesser() {
  const [guess, setGuess] = useState(15);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'failed'>('idle');
  const [guessesLeft, setGuessesLeft] = useState(2);
  const correctGatey = 26; 

  const adjustDate = (amount: number) => {
    if (status === 'correct' || status === 'failed') return;
    setStatus('idle');
    setGuess(prev => {
      const next = prev + amount;
      if (next > 32) return 1;
      if (next < 1) return 32;
      return next;
    });
  };

  const handleAction = () => {
    if (status === 'correct') {
      window.open('https://nepalipatro.com.np', '_blank');
      return;
    }

    if (guess === correctGatey) {
      setStatus('correct');
    } else {
      const remaining = guessesLeft - 1;
      setGuessesLeft(remaining);
      
      if (remaining <= 0) {
        setStatus('failed');
      } else {
        setStatus('wrong');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }
  }
  // ... imports stay the same

  return (
    <div className="max-w-sm mx-auto bg-[#FBFBFF] rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden border border-white mt-10 p-5 font-sans relative">
      
      {/* Texture Layer */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* 1. COMPACT HEADER */}
      <div className="bg-[#0f172a] rounded-[2.5rem] p-4 mb-8 flex items-center justify-between shadow-xl relative z-10 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-1" />
          <div className="text-left">
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">Today (AD)</p>
            <h2 className="text-white text-xs font-bold tracking-tight">March 10, 2026</h2>
          </div>
        </div>

        {/* Dynamic Attempt Status */}
        <div className="flex flex-col items-end gap-1 px-2">
          <p className="text-[6px] font-bold text-slate-500 uppercase tracking-widest">
            {guessesLeft} {guessesLeft === 1 ? 'Attempt' : 'Attempts'} Left
          </p>
          <div className="flex gap-1.5">
            {[...Array(2)].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                status === 'correct' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 
                i < guessesLeft ? 'bg-slate-700' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'
              }`} />
            ))}
          </div>
        </div>
      </div>

      {/* 2. GAME TITLE & INSTRUCTIONS */}
      <div className="flex flex-col items-center mb-6 relative z-10 text-center">
        <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
          A Mini-Game Experience
        </span>
        
        <div className="relative w-44 h-16 mb-2">
          <Image 
            src={SloganImage} 
            alt="आज कति गते?" 
            fill 
            className="object-contain"
            priority 
          />
        </div>

        {/* Clear Mission Statement */}
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] max-w-[200px] leading-relaxed">
          Guess the Nepali date in <span className="text-[#D32F2F]">2 attempts</span> to win
        </p>
      </div>

      {/* 3. HERO SELECTOR */}
      <div className="px-2 pb-2 text-center relative z-10">
        <div className="flex items-center justify-center gap-5 mb-8">
          <button 
            onClick={() => adjustDate(-1)}
            disabled={status === 'failed' || status === 'correct'}
            className="w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center text-2xl font-light text-slate-300 active:scale-90 hover:text-[#D32F2F] transition-all border border-slate-50"
          > − </button>

          <div className={`w-44 h-44 flex flex-col items-center justify-center rounded-[3.5rem] border-[1px] transition-all duration-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] bg-white ${
            status === 'correct' ? 'border-green-500 text-green-600' : 
            status === 'wrong' ? 'border-red-500 text-red-600 animate-shake' : 
            'border-slate-100 text-slate-900'
          }`}>
            <span className="text-8xl font-black tabular-nums tracking-tighter">{guess}</span>
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest mt-1">Gatey/गते</span>
          </div>

          <button 
            onClick={() => adjustDate(1)}
            disabled={status === 'failed' || status === 'correct'}
            className="w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center text-2xl font-light text-slate-300 active:scale-90 hover:text-[#D32F2F] transition-all border border-slate-50"
          > + </button>
        </div>

        {/* 4. HINT & BRANDING REDIRECT */}
        <div className="flex flex-col items-center mb-6">
          <button 
            onClick={() => window.open('https://nepalipatro.com.np', '_blank')}
            className="group flex flex-col items-center gap-2.5 transition-all hover:opacity-90"
          >
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              <span className="text-[#D32F2F]">Hint:</span> Check the date on Nepali Patro
            </p>
            <div className="relative w-11 h-11 bg-white rounded-xl p-2 shadow-md border border-slate-50 group-active:scale-95 transition-transform">
              <Image src={NPLogo} alt="Nepali Patro" fill className="object-contain p-1.5" />
            </div>
          </button>
        </div>

        {/* 5. FINAL ACTION */}
        <div className="px-3">
          <button 
            onClick={handleAction}
            className={`w-full py-5 rounded-[2.2rem] font-black text-xs uppercase tracking-[0.25em] transition-all shadow-2xl active:scale-95 ${
              status === 'correct' 
                ? 'bg-green-600 text-white' 
                : status === 'failed' 
                ? 'bg-slate-900 text-white' 
                : 'bg-[#D32F2F] text-white shadow-[#D32F2F]/20'
            }`}
          >
            {status === 'correct' ? 'Open Full Calendar' : status === 'failed' ? 'Restart Challenge' : 'Confirm Selection'}
          </button>
        </div>

        <p className="mt-10 text-[7px] font-bold text-slate-300 uppercase tracking-[0.5em]">
          Ghumante Yuwa × Nepali Patro
        </p>
      </div>
    </div>
  );
}
