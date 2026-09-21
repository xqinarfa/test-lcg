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
        <span className="label">Akses Pasutri</span>
        <span className="val">Rp 88.000</span>
      </div>
      <Button
        className="btn-sm"
        onClick={onOpenModal}
      >
        Beli Akses Game
      </Button>
    </div>
  );
}
