const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const palette = [
  "255, 109, 66",
  "238, 84, 48",
  "255, 160, 122",
  "255, 208, 188",
  "161, 74, 56"
];

const blobs = [];
let width = 0;
let height = 0;
let dpr = 1;
let pointerX = 0.5;
let pointerY = 0.5;
let currentX = 0.5;
let currentY = 0.5;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createBlob() {
  return {
    x: rand(0.1, 0.9),
    y: rand(0.15, 0.88),
    vx: rand(-0.00028, 0.00028),
    vy: rand(-0.0002, 0.0002),
    r: rand(0.18, 0.33),
    color: palette[Math.floor(rand(0, palette.length))]
  };
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;

  const blobCount = width < 700 ? 6 : 8;
  blobs.length = 0;
  for (let i = 0; i < blobCount; i += 1) blobs.push(createBlob());
}

function drawBaseLayer() {
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#130704");
  bg.addColorStop(0.35, "#38130b");
  bg.addColorStop(0.65, "#6f2e20");
  bg.addColorStop(1, "#f0c9b7");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
}

function drawBlob(blob) {
  const x = blob.x * width;
  const y = blob.y * height;
  const radius = blob.r * Math.max(width, height);
  const grad = ctx.createRadialGradient(x, y, radius * 0.06, x, y, radius);
  grad.addColorStop(0, `rgba(${blob.color}, 0.64)`);
  grad.addColorStop(0.45, `rgba(${blob.color}, 0.3)`);
  grad.addColorStop(1, `rgba(${blob.color}, 0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPointerLight() {
  currentX += (pointerX - currentX) * 0.07;
  currentY += (pointerY - currentY) * 0.07;
  const x = currentX * width;
  const y = currentY * height;
  const radius = Math.max(width, height) * 0.42;
  const light = ctx.createRadialGradient(x, y, 0, x, y, radius);
  light.addColorStop(0, "rgba(255, 248, 235, 0.26)");
  light.addColorStop(0.45, "rgba(255, 224, 203, 0.1)");
  light.addColorStop(1, "rgba(255, 224, 203, 0)");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, width, height);
}

function animate() {
  drawBaseLayer();
  ctx.globalCompositeOperation = "screen";

  for (const blob of blobs) {
    blob.x += blob.vx;
    blob.y += blob.vy;

    if (blob.x < 0.02 || blob.x > 0.98) blob.vx *= -1;
    if (blob.y < 0.05 || blob.y > 0.95) blob.vy *= -1;

    drawBlob(blob);
  }

  drawPointerLight();
  ctx.globalCompositeOperation = "source-over";

  const haze = ctx.createLinearGradient(0, 0, 0, height);
  haze.addColorStop(0, "rgba(0, 0, 0, 0.3)");
  haze.addColorStop(0.5, "rgba(0, 0, 0, 0)");
  haze.addColorStop(1, "rgba(0, 0, 0, 0.22)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  if (!prefersReducedMotion) requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX / width;
  pointerY = event.clientY / height;
});

resize();
animate();
