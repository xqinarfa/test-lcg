'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface FigmaWaveDividerProps {
  position?: 'top' | 'bottom';
  fillColor?: string;
  secondaryFillColor?: string;
  strokeColor?: string;
  height?: number | string;
  className?: string;
}

// Seamless mathematically continuous double-cycle wave paths (0 to 2880)
// Cycle 1: 0 to 1440 | Cycle 2: 1440 to 2880 (100% identical clone for seamless infinite looping)
const MAIN_CREST =
  'M 0 70 C 60.0 61.3, 116.7 34.3, 180 38 C 243.3 41.7, 310.0 93.7, 380 92 C 450.0 90.3, 526.7 29.7, 600 28 C 673.3 26.3, 743.3 81.0, 820 82 C 896.7 83.0, 986.7 32.7, 1060 34 C 1133.3 35.3, 1196.7 84.0, 1260 90 C 1323.3 96.0, 1380.0 78.7, 1440 70 C 1500.0 61.3, 1556.7 34.3, 1620 38 C 1683.3 41.7, 1750.0 93.7, 1820 92 C 1890.0 90.3, 1966.7 29.7, 2040 28 C 2113.3 26.3, 2183.3 81.0, 2260 82 C 2336.7 83.0, 2426.7 32.7, 2500 34 C 2573.3 35.3, 2636.7 84.0, 2700 90 C 2763.3 96.0, 2820.0 78.7, 2880 70';

// Fill extends deeply below viewBox (V 350) with no stroke to ensure zero bottom border
const MAIN_FILL = `${MAIN_CREST} V 350 H 0 Z`;

const SECONDARY_CREST =
  'M 0 80 C 76.7 81.0, 140.0 106.0, 220 98 C 300.0 90.0, 396.7 33.7, 480 32 C 563.3 30.3, 640.0 88.7, 720 88 C 800.0 87.3, 880.0 27.3, 960 28 C 1040.0 28.7, 1120.0 83.3, 1200 92 C 1280.0 100.7, 1363.3 79.0, 1440 80 C 1516.7 81.0, 1580.0 106.0, 1660 98 C 1740.0 90.0, 1836.7 33.7, 1920 32 C 2003.3 30.3, 2080.0 88.7, 2160 88 C 2240.0 87.3, 2320.0 27.3, 2400 28 C 2480.0 28.7, 2560.0 83.3, 2640 92 C 2720.0 100.7, 2803.3 79.0, 2880 80';

const SECONDARY_FILL = `${SECONDARY_CREST} V 350 H 0 Z`;

export default function FigmaWaveDivider({
  position = 'bottom',
  fillColor = '#0c080b',
  secondaryFillColor = 'rgba(195, 60, 115, 0.38)',
  strokeColor = '#e6b980',
  height = 95,
  className = '',
}: FigmaWaveDividerProps) {
  const isTop = position === 'top';
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`figma-wave-divider ${isTop ? 'position-top' : 'position-bottom'} ${className}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        [isTop ? 'top' : 'bottom']: 0,
        width: '100%',
        lineHeight: 0,
        pointerEvents: 'none',
        border: 'none',
        outline: 'none',
        ...(isTop ? { transform: 'rotate(180deg)' } : {}),
      }}
      aria-hidden="true"
    >
      {/* Layer 1: Animated Secondary Accent Wave (Rose Ribbon - Flows to Right) */}
      {secondaryFillColor && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: '100%',
            willChange: 'transform',
          }}
          animate={shouldReduceMotion ? undefined : { x: ['-50%', '0%'] }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            viewBox="0 0 2880 140"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path d={SECONDARY_FILL} fill={secondaryFillColor} />
            <path
              d={SECONDARY_CREST}
              fill="none"
              stroke="rgba(214, 122, 146, 0.45)"
              strokeWidth="1.6"
            />
          </svg>
        </motion.div>
      )}

      {/* Layer 2: Animated Solid Main Wave & Gold Crest Contour (Flows to Left) */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          willChange: 'transform',
        }}
        animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg
          viewBox="0 0 2880 140"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="waveGoldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e6b980" stopOpacity="0.5" />
              <stop offset="25%" stopColor="#f7deb9" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#e6b980" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#f7deb9" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e6b980" stopOpacity="0.5" />
            </linearGradient>
            <filter id="waveShimmerFilter" x="-5%" y="-40%" width="110%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#e6b980" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* Solid fill extending deeply downwards with NO stroke to guarantee zero bottom border */}
          <path d={MAIN_FILL} fill={fillColor} />

          {/* Prominent Gold Crest Line - ONLY traces the upper wave contour; NO bottom or side strokes */}
          {strokeColor && (
            <path
              d={MAIN_CREST}
              fill="none"
              stroke="url(#waveGoldGlow)"
              strokeWidth="2.2"
              filter="url(#waveShimmerFilter)"
            />
          )}
        </svg>
      </motion.div>
    </div>
  );
}
