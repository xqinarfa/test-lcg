'use client';

import React from 'react';
import Button from './Button';
import { ModalStep, PaymentMethod } from '../../types';

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

        {step === 'selection' && (
          <div>
            <div className="modal-header">
              <span className="faq-kicker" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#ff4d6d' }}>
                PROSES CEPAT & PRIVAT 100%
              </span>
              <h2 id="modalTitle">DOWNLOAD LOVE COUPLE GAMES</h2>
              <p>MURAH BANGET, BAYAR SEKALI AJA Rp 88.000!</p>
            </div>

            <div className="modal-flow-steps">
              <span className="step-badge active">1. Xendit</span>
              <span className="step-arrow">›</span>
              <span className="step-badge">2. Bayar</span>
              <span className="step-arrow">›</span>
              <span className="step-badge">3. Bikin Akun</span>
              <span className="step-arrow">›</span>
              <span className="step-badge">4. Akses Game</span>
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
                <span className="step-badge">4. Akses Game</span>
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
              Saya Sudah Bayar → Bikin Akun & Akses Game
            </Button>
          </div>
        )}

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
                <span className="step-badge active">4. Akses Game</span>
              </div>
              <h2 style={{ color: 'var(--status-success)', marginTop: '8px' }}>Pembayaran Berhasil!</h2>
              <p>Akun pasutri Anda telah dibuat otomatis. Simpan Lisensi & Unduh / Akses Game sekarang.</p>
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

            <div className="modal-platform-box">
              <div className="modal-platform-item modal-platform-ios">
                <div className="modal-platform-head">
                  <div className="modal-platform-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.17.65-2.84 1.43-.58.67-1.1 1.74-.96 2.78 1.07.08 2.18-.59 2.79-1.34z"/>
                    </svg>
                    <span>Apple iOS (iPhone / iPad)</span>
                  </div>
                  <span className="modal-platform-badge-store">✓ Tersedia di App Store</span>
                </div>
                <p className="modal-platform-desc">
                  Game ini resmi tersedia di App Store &amp; Web App privat.
                </p>
                <button
                  type="button"
                  onClick={onDownloadApk}
                  className="modal-platform-btn-ios"
                >
                  Buka di App Store (iOS)
                </button>
              </div>

              <div className="modal-platform-item modal-platform-android">
                <div className="modal-platform-head">
                  <div className="modal-platform-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003s.4482-1.0003.9993-1.0003c.5516 0 .9993.4486.9993 1.0003 0 .5517-.4477 1.0003-.9993 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003s.4482-1.0003.9993-1.0003c.5516 0 .9993.4486.9993 1.0003 0 .5517-.4477 1.0003-.9993 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5898 8.411 13.8504 8.125 12 8.125c-1.8504 0-3.5898.286-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                    </svg>
                    <span>Android (Semua Tipe HP)</span>
                  </div>
                  <span className="modal-platform-badge-store">
                    ✓ APK Resmi Android
                  </span>
                </div>
                <p className="modal-platform-desc">
                  Paket installer APK resmi langsung untuk semua HP Android. 100% aman, privat, dan siap dipasang:
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0 10px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold-light)', background: 'rgba(230, 185, 128, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(230, 185, 128, 0.25)' }}>
                    v1.4.2 Resmi
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    • 14.8 MB Siap Pasang
                  </span>
                </div>
                <Button 
                  onClick={onDownloadApk}
                  id="btnModalDownloadApk"
                  style={{ width: '100%', fontSize: '0.98rem' }}
                >
                  DOWNLOAD APK ANDROID
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
