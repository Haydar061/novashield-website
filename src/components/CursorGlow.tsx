"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const active = useRef(false);
  const particles = useRef<any[]>([]);
  const trail = useRef<{ x: number; y: number; h: number }[]>([]);
  const hueVal = useRef(200);
  const frameCount = useRef(0);
  const orbData = useRef<any[]>([]);
  const prevX = useRef(0);
  const prevY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // 5 orbiting top
    if (orbData.current.length === 0) {
      for (let i = 0; i < 5; i++) {
        orbData.current.push({
          a: (Math.PI * 2 * i) / 5,
          sp: 0.025 + Math.random() * 0.015,
          d: 28 + Math.random() * 12,
          sz: 2 + Math.random() * 2,
          ho: i * 35,
        });
      }
    }

    // Global mouse tracking - en ust seviye
    const handler = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      active.current = true;
    };

    // Hem window hem document'a bagla
    window.addEventListener("mousemove", handler);
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", () => { active.current = false; });
    document.addEventListener("mouseenter", () => { active.current = true; });

    const drawStar = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? s : s * 0.35;
        const a = (i * Math.PI) / 4;
        if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.restore();
    };

    const drawHeart = (x: number, y: number, s: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      const z = s * 0.55;
      ctx.beginPath();
      ctx.moveTo(0, z * 0.3);
      ctx.bezierCurveTo(-z, -z * 0.5, -z * 0.5, -z * 1.2, 0, -z * 0.5);
      ctx.bezierCurveTo(z * 0.5, -z * 1.2, z, -z * 0.5, 0, z * 0.3);
      ctx.closePath();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount.current++;
      hueVal.current = (hueVal.current + 0.5) % 360;

      if (!active.current) {
        requestAnimationFrame(loop);
        return;
      }

      // Mouse pozisyonunu DIREKT kullan - lerp yok
      const x = mx.current;
      const y = my.current;
      const h = hueVal.current;

      // Hiz
      const dx = x - prevX.current;
      const dy = y - prevY.current;
      const spd = Math.sqrt(dx * dx + dy * dy);
      prevX.current = x;
      prevY.current = y;

      // Trail
      trail.current.push({ x, y, h });
      if (trail.current.length > 50) trail.current.shift();

      // Parcacik olustur
      if (spd > 2) {
        const cnt = Math.min(Math.floor(spd * 0.4), 4);
        for (let i = 0; i < cnt; i++) {
          const ang = Math.random() * Math.PI * 2;
          const v = Math.random() * 2.5 + 0.5;
          const tp = ["dot", "dot", "star", "ring", "heart"][Math.floor(Math.random() * 5)];
          particles.current.push({
            x, y,
            vx: Math.cos(ang) * v,
            vy: Math.sin(ang) * v - Math.random() * 1.5,
            life: 0, max: 25 + Math.random() * 35,
            sz: 2 + Math.random() * 5,
            h: h + Math.random() * 50 - 25,
            tp, rot: Math.random() * 6.28, rs: (Math.random() - 0.5) * 0.12,
          });
        }
      }

      // ===== TRAIL =====
      ctx.lineCap = "round";
      for (let i = 1; i < trail.current.length; i++) {
        const t = trail.current[i];
        const p = trail.current[i - 1];
        const pr = i / trail.current.length;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = `hsla(${t.h}, 100%, 70%, ${pr * 0.12})`;
        ctx.lineWidth = pr * 14;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = `hsla(${t.h}, 90%, 80%, ${pr * 0.5})`;
        ctx.lineWidth = pr * 2.5;
        ctx.stroke();
      }

      // ===== GLOW =====
      const g1 = ctx.createRadialGradient(x, y, 0, x, y, 100);
      g1.addColorStop(0, `hsla(${h}, 80%, 60%, 0.1)`);
      g1.addColorStop(0.5, `hsla(${h + 40}, 70%, 50%, 0.03)`);
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(x - 100, y - 100, 200, 200);

      const g2 = ctx.createRadialGradient(x, y, 0, x, y, 25);
      g2.addColorStop(0, `hsla(${h}, 100%, 85%, 0.6)`);
      g2.addColorStop(0.5, `hsla(${h + 30}, 90%, 65%, 0.2)`);
      g2.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      // Beyaz merkez
      const g3 = ctx.createRadialGradient(x, y, 0, x, y, 4);
      g3.addColorStop(0, "rgba(255,255,255,0.95)");
      g3.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = g3;
      ctx.fill();

      // ===== ORBITING TOPLAR =====
      orbData.current.forEach((o) => {
        o.a += o.sp;
        const ox = x + Math.cos(o.a) * o.d;
        const oy = y + Math.sin(o.a) * o.d;

        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.sz * 3);
        og.addColorStop(0, `hsla(${h + o.ho}, 90%, 75%, 0.7)`);
        og.addColorStop(0.5, `hsla(${h + o.ho}, 80%, 60%, 0.2)`);
        og.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(ox, oy, o.sz * 3, 0, Math.PI * 2);
        ctx.fillStyle = og;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, o.sz, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${h + o.ho}, 100%, 88%, 0.9)`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = `hsla(${h + o.ho}, 80%, 60%, 0.05)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // ===== HALKALAR =====
      const r1 = frameCount.current * 0.025;
      ctx.beginPath();
      ctx.arc(x, y, 32, r1, r1 + Math.PI * 0.7);
      ctx.strokeStyle = `hsla(${h}, 90%, 70%, 0.3)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 32, r1 + Math.PI, r1 + Math.PI * 1.7);
      ctx.strokeStyle = `hsla(${h + 60}, 90%, 70%, 0.2)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 45, -r1 * 0.7, -r1 * 0.7 + Math.PI * 0.4);
      ctx.strokeStyle = `hsla(${h + 120}, 80%, 65%, 0.1)`;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // ===== PARCACIKLAR =====
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life++;
        p.rot += p.rs;

        const pr = 1 - p.life / p.max;
        const al = pr * 0.85;
        const sz = p.sz * pr;
        ctx.globalAlpha = al;

        if (p.tp === "star") {
          drawStar(p.x, p.y, sz * 1.3, p.rot);
          ctx.fillStyle = `hsla(${p.h}, 100%, 80%, 1)`;
          ctx.shadowColor = `hsla(${p.h}, 100%, 70%, 0.8)`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.tp === "heart") {
          drawHeart(p.x, p.y, sz * 1.5, p.rot);
          ctx.fillStyle = `hsla(340, 90%, 70%, 1)`;
          ctx.shadowColor = `hsla(340, 90%, 60%, 0.6)`;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.tp === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.h}, 90%, 75%, 1)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          const sg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz);
          sg.addColorStop(0, `hsla(${p.h}, 100%, 90%, 1)`);
          sg.addColorStop(0.4, `hsla(${p.h}, 90%, 70%, 0.5)`);
          sg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      particles.current = particles.current.filter((p) => p.life < p.max);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ pointerEvents: "none" }}
    />
  );
}
