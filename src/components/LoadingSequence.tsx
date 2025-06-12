'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export const LoadingSequence = () => {
  const [progress, setProgress] = useState(0);
  const [showSequence, setShowSequence] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    '/ initializing_wolver',
    '/ preparing_smart_loans',
    '/ configuring_secure_platform',
    '/ launching_application'
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress from 0 to 100
    tl.to({ value: 0 }, {
      value: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].value));
      }
    });

    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 750);

    // Hide sequence after animation
    const timer = setTimeout(() => {
      setShowSequence(false);
    }, 4000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!showSequence) return null;

  return (
    <div className="fixed inset-0 bg-black text-orange-500 font-mono flex items-center justify-center z-50">
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`typing-animation ${
              index <= currentStep ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          >
            {step}
          </div>
        ))}
        <div className="mt-4">
          <div className="w-[300px] h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right mt-2">/ {progress}% complete</div>
        </div>
      </div>
    </div>
  );
}; 