import { useEffect, useState } from 'react';

export function useMouseFollow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handle = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const x = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
      const y = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
      setPos({ x, y });
    };

    window.addEventListener('pointermove', handle, { passive: true });
    return () => window.removeEventListener('pointermove', handle);
  }, []);

  return pos;
}