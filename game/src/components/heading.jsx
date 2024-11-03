import React from 'react'

function HeaderGameName() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-radial from-purple-900 via-gray-900 to-black">
            <div className="relative w-[600px] h-[300px]">
                <svg width="600" height="300" viewBox="0 0 600 300">
                    <defs>
                        <linearGradient id="metallic" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D4AF37" />
                            <stop offset="50%" stopColor="#FFF700" />
                            <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                        <filter id="wavy" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
                            <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="turbulence" />
                            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <circle cx="300" cy="150" r="145" fill="none" stroke="url(#metallic)" strokeWidth="2" filter="url(#wavy)" opacity="0.5" />

                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                        fill="url(#metallic)" stroke="#4A4A4A" strokeWidth="2"
                        fontSize="80" fontFamily="Luminari, Fantasy" fontWeight="bold" letterSpacing="-2"
                        filter="url(#glow)">
                        <tspan x="50%" dy="-20" fontSize="60">MID</tspan>
                        <tspan x="50%" dy="80" fontSize="100">BLADE</tspan>
                    </text>

                    <polygon points="300,130 310,150 290,150" fill="#00FFFF" filter="url(#glow)">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </polygon>
                </svg>
            </div>
        </div>
    )
}

export {HeaderGameName}