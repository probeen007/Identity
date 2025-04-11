
import { useState, useEffect, useRef } from 'react';

// Central event dispatcher for matrix effects
export const matrixEffectEvent = new EventTarget();

export const useMatrixEffect = () => {
  const [matrixSpeed, setMatrixSpeed] = useState(60);
  const [matrixDensity, setMatrixDensity] = useState(20);
  const [matrixVisible, setMatrixVisible] = useState(true);
  const [matrixFullscreen, setMatrixFullscreen] = useState(false);
  const matrixFullscreenTimer = useRef<NodeJS.Timeout | null>(null);

  // Set up listeners for matrix effect events
  useEffect(() => {
    const handleMatrixActivate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setMatrixVisible(true);
      
      if (detail?.fullscreen) {
        setMatrixFullscreen(true);
        
        // If duration is specified, go back to normal after that time
        if (detail.duration) {
          if (matrixFullscreenTimer.current) {
            clearTimeout(matrixFullscreenTimer.current);
          }
          
          matrixFullscreenTimer.current = setTimeout(() => {
            setMatrixFullscreen(false);
          }, detail.duration);
        }
      }
    };
    
    const handleMatrixSpeed = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.speed) {
        setMatrixSpeed(detail.speed);
      }
    };
    
    const handleMatrixDensity = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.density) {
        setMatrixDensity(detail.density);
      }
    };
    
    const handleMatrixToggle = () => {
      setMatrixVisible(prev => !prev);
    };
    
    matrixEffectEvent.addEventListener('matrixActivate', handleMatrixActivate);
    matrixEffectEvent.addEventListener('matrixSpeed', handleMatrixSpeed);
    matrixEffectEvent.addEventListener('matrixDensity', handleMatrixDensity);
    matrixEffectEvent.addEventListener('matrixToggle', handleMatrixToggle);
    
    return () => {
      matrixEffectEvent.removeEventListener('matrixActivate', handleMatrixActivate);
      matrixEffectEvent.removeEventListener('matrixSpeed', handleMatrixSpeed);
      matrixEffectEvent.removeEventListener('matrixDensity', handleMatrixDensity);
      matrixEffectEvent.removeEventListener('matrixToggle', handleMatrixToggle);
      
      if (matrixFullscreenTimer.current) {
        clearTimeout(matrixFullscreenTimer.current);
      }
    };
  }, []);

  return {
    matrixSpeed,
    matrixDensity,
    matrixVisible,
    matrixFullscreen,
    setMatrixSpeed,
    setMatrixDensity
  };
};
