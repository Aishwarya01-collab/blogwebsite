"use client";

import { useEffect, useRef } from "react";

export default function TimelineTreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Branching timeline logic
    const drawBranch = (
      x: number,
      y: number,
      angle: number,
      depth: number,
      timeOffset: number
    ) => {
      if (depth === 0) return;

      const length = depth * 15 + Math.sin(time + timeOffset) * 5;
      const x2 = x + Math.cos(angle) * length;
      const y2 = y + Math.sin(angle) * length;

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = depth > 3 ? "#3BE58B" : "#C49A45";
      
      // Line style
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = depth > 3 ? `rgba(59, 229, 139, ${depth * 0.15})` : `rgba(196, 154, 69, ${depth * 0.2})`;
      ctx.lineWidth = depth * 0.5;
      ctx.stroke();

      // Branch out
      drawBranch(x2, y2, angle - 0.2 + Math.sin(time + timeOffset) * 0.1, depth - 1, timeOffset + 1);
      drawBranch(x2, y2, angle + 0.2 + Math.cos(time + timeOffset) * 0.1, depth - 1, timeOffset + 2);
    };

    const draw = () => {
      // Dark space trail effect matching tva-base
      ctx.fillStyle = "rgba(5, 10, 7, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Start the tree from the center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw the multiverse tree spreading outwards
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i + (time * 0.1);
        drawBranch(centerX, centerY, angle, 6, i);
      }

      // Draw the central glowing orb
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30 + Math.sin(time * 2) * 5, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
      gradient.addColorStop(0, "#3BE58B");
      gradient.addColorStop(0.5, "rgba(29, 107, 69, 0.6)"); // tva-emerald
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 40;
      ctx.shadowColor = "#3BE58B";
      ctx.fill();

      time += 0.02;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
    />
  );
}
