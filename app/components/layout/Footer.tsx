'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <a href="#" className="brand-link" aria-label="Kembali ke atas">
          <img 
            src="/assets/images/logo.svg" 
            alt="Love Couple Games Logo" 
            className="brand-logo-img" 
            width={220} 
            height={32} 
          />
        </a>

        <div className="footer-disclaimer">
          Khusus pasangan suami istri dewasa (18+)
        </div>

        <div className="social-links">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn" 
            aria-label="Instagram Love Couple Games"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <a 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-btn" 
            aria-label="TikTok Love Couple Games"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.49 6.27 6.27 0 0 0 1.88-4.48V8.71a8.21 8.21 0 0 0 4.9 1.6V6.86a4.87 4.87 0 0 1-1-.17z"/>
            </svg>
          </a>
        </div>

        <p className="footer-copy">
          &copy; 2026 Love Couple Games. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}
