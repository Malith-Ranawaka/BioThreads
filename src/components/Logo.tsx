import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showTagline = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Stylized Infinity + Sprout Icon */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-emerald-900"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Infinity Loops (Thread/Leaves) - Multiple lines for depth */}
          <path 
            d="M30 55C30 45 40 40 50 55C60 70 70 65 70 55C70 45 60 40 50 55C40 70 30 65 30 55Z" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M25 55C25 40 40 33 50 55C60 77 75 70 75 55C75 40 60 33 50 55C40 77 25 70 25 55Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            opacity="0.4"
          />
          
          {/* Sprout Stem */}
          <path 
            d="M50 55V40" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          
          {/* Leaves */}
          <path 
            d="M50 40C50 40 44 36 44 30C44 24 50 24 50 24C50 24 56 24 56 30C56 36 50 40 50 40Z" 
            fill="currentColor"
          />
          <path 
            d="M50 46C50 46 58 42 62 38C66 34 62 30 62 30C62 30 58 30 54 34C50 38 50 46 50 46Z" 
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tight text-emerald-900 leading-none">
          BIOTHREADS
        </span>
        {showTagline && (
          <span className="text-[9px] font-bold tracking-[0.15em] text-emerald-900/60 uppercase mt-1">
            Biodegradable Everyday Apparel
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
