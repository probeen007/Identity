
import React, { useEffect, useRef, useState } from 'react';

interface MatrixBackgroundProps {
  speed?: number;
  density?: number;
  interactionEnabled?: boolean;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ 
  speed = 60, 
  density = 20, 
  interactionEnabled = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / density);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const matrix = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const draw = () => {
      if (!isActive) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF00';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        
        // If mouse position is set and we're near the mouse, make characters brighter
        if (mousePosition && interactionEnabled) {
          const x = i * density;
          const y = drops[i] * density;
          const distance = Math.sqrt(
            Math.pow(x - mousePosition.x, 2) + 
            Math.pow(y - mousePosition.y, 2)
          );
          
          if (distance < 100) {
            ctx.fillStyle = '#88FF88'; // Brighter green
            ctx.font = '18px monospace'; // Slightly larger font
          } else {
            ctx.fillStyle = '#00FF00';
            ctx.font = '15px monospace';
          }
        }
        
        ctx.fillText(text, i * density, drops[i] * density);

        if (drops[i] * density > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const startAnimation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(draw, currentSpeed) as unknown as number;
    };

    startAnimation();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (interactionEnabled) {
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('resize', handleResize);
    
    if (interactionEnabled) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (interactionEnabled) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isActive, currentSpeed, density, interactionEnabled, mousePosition]);

  return (
    <canvas 
      ref={canvasRef} 
      className="matrix-background"
      data-testid="matrix-background"
    />
  );
};

export default MatrixBackground;
