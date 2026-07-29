import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMailLine, RiLockPasswordLine, RiKey2Line, RiArrowRightLine, RiLoginCircleLine, RiRestaurantLine } from 'react-icons/ri';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const SAFE_API_URL = API_URL.replace(/\/+$/, '');

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${SAFE_API_URL}/api/admin/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setStep(2);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${SAFE_API_URL}/api/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background pattern similar to website */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-red border border-brand-accent/40 flex items-center justify-center shadow-[0_0_30px_rgba(229,205,172,0.2)] mb-5">
            <RiRestaurantLine className="text-brand-accent text-3xl" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-accent tracking-wide">Alvigha</h1>
          <p className="text-white/60 text-xs mt-2 uppercase tracking-widest font-bold">Admin Portal</p>
        </div>

        <div className="bg-brand-red/40 border border-brand-accent/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl mb-6 text-xs text-center font-bold">
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleCredentialsSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-brand-accent uppercase tracking-widest ml-1 font-bold">Email Address</label>
                  <div className="relative">
                    <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                      type="email" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="admin@alvigha.com"
                      className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-brand-accent uppercase tracking-widest ml-1 font-bold">Password</label>
                  <div className="relative">
                    <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                    <input
                      type="password" required
                      value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full mt-6 flex justify-center items-center gap-2 py-3 bg-brand-accent text-brand-dark rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(229,205,172,0.3)] disabled:opacity-70 cursor-pointer">
                  {loading ? 'Authenticating...' : <>Continue <RiArrowRightLine /></>}
                </button>
              </motion.form>
            ) : (
              <motion.form key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="text-center text-xs text-white/70 mb-2 leading-relaxed">
                  We sent a 6-digit verification code to<br/>
                  <span className="text-brand-accent font-bold mt-1 inline-block">{email}</span>
                </div>

                <div className="relative max-w-[220px] mx-auto">
                  <RiKey2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text" required maxLength={6}
                    value={otp} onChange={e => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-center tracking-[0.5em] font-mono font-bold text-white focus:outline-none focus:border-brand-accent/50 transition-colors"
                  />
                </div>

                <button type="submit" disabled={loading || otp.length < 6} className="w-full flex justify-center items-center gap-2 py-3 bg-brand-accent text-brand-dark rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(229,205,172,0.3)] disabled:opacity-50 cursor-pointer">
                  {loading ? 'Verifying...' : <>Verify & Access <RiLoginCircleLine className="text-lg" /></>}
                </button>

                <button type="button" onClick={() => setStep(1)} className="w-full text-center text-[11px] text-white/50 hover:text-brand-accent transition-colors pt-2 uppercase tracking-widest font-bold cursor-pointer">
                  Use a different account
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
