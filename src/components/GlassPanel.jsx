import { useState, useEffect } from 'react';

export default function GlassPanel() {
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  const steps = ['Design', 'Develop', 'Deploy'];

  return (
    <div className="glass pa" aria-hidden="true">
      <div className="fl">
        <ul id="steps">
          {steps.map((step, i) => (
            <li key={step} className={i === activeStep ? 'on' : ''}>
              {step}
            </li>
          ))}
        </ul>
        <div className="bar">
          <i style={{ width: `${((activeStep + 1) / 3) * 100}%` }}></i>
        </div>
      </div>
    </div>
  );
}