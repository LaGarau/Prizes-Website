"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FolderAccessPage() {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("idle");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const folderName = e.target.value.toLowerCase().trim();
    setInputValue(folderName);

    // We trigger the check only after a certain length or on "Enter" 
    // to avoid trying to navigate to "/demos/n", "/demos/ne", etc.
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.length > 0) {
      setStatus("success");
      // This sends them directly to the folder with the same name
      router.push(`/demos/${inputValue}`);
    }
  };

  if (!mounted) return null;

  return (
    <div className="access-wrapper">
      <style>{`
        .access-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
        }
        .content-box {
          text-align: center;
          width: 100%;
          max-width: 500px;
          padding: 20px;
        }
        .label {
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 800;
          font-size: 0.7rem;
          color: #888;
          margin-bottom: 20px;
        }
        .input-container {
          border-bottom: 3px solid #000;
          padding: 10px 0;
          transition: all 0.3s ease;
        }
        .secret-input {
          width: 100%;
          border: none;
          outline: none;
          text-align: center;
          font-size: 2rem;
          font-weight: 900;
          text-transform: uppercase;
          background: transparent;
        }
        .instruction {
          margin-top: 15px;
          font-size: 0.7rem;
          color: #bbb;
          font-weight: 600;
        }
      `}</style>

      <div className="content-box">
        <div className="label">Partner Portal</div>
        
        <div className="input-container">
          <input
            type="text"
            className="secret-input"
            placeholder="ENTER KEY"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div className="instruction">
          {status === "success" ? "VERIFYING..." : "TYPE YOUR ASSIGNED KEY & PRESS ENTER"}
        </div>
      </div>
    </div>
  );
}