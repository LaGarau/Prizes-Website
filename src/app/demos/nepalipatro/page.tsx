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
  };
return (
    <div className="max-w-sm mx-auto bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-50 mt-10 p-4 font-sans">
      
      {/* 1. AD DATE MISSION CARD */}
      <div className="bg-[#0f172a] rounded-[2.5rem] p-6 mb-4 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 -mr-8 -mt-8 rotate-45"></div>
        
        <div className="flex justify-between items-center mb-1 px-1">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Today's Date (AD - Anno Domini) 
            </p>
            <div className="flex gap-1.5">
              {[...Array(2)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    status === 'correct' ? 'bg-green-500' :
                    i < guessesLeft ? 'bg-slate-700' : 'bg-red-500'
                  }`}
                />
              ))}
            </div>
        </div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Tuesday, March 10, 2026
        </h2>
      </div>

      {/* 2. BRANDING & SLOGAN AREA */}
      <div className="flex flex-col items-center mb-6 px-2">
        {/* Integrated Logo */}
        <div className="relative w-16 h-16 mb-2">
          <Image 
            src={NPLogo} 
            alt="Nepali Patro Logo" 
            fill
            className="object-contain"
          />
        </div>

        {/* Main Slogan Image */}
        <div className="relative w-full h-24 transition-transform active:scale-95 duration-200">
          <Image 
            src={SloganImage} 
            alt="आज कति गते?" 
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-[#D32F2F] font-black text-[9px] uppercase tracking-[0.15em] mt-3 mb-4 text-center opacity-80">
            {status === 'failed' ? "Attempts Exhausted" : "What is the Nepali Date (BS) Today?"}
        </p>

        <button 
          onClick={() => window.open('https://nepalipatro.com.np', '_blank')}
          className="group flex items-center gap-2 px-6 py-2.5 bg-white border border-[#D32F2F] text-[#D32F2F] rounded-full transition-all active:scale-95 hover:bg-red-50 shadow-sm"
        >
          <span className="font-bold text-[9px] tracking-wider uppercase">
            {status === 'failed' ? "Get Answer from Nepali Patro" : "Use Nepali Patro Shortcut"}
          </span>
        </button>
      </div>

      {/* 3. THE SELECTOR */}
      <div className="px-4 pb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <button 
            onClick={() => adjustDate(-1)}
            disabled={status === 'failed' || status === 'correct'}
            className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400 active:scale-90 transition-all disabled:opacity-20"
          > − </button>

          <div className={`w-32 h-32 flex items-center justify-center rounded-[2.5rem] border-2 transition-all duration-300 ${
            status === 'correct' ? 'border-green-500 bg-green-50 text-green-600' : 
            status === 'failed' ? 'border-slate-200 bg-slate-50 text-slate-300' :
            status === 'wrong' ? 'border-red-500 bg-red-50 text-red-600 animate-shake' : 
            'border-[#1E293B] bg-white text-[#1E293B]'
          }`}>
            <span className="text-6xl font-bold tabular-nums">{guess}</span>
          </div>

          <button 
            onClick={() => adjustDate(1)}
            disabled={status === 'failed' || status === 'correct'}
            className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400 active:scale-90 transition-all disabled:opacity-20"
          > + </button>
        </div>

        {/* 4. ACTION BUTTONS */}
        <div className="space-y-3 px-2">
          {status !== 'failed' ? (
            <button 
              onClick={handleAction}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-[0_4px_0_0_rgba(183,28,28,1)] active:shadow-none active:translate-y-[2px] ${
                status === 'correct' 
                  ? 'bg-green-600 shadow-[0_4px_0_0_rgba(21,128,61,1)] text-white' 
                  : 'bg-[#D32F2F] text-white'
              }`}
            >
              {status === 'correct' ? 'VISIT OFFICIAL SITE' : 'VERIFY DATE'}
            </button>
          ) : (
            <button 
              onClick={() => { setGuessesLeft(2); setStatus('idle'); }}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_4px_0_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[2px]"
            >
              TRY AGAIN
            </button>
          )}
        </div>

        <p className="mt-6 text-[7px] font-bold text-slate-300 uppercase tracking-[0.2em] italic text-center">
          PART OF THE GHUMANTE YUWA EXPERIENCE
        </p>
      </div>
    </div>
  );
}
