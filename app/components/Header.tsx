'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';

export interface HeaderProps {
  onOpenModal: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ onOpenModal, onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="brand-link" aria-label="Love Couple Games Beranda">
          <img 
            src="/assets/images/logo.svg" 
            alt="Love Couple Games Logo" 
            className="brand-logo-img" 
            width={240} 
            height={36} 
          />
        </a>
        <div className="nav-actions">
          <a 
            href="#simulasi-papan" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('simulasi-papan');
            }}
          >
            Coba Dadu
          </a>
          <a 
            href="#bocoran-kartu" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('bocoran-kartu');
            }}
          >
            Contoh Kartu
          </a>
          <a 
            href="#faq" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('faq');
            }}
          >
            Tanya Jawab
          </a>
          <Button 
            className="btn-sm"
            onClick={onOpenModal}
            id="headerCta"
          >
            Buka Akses Game
          </Button>
        </div>
      </div>
    </header>
  );
}
