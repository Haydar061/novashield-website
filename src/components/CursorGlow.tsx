"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const pos = useRef({ x: 0, y: 0 });
  const particles = useRef<any[]>([]);
  const trail = useRef<{ x: number; y: number; hue: number }[]>([]);
  const hue = useRef(200);
  const frame = useRef(0);
  const orbs = useRef<{ angle: number; speed: number; dist: number; size: number; hueOff: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Orbiting kucuk toplar
    for (let i = 0; i < 5; i++) {
      orbs.current.push({
        angle: (Math.PI * 2 * i) / 5,
        speed: 0.02 + Math.random() * 0.02,
        dist: 25 + Math.random() * 15,
        size: 2 + Math.random() * 2,
        hueOff: i * 30,
      });
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse eventleri - document uzerinde
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const onEnter = () => { mouse.current.active = true; };
    const onLeave = () => { mouse.current.active = false; };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    // Window uzerinde de dinle
    window.addEventListener("mousemove", onMove, { passive: true });

    let lastX = 0, lastY = 0;

    const spawnParticles = (x: number, y: number, speed: number) => {
      const count = Math.min(Math.floor(speed * 0.5) + 1, 5);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = Math.random() * 2 + 0.5;
        const types = ["dot", "dot", "dot", "star", "ring", "heart"];
        const type = types[Math.floor(Math.random() * types.length)];
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * v + (Math.random() - 0.5),
          vy: Math.sin(angle) * v - Math.random() * 2,
          life: 0,
          maxLife: 30 + Math.random() * 40,
          size: 2 + Math.random() * 5,
          hue: hue.current + Math.random() * 60 - 30,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    const drawStar = (cx: number, cy: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? size : size * 0.4;
        const a = (i * Math.PI) / 4;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.restore();
    };

    const drawHeart = (cx: number, cy: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      const s = size * 0.6;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.5, -s * 1.2, 0, -s * 0.5);
      ctx.bezierCurveTo(s * 0.5, -s * 1.2, s, -s * 0.5, 0, s * 0.3);
      ctx.closePath();
      ctx.restore();
    };

    const drawDiamond = (cx: number, cy: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame.current++;
      hue.current = (hue.current + 0.4) % 360;

      if (!mouse.current.active) {
        requestAnimationFrame(animate);
        return;
      }

      // Smooth follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.25;

      const cx = pos.current.x;
      const cy = pos.current.y;

      // Hiz hesapla
      const dx = cx - lastX;
      const dy = cy - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX = cx;
      lastY = cy;

      // Trail
      trail.current.push({ x: cx, y: cy, hue: hue.current });
      if (trail.current.length > 60) trail.current.shift();

      // Parcacik olustur
      if (speed > 1) spawnParticles(cx, cy, speed);

      // ===== TRAIL CIZ =====
      if (trail.current.length > 2) {
        // Dis glow trail
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 2; i < trail.current.length; i++) {
          const t = trail.current[i];
          const prev = trail.current[i - 1];
          const progress = i / trail.current.length;

          // Dis neon
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `hsla(${t.hue}, 100%, 70%, ${progress * 0.15})`;
          ctx.lineWidth = progress * 16;
          ctx.stroke();

          // Ic parlak
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(t.x, t.y);
          ctx.strokeStyle = `hsla(${t.hue}, 90%, 75%, ${progress * 0.6})`;
          ctx.lineWidth = progress * 3;
          ctx.stroke();
        }
      }

      // ===== ANA CURSOR GLOW =====
      // Buyuk dis glow
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      g1.addColorStop(0, `hsla(${hue.current}, 80%, 60%, 0.08)`);
      g1.addColorStop(0.5, `hsla(${hue.current + 40}, 70%, 50%, 0.03)`);
      g1.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      // Orta glow
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      g2.addColorStop(0, `hsla(${hue.current}, 100%, 85%, 0.5)`);
      g2.addColorStop(0.4, `hsla(${hue.current + 30}, 90%, 65%, 0.2)`);
      g2.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      // Merkez parlak beyaz
      const g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 5);
      g3.addColorStop(0, "rgba(255,255,255,0.95)");
      g3.addColorStop(0.5, `hsla(${hue.current}, 100%, 90%, 0.5)`);
      g3.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = g3;
      ctx.fill();

      // ===== ORBITING TOPLAR =====
      orbs.current.forEach((orb) => {
        orb.angle += orb.speed;
        const ox = cx + Math.cos(orb.angle) * orb.dist;
        const oy = cy + Math.sin(orb.angle) * orb.dist;

        // Orb glow
        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size * 3);
        og.addColorStop(0, `hsla(${hue.current + orb.hueOff}, 90%, 70%, 0.6)`);
        og.addColorStop(0.5, `hsla(${hue.current + orb.hueOff}, 80%, 60%, 0.2)`);
        og.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(ox, oy, orb.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = og;
        ctx.fill();

        // Orb merkez
        ctx.beginPath();
        ctx.arc(ox, oy, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue.current + orb.hueOff}, 100%, 85%, 0.8)`;
        ctx.fill();

        // Orb-cursor arasi cizgi
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = `hsla(${hue.current + orb.hueOff}, 80%, 60%, 0.06)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ===== DONEN HALKALAR =====
      const r1 = frame.current * 0.02;
      const r2 = -frame.current * 0.015;

      // Halka 1
      ctx.beginPath();
      ctx.arc(cx, cy, 35, r1, r1 + Math.PI * 0.8);
      ctx.strokeStyle = `hsla(${hue.current}, 90%, 70%, 0.3)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Halka 2
      ctx.beginPath();
      ctx.arc(cx, cy, 35, r1 + Math.PI, r1 + Math.PI * 1.8);
      ctx.strokeStyle = `hsla(${hue.current + 60}, 90%, 70%, 0.2)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dis halka
      ctx.beginPath();
      ctx.arc(cx, cy, 50, r2, r2 + Math.PI * 0.5);
      ctx.strokeStyle = `hsla(${hue.current + 120}, 80%, 65%, 0.12)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ===== PARCACIKLAR =====
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life++;
        p.rotation += p.rotSpeed;

        const progress = 1 - p.life / p.maxLife;
        const alpha = progress * 0.85;
        const size = p.size * progress;

        ctx.globalAlpha = alpha;

        if (p.type === "star") {
          drawStar(p.x, p.y, size * 1.3, p.rotation);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 80%, 1)`;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, 0.8)`;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.type === "heart") {
          drawHeart(p.x, p.y, size * 1.5, p.rotation);
          ctx.fillStyle = `hsla(${340 + Math.random() * 20}, 90%, 70%, 1)`;
          ctx.shadowColor = `hsla(340, 90%, 60%, 0.6)`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue}, 90%, 75%, 1)`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          // Parlak dot
          const sg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
          sg.addColorStop(0, `hsla(${p.hue}, 100%, 90%, 1)`);
          sg.addColorStop(0.3, `hsla(${p.hue}, 90%, 70%, 0.6)`);
          sg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      });

      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}
