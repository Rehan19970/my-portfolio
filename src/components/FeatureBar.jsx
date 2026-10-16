import { useState, useEffect, useRef } from 'react';

export default function FeatureBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const features = [
    {
      icon: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
      title: 'Web Development',
      desc: 'Modern & responsive websites'
    },
    {
      icon: <path d="M4 20l4.2-1L19.5 7.7a2 2 0 0 0 0-2.8l-.4-.4a2 2 0 0 0-2.8 0L5 15.8zM14 6l4 4" />,
      title: 'UI/UX Design',
      desc: 'Clean & user-focused design'
    },
    {
      icon: <path d="M12 2.5 20 7v10l-8 4.5L4 17V7zM12 12l8-4.8M12 12v9.5M12 12 4 7.2" />,
      title: '3D Web Experiences',
      desc: 'Interactive & immersive'
    },
    {
      icon: <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z" />,
      title: 'Performance',
      desc: 'Fast & optimized code'
    }
  ];

  const startAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3400);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = (i) => {
    setActiveIndex(i);
    clearInterval(timerRef.current);
  };

  const handleLeave = () => {
    startAuto();
  };

  const handleClick = (i) => {
    setActiveIndex(i);
    startAuto();
  };

  return (
    <footer className="feat" id="feat">
      {features.map((f, i) => (
        <div
          key={i}
          className={`f ${i === activeIndex ? 'on' : ''}`}
          onMouseEnter={() => handleEnter(i)}
          onMouseLeave={handleLeave}
          onClick={() => handleClick(i)}
        >
          <div className="ico">
            <svg viewBox="0 0 24 24">{f.icon}</svg>
          </div>
          <div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        </div>
      ))}

      <div className="slider">
        <div className="num">0{activeIndex + 1}</div>
        <div className="track">
          <i style={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}></i>
        </div>
        <span className="tot">04</span>
      </div>
    </footer>
  );
}