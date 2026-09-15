/**
 * 生成 PWA 图标（纯 Node 实现，零依赖）
 * 用法：npm run icons
 * 生成深空底色 + 金色四芒星的占位图标，以后可以换成你们自己的图标。
 */
import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

/* ---------------- PNG 编码 ---------------- */
const CRC_TABLE = new Int32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  CRC_TABLE[n] = c
}

function crc32(buf) {
  let c = -1
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4)
  out.writeUInt32BE(data.length, 0)
  out.write(type, 4, 'ascii')
  data.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}

function encodePng(size, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type: RGBA
  const stride = size * 4 + 1
  const raw = Buffer.alloc(stride * size)
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0 // filter: none
    rgba.copy(raw, y * stride + 1, y * size * 4, (y + 1) * size * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

/* ---------------- 绘制 ---------------- */
function mulberry32(seed) {
  let t = seed
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), t | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function render(size, { motifScale = 1 } = {}) {
  const buf = Buffer.alloc(size * size * 4)
  const rand = mulberry32(20260915)
  const cx = size * 0.5
  const cy = size * 0.47

  // 深空渐变背景
  for (let y = 0; y < size; y++) {
    const t = y / size
    const r = 4 + t * 5
    const g = 5 + t * 5
    const b = 15 + t * 12
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      buf[i] = r
      buf[i + 1] = g
      buf[i + 2] = b
      buf[i + 3] = 255
    }
  }

  // 柔和光点叠加
  const addGlow = (px, py, radius, intensity, [cr, cg, cb]) => {
    const x0 = Math.max(0, Math.floor(px - radius))
    const x1 = Math.min(size - 1, Math.ceil(px + radius))
    const y0 = Math.max(0, Math.floor(py - radius))
    const y1 = Math.min(size - 1, Math.ceil(py + radius))
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const d = Math.hypot(x - px, y - py)
        if (d > radius) continue
        const f = Math.max(0, 1 - d / radius) * intensity
        const i = (y * size + x) * 4
        buf[i] = Math.min(255, buf[i] + cr * f)
        buf[i + 1] = Math.min(255, buf[i + 1] + cg * f)
        buf[i + 2] = Math.min(255, buf[i + 2] + cb * f)
      }
    }
  }

  // 背景小星星
  for (let s = 0; s < Math.round(size / 12); s++) {
    const px = rand() * size
    const py = rand() * size
    addGlow(px, py, 1 + rand() * 2.5, 0.5 + rand() * 0.5, [232, 234, 255])
  }

  // 四芒星 + 光晕
  const sparkle = (px, py, scale) => {
    const glowR = size * 0.3 * scale
    addGlow(px, py, glowR, 0.35, [196, 178, 132]) // 金色光晕
    addGlow(px, py, glowR * 0.45, 0.5, [226, 220, 255]) // 内层冷光
    const rx = size * 0.185 * scale
    const ry = size * 0.062 * scale
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = Math.abs(x - px)
        const dy = Math.abs(y - py)
        const k1 = dx / rx + dy / ry
        const k2 = dx / ry + dy / rx
        const v = Math.min(k1, k2)
        if (v >= 2.2) continue
        const core = Math.exp(-v * v * 1.15)
        const i = (y * size + x) * 4
        const warm = core * 0.35
        buf[i] = Math.min(255, buf[i] + 250 * core)
        buf[i + 1] = Math.min(255, buf[i + 1] + (238 - warm * 40) * core)
        buf[i + 2] = Math.min(255, buf[i + 2] + (214 - warm * 80) * core)
      }
    }
  }

  sparkle(cx, cy, motifScale)
  sparkle(size * 0.72, size * 0.72, motifScale * 0.22)

  return encodePng(size, buf)
}

/* ---------------- 输出 ---------------- */
const targets = [
  ['icon-192.png', 192, 1],
  ['icon-512.png', 512, 1],
  ['icon-maskable-512.png', 512, 0.78], // maskable：内容更居中，避免被系统裁切
  ['apple-touch-icon.png', 180, 1],
]

for (const [name, size, scale] of targets) {
  writeFileSync(join(outDir, name), render(size, { motifScale: scale }))
  console.log(`ok public/icons/${name} (${size}x${size})`)
}
