import React from 'react';

export const Brasao: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brasão de São Miguel do Tocantins"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>

      {/* Mural Crown on Top */}
      <g id="crown">
        <path
          d="M 38 25 L 42 14 L 48 20 L 54 12 L 60 18 L 66 12 L 72 20 L 78 14 L 82 25 Z"
          fill="url(#crownGrad)"
          stroke="#854d0e"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Crown windows/ports */}
        <rect x="46" y="20" width="3" height="4" fill="#854d0e" rx="1" />
        <rect x="58.5" y="19" width="3" height="5" fill="#854d0e" rx="1" />
        <rect x="71" y="20" width="3" height="4" fill="#854d0e" rx="1" />
      </g>

      {/* Main Shield Outline */}
      <path
        d="M 32 26 H 88 V 64 C 88 88 60 98 60 98 C 60 98 32 88 32 64 Z"
        fill="#ffffff"
        stroke="#1e3a8a"
        strokeWidth="3.5"
      />

      {/* Shield Inner Content Clip */}
      <g clipPath="url(#shieldClip)">
        <clipPath id="shieldClip">
          <path d="M 33 27 H 87 V 64 C 87 87 60 96 60 96 C 60 96 33 87 33 64 Z" />
        </clipPath>

        {/* Sky */}
        <rect x="30" y="24" width="60" height="42" fill="url(#skyGrad)" />

        {/* Radiant Sun */}
        <circle cx="60" cy="42" r="14" fill="url(#sunGrad)" stroke="#ca8a04" strokeWidth="1" />
        {/* Sun rays */}
        <path
          d="M 60 22 L 60 26 M 60 58 L 60 62 M 40 42 L 44 42 M 76 42 L 80 42 M 46 28 L 49 31 M 71 53 L 74 56 M 46 56 L 49 53 M 71 31 L 74 28"
          stroke="#eab308"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Green Hills */}
        <path
          d="M 28 62 Q 44 46 60 52 Q 76 46 92 62 L 92 72 L 28 72 Z"
          fill="url(#hillGrad)"
        />

        {/* River (Rio Tocantins) */}
        <path
          d="M 30 68 C 45 66 52 74 62 70 C 72 66 78 72 90 70 L 90 98 C 76 96 60 96 60 96 C 60 96 44 96 30 98 Z"
          fill="url(#waterGrad)"
        />

        {/* Wave highlights */}
        <path
          d="M 38 76 Q 50 72 62 76 Q 74 80 82 75"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M 44 84 Q 56 81 68 84 Q 76 86 80 83"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </g>

      {/* Flanking Branches (Green Foliage / Palm leaves) */}
      <g id="branches" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="#22c55e">
        {/* Left branch */}
        <path d="M 22 75 C 20 54 28 35 34 28" />
        <ellipse cx="23" cy="42" rx="4" ry="2.5" transform="rotate(-30 23 42)" fill="#16a34a" />
        <ellipse cx="20" cy="55" rx="4.5" ry="2.5" transform="rotate(-15 20 55)" fill="#16a34a" />
        <ellipse cx="23" cy="68" rx="4.5" ry="2.5" transform="rotate(10 23 68)" fill="#16a34a" />

        {/* Right branch */}
        <path d="M 98 75 C 100 54 92 35 86 28" />
        <ellipse cx="97" cy="42" rx="4" ry="2.5" transform="rotate(30 97 42)" fill="#16a34a" />
        <ellipse cx="100" cy="55" rx="4.5" ry="2.5" transform="rotate(15 100 55)" fill="#16a34a" />
        <ellipse cx="97" cy="68" rx="4.5" ry="2.5" transform="rotate(-10 97 68)" fill="#16a34a" />
      </g>

      {/* Red Ribbon Banner at bottom */}
      <g id="ribbon">
        <path
          d="M 18 94 L 28 88 L 32 94 L 60 92 L 88 94 L 92 88 L 102 94 L 98 104 L 88 100 L 60 102 L 32 100 L 22 104 Z"
          fill="url(#ribbonGrad)"
          stroke="#7f1d1d"
          strokeWidth="1"
        />
        {/* Ribbon folds */}
        <path d="M 32 94 L 32 100" stroke="#7f1d1d" strokeWidth="1" />
        <path d="M 88 94 L 88 100" stroke="#7f1d1d" strokeWidth="1" />
        {/* Text on banner */}
        <text
          x="60"
          y="98.5"
          textAnchor="middle"
          fill="#fef08a"
          fontSize="4.8"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="0.4"
        >
          SÃO MIGUEL DO TOCANTINS
        </text>
      </g>
    </svg>
  );
};
