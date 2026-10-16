import { useRef, useEffect } from 'react';
import { useMouseFollow } from '../hooks/useMouseFollow';

export default function Robot() {
  const { x, y } = useMouseFollow();
  const eyeRef = useRef(null);
  const haloRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    if (eyeRef.current) {
      eyeRef.current.style.transform = `translate(${x * 6}%, ${y * 6}%)`;
    }
    if (haloRef.current) {
      haloRef.current.style.transform = `translate(calc(-50% + ${x * 4}%), calc(-50% + ${y * 4}%))`;
    }
    if (coreRef.current) {
      coreRef.current.style.transform = `translate(calc(-50% + ${x * 3}%), calc(-50% + ${y * 3}%))`;
    }
  }, [x, y]);

  return (
    <div className="robot" id="robot">
      <img src="/assets/robot.png" alt="Futuristic robot illustration" draggable="false" />
      <i className="core" ref={coreRef}></i>
      <i className="halo" ref={haloRef}></i>
      <i className="eye" ref={eyeRef}></i>
      <i className="orbit"></i>
      <i className="orbit o2"></i>
      <i className="scan"></i>
    </div>
  );
}