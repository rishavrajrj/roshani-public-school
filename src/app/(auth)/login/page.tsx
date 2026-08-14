'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
    } catch (err: any) {
      setError(err?.message || 'An error occurred during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full relative font-sans text-white bg-[#0A192F] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center lg:bg-top bg-no-repeat z-1"
        style={{ backgroundImage: `url('/assets/BuildingViewFront.webp')` }}
      />
      {/* Royal Navy Directional Gradient Overlay */}
      <div
        className="fixed inset-0 z-2"
        style={{
          background:
            "linear-gradient(105deg, rgba(3, 27, 58, 0.85) 0%, rgba(3, 27, 58, 0.60) 45%, rgba(3, 27, 58, 0.25) 100%), linear-gradient(to bottom, rgba(3, 27, 58, 0.4) 0%, rgba(3, 27, 58, 0.7) 100%)",
        }}
      />

      {/* Content Outer Wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* Top Header Branding */}
        <header className="w-full flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/logo.webp"
              alt="Roshani Public School Logo"
              className="w-14 h-14 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
            />
            <div className="flex flex-col justify-center">
              <h1 className="font-serif text-lg sm:text-xl font-extrabold tracking-wider uppercase text-white leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
                ROSHANI<br />PUBLIC SCHOOL
              </h1>
              <span className="text-[11px] font-extrabold tracking-widest text-[#F4C542] uppercase mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                School Management ERP
              </span>
            </div>
          </div>
        </header>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-12 items-center my-auto py-5">
          
          {/* Left Hero & Feature Grid */}
          <section className="max-w-xl order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white mb-2.5 [text-shadow:0_2px_8px_rgba(0,0,0,0.85),0_4px_20px_rgba(0,0,0,0.7)]">
              One School.
              <span className="block text-[#F4C542] [text-shadow:0_2px_8px_rgba(0,0,0,0.85),0_4px_20px_rgba(0,0,0,0.7)]">One Platform.</span>
            </h2>
            <div className="w-11 h-1 bg-[#F4C542] rounded-full mb-3.5" />
            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
              Manage academics, students, attendance, fees, examinations and communication from one secure platform.
            </p>

            {/* 6 Reusable Feature Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Card 1: Students Management */}
              <div className="bg-[#0F2440]/65 backdrop-blur-md border border-white/12 rounded-xl p-3 flex items-start gap-2.5 hover:border-[#F4C542]/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F4C542] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Students Management</span>
                  <span className="text-[11px] text-white/60">Admissions & Records</span>
                </div>
              </div>

              {/* Card 2: Attendance Tracking */}
              <div className="bg-[#0F2440]/65 backdrop-blur-md border border-white/12 rounded-xl p-3 flex items-start gap-2.5 hover:border-[#F4C542]/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F4C542] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Attendance Tracking</span>
                  <span className="text-[11px] text-white/60">Daily Logs & Reports</span>
                </div>
              </div>

              {/* Card 3: Fees Management */}
              <div className="bg-[#0F2440]/65 backdrop-blur-md border border-white/12 rounded-xl p-3 flex items-start gap-2.5 hover:border-[#F4C542]/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F4C542] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Fees Management</span>
                  <span className="text-[11px] text-white/60">Invoicing & Receipts</span>
                </div>
              </div>

              {/* Card 4: Examinations & Reports */}
              <div className="bg-[#0F2440]/65 backdrop-blur-md border border-white/12 rounded-xl p-3 flex items-start gap-2.5 hover:border-[#F4C542]/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F4C542] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Examinations & Reports</span>
                  <span className="text-[11px] text-white/60">Gradebook & Results</span>
                </div>
              </div>

              {/* Card 5: Communication & Notices */}
              <div className="bg-[#0F2440]/65 backdrop-blur-md border border-white/12 rounded-xl p-3 flex items-start gap-2.5 hover:border-[#F4C542]/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F4C542] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Communication & Notices</span>
                  <span className="text-[11px] text-white/60">Circulars & Alerts</span>
                </div>
              </div>

              {/* Card 6: Secure & Reliable */}
              <div className="bg-[#0F2440]/65 backdrop-blur-md border border-white/12 rounded-xl p-3 flex items-start gap-2.5 hover:border-[#F4C542]/40 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F4C542] shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Secure & Reliable</span>
                  <span className="text-[11px] text-white/60">Role-Based Control</span>
                </div>
              </div>

            </div>
          </section>

          {/* Right Login Card Section */}
          <section className="w-full max-w-[360px] bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/60 justify-self-center lg:justify-self-end order-1 lg:order-2">
            
            {/* Header */}
            <div className="bg-[#0F2440] p-5 text-center border-b-4 border-[#B91C5C] flex flex-col items-center justify-center">
              <img
                src="/assets/logo.webp"
                alt="RPS Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30 mx-auto mb-2 shadow-md block"
              />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-0.5">
                Welcome Back
              </h3>
              <p className="text-white/70 text-xs font-normal">
                Sign in to your school account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 text-slate-800">
              {error && (
                <div className="p-2.5 bg-red-50 border-l-4 border-red-600 text-red-800 text-xs rounded font-medium flex items-center gap-2">
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                  Admin Email / Passcode
                </label>
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin2026 or admin@roshanipublicschool.com"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#B91C5C] focus:ring-2 focus:ring-[#B91C5C]/15 transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700">
                  Password (for email sign-in)
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#B91C5C] focus:ring-2 focus:ring-[#B91C5C]/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.96 8.96 0 013.68-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="w-full flex items-center justify-between shrink-0 text-xs pt-0.5">
                <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer select-none font-medium text-[11px] sm:text-xs">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#B91C5C] focus:ring-[#B91C5C]" />
                  <span>Remember Me</span>
                </label>
                <a href="#" className="font-semibold text-[#B91C5C] hover:underline text-[11px] sm:text-xs">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg font-bold text-white text-xs sm:text-sm bg-[#B91C5C] hover:bg-[#9E154B] active:translate-y-0.5 shadow-md shadow-[#B91C5C]/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Authenticating...' : 'Sign In to Portal →'}
              </button>

              {/* Back to Public Website */}
              <div className="text-center pt-0.5">
                <Link href="/" className="text-[11px] sm:text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium">
                  ← Back to Public Website
                </Link>
              </div>
            </form>
          </section>

        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 pt-4 border-t border-white/10 text-[11px] sm:text-xs text-white/70">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#F4C542]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure Access • Trusted Platform • Better Education</span>
          </div>
          <div>© 2026 Roshani Public School</div>
        </footer>

      </div>
    </main>
  );
}
