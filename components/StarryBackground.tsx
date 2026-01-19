
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  twinkleDir: number;
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // 성능 최적화를 위해 alpha: false 고려 가능하지만, 배경색이 있어서 true 유지 혹은 CSS 처리
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = [];
    
    // 성능 최적화: 별의 개수 대폭 감소
    // 모바일(width < 768)이면 40개, 아니면 80개로 제한 (기존 150개)
    const numStars = width < 768 ? 40 : 80;

    // 별 초기화
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.01 + 0.002, // 속도 약간 낮춤 (부드러운 움직임)
        twinkleDir: Math.random() > 0.5 ? 1 : -1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // 반짝임 효과
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        
        star.alpha += star.speed * star.twinkleDir;
        
        if (star.alpha >= 1) {
            star.alpha = 1;
            star.twinkleDir = -1;
        } else if (star.alpha <= 0.2) {
            star.alpha = 0.2;
            star.twinkleDir = 1;
        }

        // 이동 계산
        star.y -= 0.05;
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // 리사이즈 시 별 위치 재계산은 하지 않고 캔버스 크기만 맞춤 (깜빡임 방지)
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-60"
    />
  );
};

export default StarryBackground;
