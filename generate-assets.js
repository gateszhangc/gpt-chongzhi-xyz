const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'static');
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const BG = '#0f1a1b';
const ACCENT = '#2dd4bf';
const WHITE = '#ffffff';
const DARK_TEXT = '#111827';

function drawLogo(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const pad = w * 0.12;

  ctx.clearRect(0, 0, w, h);

  ctx.shadowColor = 'rgba(45,212,191,0.3)';
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.roundRect(pad, pad, w - pad * 2, h - pad * 2, 16);
  ctx.fillStyle = BG;
  ctx.fill();

  ctx.shadowBlur = 0;

  const cx = w / 2;
  const cy = h / 2;

  ctx.font = `bold ${w * 0.28}px "Inter", "SF Pro Display", "Helvetica Neue", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = ACCENT;
  ctx.fillText('G', cx - w * 0.14, cy);

  ctx.fillStyle = WHITE;
  ctx.fillText('P', cx + w * 0.14, cy);

  ctx.beginPath();
  ctx.arc(cx - w * 0.14, cy + h * 0.22, 4, 0, Math.PI * 2);
  ctx.fillStyle = ACCENT;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx + w * 0.14, cy + h * 0.22, 4, 0, Math.PI * 2);
  ctx.fillStyle = WHITE;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy + h * 0.38, 3, 0, Math.PI * 2);
  ctx.fillStyle = ACCENT;
  ctx.fill();
}

function drawFavicon(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const s = Math.min(w, h);

  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  ctx.roundRect(0, 0, s, s, 10);
  ctx.fillStyle = BG;
  ctx.fill();

  ctx.shadowColor = 'rgba(45,212,191,0.25)';
  ctx.shadowBlur = 8;

  ctx.beginPath();
  ctx.roundRect(s * 0.1, s * 0.1, s * 0.8, s * 0.8, 8);
  ctx.fillStyle = BG;
  ctx.fill();

  ctx.shadowBlur = 0;

  const cx = s / 2;
  const cy = s / 2;

  ctx.font = `bold ${s * 0.42}px "Inter", "SF Pro Display", "Helvetica Neue", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = ACCENT;
  ctx.fillText('G', cx, cy);
}

const logoSize = 256;
const logoCanvas = createCanvas(logoSize, logoSize);
drawLogo(logoCanvas);
const logoBuffer = logoCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(ASSETS_DIR, 'logo.png'), logoBuffer);
console.log('Generated logo.png');

const faviconSizes = [16, 32, 48];
for (const size of faviconSizes) {
  const canvas = createCanvas(size, size);
  drawFavicon(canvas);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(ASSETS_DIR, `favicon-${size}.png`), buffer);
  console.log(`Generated favicon-${size}.png`);
}

const icoCanvas = createCanvas(32, 32);
drawFavicon(icoCanvas);
fs.writeFileSync(path.join(ASSETS_DIR, 'favicon.ico'), icoCanvas.toBuffer('image/png'));
console.log('Generated favicon.ico');
