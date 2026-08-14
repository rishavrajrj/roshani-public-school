/**
 * ROSHANI PUBLIC SCHOOL — VERCEL ANALYTICS & SPEED INSIGHTS SAFE LOADER
 * Provides telemetry on Vercel deployments and degrades safely without errors
 * on GitHub Pages, local static testing, or offline development.
 */
(function () {
  'use strict';

  // Safe global telemetry queue initializers
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

  // Detect hosting environment
  const host = window.location.hostname || '';
  const isVercelHost = host.endsWith('.vercel.app') || 
                       (host && !host.includes('localhost') && !host.includes('127.0.0.1') && !host.endsWith('.github.io'));

  // Load telemetry only when supported
  if (isVercelHost) {
    if (!document.querySelector('script[src*="/_vercel/insights/script.js"]')) {
      const vaScript = document.createElement('script');
      vaScript.defer = true;
      vaScript.src = '/_vercel/insights/script.js';
      vaScript.onerror = function () { /* Silently suppress on static hosts */ };
      document.head.appendChild(vaScript);
    }

    if (!document.querySelector('script[src*="/_vercel/speed-insights/script.js"]')) {
      const siScript = document.createElement('script');
      siScript.defer = true;
      siScript.src = '/_vercel/speed-insights/script.js';
      siScript.onerror = function () { /* Silently suppress on static hosts */ };
      document.head.appendChild(siScript);
    }
  }
})();
