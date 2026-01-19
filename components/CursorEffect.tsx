
import React, { useEffect, useRef, useState } from 'react';

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
  
  // 최적화: 이전 생성 위치 추적 (거리 기반 스로틀링)
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지 (렉 방지를 위해 모바일에선 효과 끔)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 모바일이면 캔버스 로직 실행 안함 (성능 최적화)
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true }); // alpha: true 명시
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (x: number, y: number) => {
      // 파티클 개수 및 수명 감소 (성능 최적화)
      const size = Math.random() * 2 + 1; // 크기 약간 축소
      const speedX = (Math.random() - 0.5) * 1.0; // 속도 약간 감소
      const speedY = (Math.random() - 0.5) * 1.0;
      const life = 1;
      const maxLife = Math.random() * 0.4 + 0.4; // 수명 단축
      const color = Math.random() > 0.5 ? '253, 230, 138' : '251, 191, 36'; 
      
      particles.current.push({ x, y, size, speedX, speedY, life, maxLife, color });
    };

    const createRipple = (x: number, y: number) => {
      ripples.current.push({
        x,
        y,
        size: 1,
        maxSize: 30, // 리플 크기 축소
        life: 1,
        color: '251, 191, 36'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 최적화: 매 프레임마다 생성하지 않고, 일정 거리(15px) 이상 움직였을 때만 생성
      const dx = e.clientX - lastSpawnPos.current.x;
      const dy = e.clientY - lastSpawnPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15) {
        createParticle(e.clientX, e.clientY);
        lastSpawnPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
      // 클릭 시 입자 개수 제한 (8 -> 5)
      for (let i = 0; i < 5; i++) {
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
        p.life -= 0.03; // 사라지는 속도 증가
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
        ctx.lineWidth = 1.5;
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
  }, [isMobile]); // isMobile 변경 시 재실행

  // 모바일에서는 아무것도 렌더링하지 않음
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default CursorEffect;
