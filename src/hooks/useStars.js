import { useEffect } from 'react';

export function useStars() {
  useEffect(() => {
    const cv = document.getElementById('stars');
    if (!cv) return;

    const cx = cv.getContext('2d');
    if (!cx) return;

    let W, H;
    let stars = [];
    let dust = [];
    let mx = 0, my = 0;      // smooth parallax
    let tx = 0, ty = 0;      // target parallax
    let rafId = null;
    let isRunning = true;

    // Reduced motion respect karo
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function size() {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * d;
      cv.height = H * d;
      cx.setTransform(d, 0, 0, d, 0, 0);

      // Stars generate karo
      stars = Array.from(
        { length: Math.min(230, (W * H / 6500) | 0) },
        () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.25 + 0.2,
          t: Math.random() * 6.28,
          s: Math.random() * 0.025 + 0.006,
          z: Math.random() * 0.9 + 0.1,
        })
      );

      // Dust particles
      dust = Array.from({ length: 46 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.2 + 0.6,
        vy: -(Math.random() * 0.28 + 0.06),
        vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
      }));
    }

    function onPointerMove(e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function onScroll() {
      // Lenis scroll ke saath bhi stars ko move karo
      const hero = document.getElementById('hero');
      if (hero && !reduceMotion) {
        // Optional: scroll-based parallax
        // hero.style.setProperty('--scroll-y', window.scrollY);
      }
    }

    function frame() {
      if (!isRunning) return;

      // Smooth parallax (lerp)
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;

      // Hero element pe CSS variables set karo
      const hero = document.getElementById('hero');
      if (hero) {
        hero.style.setProperty('--px', mx.toFixed(3));
        hero.style.setProperty('--py', my.toFixed(3));
      }

      // Clear canvas
      cx.clearRect(0, 0, W, H);

      // Stars draw karo
      for (const s of stars) {
        s.t += s.s;
        const a = 0.35 + Math.sin(s.t) * 0.35;
        cx.fillStyle = `rgba(170, 215, 255, ${Math.max(a, 0.05)})`;
        cx.beginPath();
        cx.arc(
          s.x + mx * s.z * -14,
          s.y + my * s.z * -10,
          s.r,
          0,
          6.283
        );
        cx.fill();
      }

      // Dust particles draw karo
      for (const p of dust) {
        p.y += p.vy;
        p.x += p.vx;

        // Wrap around
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }

        const g = cx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.r * 4
        );
        g.addColorStop(0, `rgba(80, 190, 255, ${p.a})`);
        g.addColorStop(1, 'rgba(80, 190, 255, 0)');
        cx.fillStyle = g;
        cx.beginPath();
        cx.arc(
          p.x + mx * -22,
          p.y + my * -14,
          p.r * 4,
          0, 6.283
        );
        cx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    // Init
    size();
    window.addEventListener('resize', size);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reduced motion ho toh frame draw mat karo
    if (reduceMotion) {
      // Static draw karo bas (no animation)
      const hero = document.getElementById('hero');
      if (hero) {
        hero.style.setProperty('--px', '0');
        hero.style.setProperty('--py', '0');
      }
    } else {
      rafId = requestAnimationFrame(frame);
    }

    // Cleanup
    return () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}