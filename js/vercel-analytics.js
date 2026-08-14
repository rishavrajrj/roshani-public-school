/**
 * Vercel Analytics & Speed Insights Loader for Static HTML Sites
 */
(function() {
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };

  if (!document.querySelector('script[src*="/_vercel/insights/script.js"]')) {
    var vaScript = document.createElement('script');
    vaScript.defer = true;
    vaScript.src = '/_vercel/insights/script.js';
    document.head.appendChild(vaScript);
  }

  if (!document.querySelector('script[src*="/_vercel/speed-insights/script.js"]')) {
    var siScript = document.createElement('script');
    siScript.defer = true;
    siScript.src = '/_vercel/speed-insights/script.js';
    document.head.appendChild(siScript);
  }
})();
