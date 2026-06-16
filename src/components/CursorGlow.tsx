"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  type: "spark" | "star" | "ring";
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const smoothRef = useRef({ x: -200, y: -200 });
  const sparks = useRef<Spark[]>([]);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const frameRef = useRef(0);
  const hueRef = useRef(220);
  const lastSpawn = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

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
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const spawnSparks = (x: number, y: number) => {
      const dx = x - lastSpawn.current.x;
      const dy = y - lastSpawn.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) return;
      lastSpawn.current = { x, y };

      const speed = Math.min(dist * 0.15, 4);

      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const types: Spark["type"][] = ["spark", "spark", "star", "ring"];
        sparks.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed * (0.5 + Math.random()),
          vy: Math.sin(angle) * speed * (0.5 + Math.random()) - 1,
          life: 0,
          maxLife: 25 + Math.random() * 35,
          size: Math.random() * 5 + 2,
          hue: hueRef.current + Math.random() * 40 - 20,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    const drawStar = (cx: number, cy: number, size: number, ctx: CanvasRenderingContext2D) => {
      const spikes = 4;
      const outerR = size;
      const innerR = size * 0.4;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / spikes - Math.PI / 2;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow - tam takip
      const lerp = 0.35;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      const sx = smoothRef.current.x;
      const sy = smoothRef.current.y;

      // Hue dongusu
      hueRef.current = (hueRef.current + 0.3) % 360;
      const hue = hueRef.current;

      // Trail kaydet
      trail.current.push({ x: sx, y: sy });
      if (trail.current.length > 50) trail.current.shift();

      // Parcacik spawn
      spawnSparks(sx, sy);

      // Trail ciz - neon serit
      if (trail.current.length > 2) {
        for (let i = 2; i < trail.current.length; i++) {
          const t = trail.current[i];
          const prev = trail.current[i - 1];
          const progress = i / trail.current.length;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `hsla(${hue + progress * 50}, 90%, 65%, ${progress * 0.5})`;
          ctx.lineWidth = progress * 4;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // Dis glow - buyuk
      if (sx > 0 && sy > 0) {
        const g1 = ctx.createRadialGradient(sx, sy, 0, sx, sy, 100);
        g1.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.1)`);
        g1.addColorStop(0.4, `hsla(${hue + 30}, 80%, 50%, 0.04)`);
        g1.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, 100, 0, Math.PI * 2);
        ctx.fillStyle = g1;
        ctx.fill();

        // Ic glow - parlak
        const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, 20);
        g2.addColorStop(0, `hsla(${hue}, 90%, 80%, 0.6)`);
        g2.addColorStop(0.3, `hsla(${hue + 20}, 80%, 60%, 0.3)`);
        g2.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, 20, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        // Merkez beyaz nokta
        const g3 = ctx.createRadialGradient(sx, sy, 0, sx, sy, 4);
        g3.addColorStop(0, "rgba(255,255,255,0.9)");
        g3.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = g3;
        ctx.fill();

        // Donen halka
        frameRef.current++;
        const ringAngle = frameRef.current * 0.03;
        ctx.beginPath();
        ctx.arc(sx, sy, 25, ringAngle, ringAngle + Math.PI * 1.2);
        ctx.strokeStyle = `hsla(${hue + 40}, 90%, 70%, 0.25)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, 25, ringAngle + Math.PI, ringAngle + Math.PI * 2.2);
        ctx.strokeStyle = `hsla(${hue + 80}, 90%, 70%, 0.2)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Parcaciklar ciz
      sparks.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life++;

        const progress = 1 - p.life / p.maxLife;
        const alpha = progress * 0.8;
        const size = p.size * progress;

        if (p.type === "star") {
          drawStar(p.x, p.y, size * 1.5, ctx);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${alpha})`;
          ctx.fill();
          // Star glow
          ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, ${alpha * 0.5})`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 1.2, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue}, 85%, 70%, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Normal spark
          const sg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
          sg.addColorStop(0, `hsla(${p.hue}, 90%, 80%, ${alpha})`);
          sg.addColorStop(0.5, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.4})`);
          sg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
        }
      });

      sparks.current = sparks.current.filter((p) => p.life < p.maxLife);

      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}
