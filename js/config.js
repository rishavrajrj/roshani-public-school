/**
 * ROSHANI PUBLIC SCHOOL — GLOBAL CONFIGURATION
 * 
 * NEXT_PUBLIC_DEMO_MODE:
 * - true  : Displays the temporary Portfolio Demo / Client Review banner.
 * - false : Official production state (hides demo banner completely).
 * 
 * To activate official production mode after school approval, change:
 * window.NEXT_PUBLIC_DEMO_MODE = false;
 */

(function () {
  if (typeof window.NEXT_PUBLIC_DEMO_MODE === 'undefined') {
    window.NEXT_PUBLIC_DEMO_MODE = true;
  }
})();
