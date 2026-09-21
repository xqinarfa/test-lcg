'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { testimonials } from '../data/gameData';

export interface TestimonialSectionProps {
  onOpenModal?: () => void;
}

// SVG Star Icon for razor-sharp rendering on Retina/mobile
function StarIcon() {
  return (
    <svg 
      className="star-svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="#ffb703" 
      xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// SVG Checkmark Icon
function CheckIcon() {
  return (
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Interlocking Wedding Rings SVG Icon (Authored Vector, replacing emoji)
function InterlockingRingsIcon() {
  return (
    <svg 
      width="13" 
      height="13" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      aria-hidden="true" 
      className="ring-svg"
    >
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </svg>
  );
}
// Framer Motion Animation Variants
const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
};

export default function TestimonialSection({ onOpenModal: _onOpenModal }: TestimonialSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Quadruple items to guarantee seamless 100% infinite loop even on ultra-wide screens
  const marqueeCards = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section 
      className="testimonial-section" 
      id="testimoni" 
      aria-labelledby="testimonial-heading"
    >
      {/* Subtle Ambient Glow Background Orbs */}
      <div className="testimonial-ambient-glow" aria-hidden="true">
        <div className="glow-orb glow-orb-gold" />
        <div className="glow-orb glow-orb-rose" />
      </div>

      <div className="container">
        {/* Clean, authoritative header with Framer Motion orchestration */}
        <motion.div 
          className="section-header text-center"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            id="testimonial-heading" 
            className="section-title"
            variants={headerItemVariants}
          >
            Apa Kata Pasutri yang <span className="title-accent-gold">Sudah Mencoba?</span>
          </motion.h2>

          <motion.p 
            className="section-subtitle mx-auto"
            variants={headerItemVariants}
          >
            Cerita jujur dari pasangan suami istri yang hubungannya kembali mesra, hangat, dan bergairah berkat Love Couple Games.
          </motion.p>

          {/* Minimalist Trust Indicator with Framer Motion Spring */}
          <motion.div 
            className="testimonial-simple-trust"
            variants={headerItemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="trust-stars-group" aria-label="Rating 5 dari 5 bintang">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <span className="trust-rating">4.9 / 5.0 Rating</span>
            <span className="trust-sep" aria-hidden="true">•</span>
            <span className="trust-stat">1.200+ Pasutri Puas</span>
            <span className="trust-sep" aria-hidden="true">•</span>
            <span className="trust-privacy">100% Privat Kamar Tidur</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Loop Marquee Showcase */}
      <div 
        className={`testimonial-marquee-wrapper ${shouldReduceMotion ? 'reduced-motion' : ''}`}
        aria-label="Ulasan Pasutri Berputar Otomatis"
        role="region"
      >
        <div className="testimonial-marquee-track">
          {marqueeCards.map((item, idx) => (
            <motion.article 
              className="testimonial-card-simple" 
              key={`${item.id}-${idx}`}
              whileHover={{ 
                y: -6, 
                transition: { type: 'spring', stiffness: 350, damping: 24 } 
              }}
              whileTap={{ scale: 0.985 }}
            >
              {/* Decorative Watermark Quotation Icon */}
              <svg 
                className="card-quote-watermark" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Card Top: Stars & Verified status */}
              <div className="card-simple-header">
                <div className="card-simple-stars" aria-label={`Rating ${item.rating || 5} bintang`}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <div className="card-simple-verified">
                  <CheckIcon />
                  <span>Verified Couple</span>
                </div>
              </div>

              {/* Bold Highlight Pull-Quote */}
              <h3 className="card-simple-highlight">
                &ldquo;{item.highlight}&rdquo;
              </h3>

              {/* Honest Story Quote */}
              <blockquote className="card-simple-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author Footer */}
              <div className="card-simple-author">
                <div className="card-simple-avatar" aria-hidden="true">
                  {item.avatarText}
                </div>
                <div className="card-simple-author-info">
                  <span className="author-name">{item.couple}</span>
                  <span className="author-context">
                    <InterlockingRingsIcon />
                    <span>{item.duration} • {item.city}</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
