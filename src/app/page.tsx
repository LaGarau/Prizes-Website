"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [buffer, setBuffer] = useState("");
  const [mounted, setMounted] = useState(false);

  const KEYWORD = "demo";
  const REDIRECT_URL = "/demos"; 

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      const char = e.key.toLowerCase();
      const newBuffer = (buffer + char).slice(-KEYWORD.length);
      setBuffer(newBuffer);
      if (newBuffer === KEYWORD) {
        router.push(REDIRECT_URL);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => setBuffer(""), 2000);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [buffer, router, mounted]);

  if (!mounted) return <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }} />;

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background-color: #ffffff;
          color: #000000;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          align-items: center; /* Vertical Center */
          justify-content: center; /* Horizontal Center */
          width: 100%;
        }
        .container {
          text-align: center;
          padding: 40px 20px;
          max-width: 800px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .logo {
          width: 180px;
          height: auto;
          margin-bottom: 20px;
        }
        h1 {
          font-size: clamp(2.5rem, 10vw, 5rem);
          font-weight: 900;
          margin: 0;
          letter-spacing: -2px;
          line-height: 0.9;
          text-transform: uppercase;
        }
        .sub-header {
          color: #ff0000; 
          font-size: clamp(1rem, 4vw, 2rem);
          font-weight: 800;
          margin: 10px 0 30px 0;
          text-transform: uppercase;
        }
        .stats-box {
          background-color: #000;
          color: #fff;
          padding: 10px 25px;
          margin-bottom: 30px;
          transform: rotate(-1deg);
        }
        .stats-box p {
          margin: 0;
          font-weight: 900;
          font-size: 1.2rem;
          text-transform: uppercase;
        }
        .cta-section {
          font-weight: 700;
          text-transform: uppercase;
        }
        .instagram-link {
          display: inline-block;
          margin-top: 15px;
          font-size: 1.8rem;
          font-weight: 900;
          color: #000;
          text-decoration: none;
          border-bottom: 6px solid #ff0000;
        }
        .footer {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.8;
        }
        .la-logo {
          width: 70px;
          margin-top: 8px;
        }
        .la-text {
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="container">
        <img src="/logo.png" alt="Ghumante Yuwa" className="logo" />

        <h1>THANK YOU<br />FOR PLAYING!</h1>
        <div className="sub-header">BASANTAPUR WAS EPIC.</div>

        <div className="stats-box">
          <p>100+ PRIZES EARNED</p>
        </div>

        <div className="cta-section">
          <p style={{ margin: 0 }}>WE’LL BE BACK SOON.</p>
          <a href="https://instagram.com/ghumanteyuwa" target="_blank" className="instagram-link">
            @GHUMANTEYUWA
          </a>
        </div>

        <div className="footer">
          <span className="la-text">MADE BY</span>
          <a href="https://lagarau.com" target="_blank">
            <img src="/lagaraulogoblack.png" alt="La Garau" className="la-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}