
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  life: number;
  color: string;
}

const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const animationFrameId = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const lastMoveTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 3 + 1;
      const speedX = (Math.random() - 0.5) * 1.5;
      const speedY = (Math.random() - 0.5) * 1.5;
      const life = 1;
      const maxLife = Math.random() * 0.5 + 0.5; // 0.5 ~ 1.0
      // Amber-200 to Amber-400 colors
      const color = Math.random() > 0.5 ? '253, 230, 138' : '251, 191, 36'; 
      
      particles.current.push({ x, y, size, speedX, speedY, life, maxLife, color });
    };

    const createRipple = (x: number, y: number) => {
      ripples.current.push({
        x,
        y,
        size: 1,
        maxSize: 40,
        life: 1,
        color: '251, 191, 36'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      isMoving.current = true;
      lastMoveTime.current = Date.now();
      
      // 움직일 때마다 입자 생성 (성능을 위해 확률적으로)
      if (Math.random() > 0.5) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
      // 클릭 시 입자 폭발
      for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 입자 업데이트 및 그리기
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
        p.size *= 0.95;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
        ctx.fill();
      }

      // 파동 업데이트 및 그리기
      for (let i = 0; i < ripples.current.length; i++) {
        const r = ripples.current[i];
        r.size += (r.maxSize - r.size) * 0.1;
        r.life -= 0.05;

        if (r.life <= 0) {
          ripples.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color}, ${r.life * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default CursorEffect;
