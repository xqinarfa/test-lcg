'use client';

import React from 'react';
import Button from './Button';

export interface MobileStickyBarProps {
  onOpenModal: () => void;
}

export default function MobileStickyBar({ onOpenModal }: MobileStickyBarProps) {
  return (
    <div className="mobile-sticky-bar">
      <div className="mobile-bar-price">
        <span className="label" style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.72rem' }}>Rp 250.000</span>
        <span className="val" style={{ color: '#ff4d6d', fontWeight: 800 }}>Rp 88.000 AJA!</span>
      </div>
      <Button
        className="btn-sm"
        onClick={onOpenModal}
        id="btnStickyMainSekarang"
      >
        MAIN SEKARANG
      </Button>
    </div>
  );
}
