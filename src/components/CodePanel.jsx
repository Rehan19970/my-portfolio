import { useEffect, useRef } from 'react';

export default function CodePanel() {
  const codeRef = useRef(null);

  useEffect(() => {
    const code = codeRef.current;
    if (!code) return;

    const cols = ['rgba(120,210,255,.7)', 'rgba(160,140,255,.7)', 'rgba(220,240,255,.55)'];

    code.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const l = document.createElement('i');
      l.style.width = (30 + Math.random() * 65) + '%';
      l.style.marginLeft = (i % 3 === 1 ? 14 : i % 3 === 2 ? 7 : 0) + 'px';
      l.style.background = cols[(Math.random() * 3) | 0];
      l.style.animationDelay = (i * 0.28) + 's';
      code.appendChild(l);
    }

    return () => {
      if (code) code.innerHTML = '';
    };
  }, []);

  return (
    <div className="glass pb" aria-hidden="true">
      <div className="fl">
        <div className="ic">&lt;/&gt;</div>
        <div className="code" ref={codeRef}></div>
        <p>Clean Code<br />Better Future</p>
      </div>
    </div>
  );
}