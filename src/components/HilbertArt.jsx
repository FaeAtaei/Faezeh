import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Frame = styled.div`
  width: min(540px, 100%);
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(42, 54, 99, 0.32);
  border-radius: 1rem;
  background: #faf6e3;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(42, 54, 99, 0.14);
`;

const StyledCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

function rot(n, x, y, rx, ry) {
  if (ry === 0) {
    if (rx === 1) {
      x = n - 1 - x;
      y = n - 1 - y;
    }
    return [y, x];
  }
  return [x, y];
}

function hilbertIndexToXY(index, order) {
  let x = 0;
  let y = 0;
  let t = index;

  for (let s = 1; s < 1 << order; s *= 2) {
    const rx = 1 & (t >> 1);
    const ry = 1 & (t ^ rx);
    [x, y] = rot(s, x, y, rx, ry);
    x += s * rx;
    y += s * ry;
    t >>= 2;
  }

  return { x, y };
}

function smoothstep(edge0, edge1, value) {
  const x = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
}

function HilbertArt() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let points = [];
    let time = 0;
    let rafId = 0;

    const mouse = {
      x: 0,
      y: 0,
      inside: false
    };

    const ORDER = 5;
    const PADDING = 28;

    function buildPoints() {
      const grid = 1 << ORDER;
      const maxVertices = grid * grid;
      points = [];

      for (let i = 0; i < maxVertices; i += 1) {
        const pt = hilbertIndexToXY(i, ORDER);
        const x = PADDING + (pt.x / (grid - 1)) * (width - PADDING * 2);
        const y = PADDING + (pt.y / (grid - 1)) * (height - PADDING * 2);
        points.push({ x, y });
      }
    }

    function resize() {
      const rect = frame.getBoundingClientRect();
      width = Math.max(280, Math.floor(rect.width));
      height = Math.max(280, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildPoints();
    }

    function drawBackground() {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#FAF6E3");
      grad.addColorStop(0.5, "#D8DBBD");
      grad.addColorStop(1, "#FAF6E3");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    function drawCurve() {
      const mouseRadius = width * 0.38;
      const noiseScale = width * 0.05;

      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < points.length; i += 1) {
        const pt = points[i];
        const dx = pt.x - mouse.x;
        const dy = pt.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const interaction = mouse.inside
          ? smoothstep(1.2, 0, dist / mouseRadius)
          : 0.16;

        const nx = Math.sin(time * 1.1 + i * 0.09 + pt.y * 0.02);
        const ny = Math.cos(time * 0.95 + i * 0.09 + pt.x * 0.02);
        const xoff = nx * noiseScale * interaction;
        const yoff = ny * noiseScale * interaction;

        const x = pt.x + xoff;
        const y = pt.y + yoff;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(42, 54, 99, 0.9)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = "rgba(181, 159, 120, 0.85)";
      ctx.lineWidth = 1.05;
      ctx.stroke();
    }

    function render() {
      drawBackground();
      drawCurve();

      if (!prefersReducedMotion) {
        time += 0.016;
        rafId = window.requestAnimationFrame(render);
      }
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.inside = true;
    }

    function handlePointerLeave() {
      mouse.inside = false;
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resize);

    resize();
    render();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <Frame ref={frameRef}>
      <StyledCanvas ref={canvasRef} />
    </Frame>
  );
}

export default HilbertArt;
