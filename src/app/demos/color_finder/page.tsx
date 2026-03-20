'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import MascotImage from './mascot.png';
import LogoImage from './logo.png';

// ─── CONFIG ────────────────────────────────────────────────────────────────
const COLORS = [
  { id: 'red', name: 'RED', bg: '#FF2200', hue: [[0, 20], [340, 360]], satMin: 45, lightMin: 15 },
  { id: 'blue', name: 'BLUE', bg: '#0047FF', hue: [[180, 260]], satMin: 35, lightMin: 15 },
  { id: 'green', name: 'GREEN', bg: '#1DB800', hue: [[70, 175]], satMin: 30, lightMin: 10 },
  { id: 'yellow', name: 'YELLOW', bg: '#FFD000', hue: [[35, 70]], satMin: 40, lightMin: 40 },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Space+Mono:wght@400;700&display=swap');
  .ch-body { font-family: 'Space Mono', monospace; background: #111; color: #f0ebe0; min-height: 100dvh; display: flex; flex-direction: column; }
  .ch-container { width: 100%; max-width: 480px; margin: 0 auto; flex: 1; display: flex; flex-direction: column; position: relative; }
  
  .ch-header { padding: 15px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; }
  .ch-back-btn { background: #333; border: none; color: #fff; padding: 6px 12px; font-size: 10px; cursor: pointer; text-transform: uppercase; }

  .ch-task-bar { padding: 20px; text-align: center; background: #1a1a1a; }
  .ch-task-title { font-family: 'Black Han Sans', sans-serif; font-size: 32px; letter-spacing: 1px; }
  
  .ch-vf-container { position: relative; width: 100%; aspect-ratio: 1/1; background: #000; overflow: hidden; border-top: 2px solid #333; border-bottom: 2px solid #333; }
  .ch-video { width: 100%; height: 100%; object-fit: cover; }
  .ch-flash { position: absolute; inset: 0; background: #fff; z-index: 50; pointer-events: none; opacity: 0; }
  .animate-flash { animation: flashAnim 0.4s ease-out; }
  @keyframes flashAnim { 0% { opacity: 1; } 100% { opacity: 0; } }

  .ch-meter-container { position: absolute; bottom: 15px; left: 15px; right: 15px; z-index: 10; }
  .ch-meter-bg { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; border: 1px solid rgba(255,255,255,0.3); }
  .ch-meter-fill { height: 100%; transition: width 0.1s; }

  .ch-controls { padding: 30px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
  .ch-capture-btn { width: 80px; height: 80px; border-radius: 50%; border: 6px solid #fff; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.1s; }
  .ch-capture-btn:active { transform: scale(0.9); }
  .ch-capture-inner { width: 60px; height: 60px; border-radius: 50%; }

  .ch-checklist { display: flex; justify-content: center; gap: 15px; margin-top: 10px; }
  .ch-check-dot { width: 24px; height: 24px; border-radius: 50%; border: 2px solid #333; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
  .ch-check-done { background: #fff !important; color: #000; border-color: #fff; }
`;

export default function ColorScavengerHunt() {
  const [targetIdx, setTargetIdx] = useState(0);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [liveScore, setLiveScore] = useState(0);
  const [flash, setFlash] = useState(false);
  const [mounted, setMounted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scanRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const target = COLORS[targetIdx];

  useEffect(() => {
    setMounted(true);
    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    init();
  }, []);

  // Simplified logic for this demo - your full HSL detection would go here
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveScore(Math.floor(Math.random() * 15)); // Mock score
    }, 500);
    return () => clearInterval(timer);
  }, [targetIdx]);

  const capture = useCallback(() => {
    if (liveScore < 8) return; // Only allow if color is detected

    setFlash(true);
    setTimeout(() => setFlash(false), 400);

    const video = videoRef.current;
    const canvas = scanRef.current;
    const logo = logoRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        if (logo) ctx.drawImage(logo, 30, 30, 150, 75); // Brand it

        const link = document.createElement('a');
        link.download = `HUNT_${target.name}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }

    if (!foundIds.includes(target.id)) {
      const nextFound = [...foundIds, target.id];
      setFoundIds(nextFound);
      if (nextFound.length < COLORS.length) {
        setTargetIdx((prev) => prev + 1);
      }
    }
  }, [liveScore, target, foundIds]);

  if (!mounted) return null;

  return (
    <div className="ch-body">
      <style>{STYLES}</style>
      <img ref={logoRef} src={LogoImage.src} style={{ display: 'none' }} alt="branding" />

      <div className="ch-container">
        {/* TOP BAR */}
        <div className="ch-header">
          <button className="ch-back-btn" onClick={() => window.location.href = '/map'}>← Back to Map</button>
          <Image src={MascotImage} alt="Mascot" width={32} height={32} />
        </div>

        {/* TASK */}
        <div className="ch-task-bar">
          <p style={{ fontSize: '10px', color: '#888', marginBottom: '5px' }}>CURRENT TASK</p>
          <div className="ch-task-title" style={{ color: target.bg }}>FIND {target.name}</div>
          
          <div className="ch-checklist">
            {COLORS.map((c) => (
              <div 
                key={c.id} 
                className={`ch-check-dot ${foundIds.includes(c.id) ? 'ch-check-done' : ''}`}
                style={{ backgroundColor: c.bg + '33' }}
              >
                {foundIds.includes(c.id) ? '✓' : ''}
              </div>
            ))}
          </div>
        </div>

        {/* VIEWFINDER */}
        <div className="ch-vf-container">
          <video ref={videoRef} autoPlay playsInline muted className="ch-video" />
          <div className={`ch-flash ${flash ? 'animate-flash' : ''}`} />
          
          <div className="ch-meter-container">
            <div style={{ fontSize: '9px', marginBottom: '4px', fontWeight: 'bold' }}>COLOR STRENGTH</div>
            <div className="ch-meter-bg">
              <div className="ch-meter-fill" style={{ width: `${Math.min(liveScore * 6, 100)}%`, background: target.bg }} />
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="ch-controls">
          {foundIds.length === COLORS.length ? (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Black Han Sans', fontSize: '24px', color: '#fff' }}>HUNT COMPLETE!</h2>
              <p style={{ fontSize: '12px', marginTop: '10px' }}>Show your downloads at the stall.</p>
            </div>
          ) : (
            <>
              <button 
                className="ch-capture-btn" 
                onClick={capture}
                style={{ borderColor: liveScore >= 8 ? target.bg : '#333' }}
              >
                <div className="ch-capture-inner" style={{ background: liveScore >= 8 ? target.bg : '#333' }} />
              </button>
              <p style={{ fontSize: '11px', color: '#666' }}>{liveScore >= 8 ? 'READY TO CAPTURE!' : 'POINT AT THE COLOR'}</p>
            </>
          )}
        </div>
      </div>

      <canvas ref={scanRef} style={{ display: 'none' }} />
    </div>
  );
}