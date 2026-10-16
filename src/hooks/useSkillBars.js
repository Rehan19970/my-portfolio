import { useEffect } from 'react';

export function useSkillBars() {
  useEffect(() => {
    const bio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const L = +el.dataset.l;
          const b = el.querySelector('b');
          const bar = el.querySelector('.tr i');
          
          if (bar) bar.style.width = L + '%';
          
          const t0 = performance.now();
          (function s(n) {
            const k = Math.min((n - t0) / 1500, 1);
            if (b) b.textContent = Math.round(L * (1 - Math.pow(1 - k, 3))) + '%';
            if (k < 1) requestAnimationFrame(s);
          })(t0);
          
          bio.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    const bars = document.querySelectorAll('.sbar');
    bars.forEach((el) => bio.observe(el));

    return () => bio.disconnect();
  }, []);
}