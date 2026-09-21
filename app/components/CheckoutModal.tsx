'use client';

import React from 'react';
import Button from './Button';
import { ModalStep, PaymentMethod } from '../types';

export interface CheckoutModalProps {
  isOpen: boolean;
  step: ModalStep;
  paymentMethod: PaymentMethod;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  copiedLicense: boolean;
  downloadStarted: boolean;
  onClose: () => void;
  onContinue: () => void;
  onSimulateSuccess: () => void;
  onCopyLicense: () => void;
  onDownloadApk: () => void;
}

export default function CheckoutModal({
  isOpen,
  step,
  paymentMethod,
  onSelectPaymentMethod,
  timeLeft,
  formatTime,
  copiedLicense,
  downloadStarted,
  onClose,
  onContinue,
  onSimulateSuccess,
  onCopyLicense,
  onDownloadApk,
}: CheckoutModalProps) {
  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        <button 
          type="button" 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Tutup jendela pembayaran"
        >
          &times;
        </button>

        {/* Step 1: Selection */}
        {step === 'selection' && (
          <div>
            <div className="modal-header">
              <span className="faq-kicker" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#ff4d6d' }}>
                PROSES CEPAT & PRIVAT 100%
              </span>
              <h2 id="modalTitle">DOWNLOAD LOVE COUPLE GAMES</h2>
              <p>MURAH BANGET, BAYAR SEKALI AJA Rp 88.000!</p>
            </div>

            {/* Step progress pills */}
            <div className="modal-flow-steps">
              <span className="step-badge active">1. Xendit</span>
              <span className="step-arrow">›</span>
              <span className="step-badge">2. Bayar</span>
              <span className="step-arrow">›</span>
              <span className="step-badge">3. Bikin Akun</span>
              <span className="step-arrow">›</span>
              <span className="step-badge">4. Download APK</span>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Harga Normal</span>
                <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)' }}>Rp 250.000</span>
              </div>
              <div className="summary-row discount">
                <span>Diskon Khusus Pasutri</span>
                <span>- Rp 162.000</span>
              </div>
              <div className="summary-row total">
                <span>Total Bayar Sekali Aja</span>
                <span style={{ color: '#ff4d6d', fontSize: '1.25rem', fontWeight: 800 }}>Rp 88.000 AJA!</span>
              </div>
            </div>

            <p className="payment-label">
              Metode Pembayaran (Diproses Aman via Xendit):
            </p>

            <div className="payment-methods">
              <label 
                className={`payment-method-card ${paymentMethod === 'qris' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('qris')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="qris" 
                  checked={paymentMethod === 'qris'} 
                  onChange={() => onSelectPaymentMethod('qris')} 
                />
                <span>QRIS Instant (BCA, GoPay, OVO, ShopeePay, DANA)</span>
              </label>

              <label 
                className={`payment-method-card ${paymentMethod === 'gopay' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('gopay')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="gopay" 
                  checked={paymentMethod === 'gopay'} 
                  onChange={() => onSelectPaymentMethod('gopay')} 
                />
                <span>GoPay / E-Wallet Xendit</span>
              </label>

              <label 
                className={`payment-method-card ${paymentMethod === 'bca' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('bca')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bca" 
                  checked={paymentMethod === 'bca'} 
                  onChange={() => onSelectPaymentMethod('bca')} 
                />
                <span>BCA Virtual Account (Xendit)</span>
              </label>

              <label 
                className={`payment-method-card ${paymentMethod === 'mandiri' ? 'selected' : ''}`}
                onClick={() => onSelectPaymentMethod('mandiri')}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="mandiri" 
                  checked={paymentMethod === 'mandiri'} 
                  onChange={() => onSelectPaymentMethod('mandiri')} 
                />
                <span>Mandiri / BRI Virtual Account</span>
              </label>
            </div>

            <Button 
              onClick={onContinue}
              id="btnModalProceedPayment"
              style={{ width: '100%', fontSize: '1.02rem', padding: '14px' }}
            >
              LANJUT KE PEMBAYARAN (XENDIT)
            </Button>
          </div>
        )}

        {/* Step 2: QRIS Simulation */}
        {step === 'qris' && (
          <div className="qris-view">
            <div className="modal-header">
              <div className="modal-flow-steps">
                <span className="step-badge">1. Xendit</span>
                <span className="step-arrow">›</span>
                <span className="step-badge active">2. Bayar QRIS</span>
                <span className="step-arrow">›</span>
                <span className="step-badge">3. Bikin Akun</span>
                <span className="step-arrow">›</span>
                <span className="step-badge">4. Download APK</span>
              </div>
              <h2>Pindai QRIS Xendit</h2>
              <p>Buka aplikasi BCA Mobile, GoPay, OVO, ShopeePay, atau DANA untuk membayar Rp 88.000</p>
            </div>

            <div className="qris-frame">
              <div className="qris-laser-scanner" aria-hidden="true" />
              <svg width="170" height="170" viewBox="0 0 24 24" fill="#130c10" aria-label="QR Code Pembayaran Xendit">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2v-2zm-4-2h4v2h-4v-2zm-2-2h2v2h-2v-2zm6 0h2v2h-2v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z"/>
              </svg>
            </div>

            <div className="countdown-timer">
              Sisa waktu pembayaran: <span>{formatTime(timeLeft)}</span>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '12px 0 20px' }}>
              Xendit akan memverifikasi pembayaran secara instan & otomatis.
            </p>

            <Button 
              onClick={onSimulateSuccess}
              id="btnModalSimulateSuccess"
              style={{ width: '100%' }}
            >
              Saya Sudah Bayar → Bikin Akun & Unduh APK
            </Button>
          </div>
        )}

        {/* Step 3: Success & Download Access */}
        {step === 'success' && (
          <div className="success-view">
            <div className="modal-header">
              <div className="modal-flow-steps">
                <span className="step-badge">1. Xendit ✓</span>
                <span className="step-arrow">›</span>
                <span className="step-badge">2. Bayar ✓</span>
                <span className="step-arrow">›</span>
                <span className="step-badge active">3. Akun Aktif ✓</span>
                <span className="step-arrow">›</span>
                <span className="step-badge active">4. Download APK</span>
              </div>
              <h2 style={{ color: 'var(--status-success)', marginTop: '8px' }}>Pembayaran Berhasil!</h2>
              <p>Akun pasutri Anda telah dibuat otomatis. Simpan Lisensi & Unduh APK sekarang.</p>
            </div>

            {copiedLicense && (
              <div className="toast-feedback">
                Kode lisensi berhasil disalin ke clipboard!
              </div>
            )}

            <div className="license-box">
              <span>LCG-PASUTRI-88K-VIP</span>
              <button
                type="button"
                onClick={onCopyLicense}
                aria-label="Salin kode lisensi"
                style={{ 
                  color: copiedLicense ? 'var(--status-success)' : 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  transform: copiedLicense ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                {copiedLicense ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>

            {downloadStarted ? (
              <div className="toast-feedback" style={{ marginBottom: '20px' }}>
                Paket APK instalasi berhasil diunduh ke HP Anda!
              </div>
            ) : null}

            <Button 
              onClick={onDownloadApk}
              id="btnModalDownloadApk"
              style={{ width: '100%', marginBottom: '14px', fontSize: '1.05rem' }}
            >
              DOWNLOAD APK SEKARANG (Android & iOS)
            </Button>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Untuk iPhone / iPad, gunakan tautan akses instan web app yang tersinkron otomatis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
