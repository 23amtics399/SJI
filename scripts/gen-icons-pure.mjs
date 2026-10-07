/**
 * Generates apple-touch-icon.png (180x180) and favicon.ico (32x32)
 * using pure Node.js — no external dependencies required.
 *
 * Creates a dark (#0f0f12) rounded square with white "SJI" text
 * rendered as a valid PNG using raw PNG encoding.
 *
 * Run: node scripts/gen-icons-pure.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '../public');

// ─── Minimal PNG encoder (no deps) ─────────────────────────────────────────

function crc32(buf) {
  let crc = 0xffffffff;
  const table = crc32.table || (crc32.table = makeCrcTable());
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeCrcTable() {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c;
  }
  return t;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

/**
 * Encode an RGBA pixel array as a valid PNG.
 * @param {Uint8Array} pixels - RGBA pixels, width*height*4 bytes
 * @param {number} width
 * @param {number} height
 */
function encodePNG(pixels, width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 2;  // color type: RGB (we'll strip alpha for simplicity)
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  // Build raw scanlines: filter byte (0) + RGB data
  const stride = width * 3;
  const raw = Buffer.alloc(height * (1 + stride));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + stride)] = 0; // filter type: None
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const dstIdx = y * (1 + stride) + 1 + x * 3;
      raw[dstIdx] = pixels[srcIdx];     // R
      raw[dstIdx + 1] = pixels[srcIdx + 1]; // G
      raw[dstIdx + 2] = pixels[srcIdx + 2]; // B
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  const idat = chunk('IDAT', compressed);
  const ihdr = chunk('IHDR', ihdrData);
  const iend = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// ─── Draw SJI icon ──────────────────────────────────────────────────────────

/**
 * Create RGBA pixel buffer for SJI icon.
 * @param {number} size
 */
function drawIcon(size) {
  const pixels = new Uint8Array(size * size * 4);

  // Background color: #0f0f12 = rgb(15, 15, 18)
  const bgR = 15, bgG = 15, bgB = 18;
  // Foreground (text/dot): #ffffff
  const fgR = 255, fgG = 255, fgB = 255;

  // Fill background
  for (let i = 0; i < size * size * 4; i += 4) {
    pixels[i] = bgR;
    pixels[i + 1] = bgG;
    pixels[i + 2] = bgB;
    pixels[i + 3] = 255;
  }

  function setPixel(x, y, r, g, b) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (y * size + x) * 4;
    pixels[idx] = r;
    pixels[idx + 1] = g;
    pixels[idx + 2] = b;
    pixels[idx + 3] = 255;
  }

  function fillRect(x0, y0, w, h, r, g, b) {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        setPixel(x, y, r, g, b);
      }
    }
  }

  // Draw a minimal "SJI" as pixel art blocks
  // Scale everything to icon size
  const unit = Math.floor(size / 20);
  if (unit < 1) return pixels;

  const offsetX = Math.floor(size * 0.1);
  const offsetY = Math.floor(size * 0.3);

  // S glyph (6x8 units)
  const sg = [
    [1,1,1,1,0,0],
    [1,0,0,0,0,0],
    [1,0,0,0,0,0],
    [1,1,1,1,0,0],
    [0,0,0,1,0,0],
    [0,0,0,1,0,0],
    [1,1,1,1,0,0],
    [0,0,0,0,0,0],
  ];

  // J glyph
  const jg = [
    [0,0,1,1,0,0],
    [0,0,1,0,0,0],
    [0,0,1,0,0,0],
    [0,0,1,0,0,0],
    [0,0,1,0,0,0],
    [1,0,1,0,0,0],
    [1,1,1,0,0,0],
    [0,0,0,0,0,0],
  ];

  // I glyph
  const ig = [
    [1,1,1,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [1,1,1,0,0,0],
    [0,0,0,0,0,0],
  ];

  const glyphs = [sg, jg, ig];
  const glyphW = 6;
  const gap = 1;

  for (let gi = 0; gi < glyphs.length; gi++) {
    const glyph = glyphs[gi];
    const startX = offsetX + gi * (glyphW + gap) * unit;
    for (let row = 0; row < glyph.length; row++) {
      for (let col = 0; col < glyph[row].length; col++) {
        if (glyph[row][col]) {
          fillRect(
            startX + col * unit,
            offsetY + row * unit,
            unit, unit,
            fgR, fgG, fgB
          );
        }
      }
    }
  }

  return pixels;
}

// ─── Generate files ─────────────────────────────────────────────────────────

// apple-touch-icon.png (180x180)
{
  const size = 180;
  const pixels = drawIcon(size);
  const png = encodePNG(pixels, size, size);
  fs.writeFileSync(path.join(PUBLIC, 'apple-touch-icon.png'), png);
  console.log(`✓  apple-touch-icon.png (${size}x${size}, ${png.length} bytes)`);
}

// favicon.ico (32x32 — stored as PNG for broad compat)
{
  const size = 32;
  const pixels = drawIcon(size);
  const png = encodePNG(pixels, size, size);
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), png);
  console.log(`✓  favicon.ico (${size}x${size} PNG-in-ICO, ${png.length} bytes)`);
}

console.log('✅  Icons generated.');
