'use client';
import { useEffect } from 'react';

// Hero shader starts immediately. three.js, the link orb and the contact page load when the browser is idle.
export default function Scene() {
  useEffect(() => {
    if (window.__vd) return;
    window.__vd = true;
    (async () => {
      (await import('../lib/main')).default();
      const idle = window.requestIdleCallback || ((f) => setTimeout(f, 300));
      idle(async () => {
        window.THREE = await import('three');
        (await import('../lib/orb')).default();
        (await import('../lib/contact')).default();
      }, { timeout: 2000 });
    })();
  }, []);
  return null;
}
