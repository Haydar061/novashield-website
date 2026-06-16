"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const trail = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const animId = useRef(0);
  const isTouch = useRef(false);

  const spawn = useCallback((x: number, y: number) => {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 1.5,
        life: 0,
        maxLife: 30 + Math.random() * 30,
        size: Math.random() * 4 + 2,
        hue: 220 + Math.random() * 60,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    isTouch.current = "ontouchstart" in window;
    if (isTouch.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY);

      trail.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trail.current.length > 30) trail.current.shift();
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail ciz
      if (trail.current.length > 1) {
        for (let i = 1; i < trail.current.length; i++) {
          const t = trail.current[i];
          const prev = trail.current[i - 1];
          const progress = i / trail.current.length;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `hsla(${220 + progress * 60}, 80%, 60%, ${progress * 0.4})`;
          ctx.lineWidth = progress * 3;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Trail fade
        trail.current.forEach((t) => {
          t.alpha -= 0.02;
        });
        trail.current = trail.current.filter((t) => t.alpha > 0);
      }

      // Mouse etrafinda glow
      const { x, y } = mouse.current;
      if (x > 0 && y > 0) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.12)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.06)");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Kucuk parlak nokta
        const dotGrad = ctx.createRadialGradient(x, y, 0, x, y, 6);
        dotGrad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        dotGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.4)");
        dotGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = dotGrad;
        ctx.fill();
      }

      // Parcaciklar
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gravity
        p.life++;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const progress = 1 - p.life / p.maxLife;
        const alpha = progress * 0.7;
        const size = p.size * progress;

        // Parlayan parcacik
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        pGrad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha})`);
        pGrad.addColorStop(0.6, `hsla(${p.hue}, 80%, 50%, ${alpha * 0.5})`);
        pGrad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
      });

      // Olu parcaciklari temizle
      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      animId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId.current);
    };
  }, [spawn]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}
