import { useEffect, useRef } from 'react'

/**
 * 星空粒子背景（Canvas 实现，Android 上也很流畅）。
 *
 * 两种模式：
 *  - 常态：星星缓慢漂移 + 轻微闪烁
 *  - 聚集：星星向屏幕中心聚拢（Opening 点击「进入」时触发）
 *
 * 性能注意：
 *  - 单个 canvas + requestAnimationFrame，仅用 arc 绘制
 *  - 页面不可见时自动暂停
 *  - 用户偏好减少动态效果时降低运动幅度
 */

interface Star {
  x: number // 基础位置（px）
  y: number
  driftAmp: number // 漂移幅度
  driftSpeed: number
  phase: number
  size: number
  twinkle: number // 闪烁速度
  alpha: number // 基础透明度
  warm: boolean // 少数暖色星星
}

interface StarFieldProps {
  /** 星星密度，1 为默认 */
  density?: number
  /** 是否向屏幕中心聚集 */
  gather?: boolean
  /** 聚集动画时长（毫秒） */
  gatherDuration?: number
  /** 聚集完成回调 */
  onGatherComplete?: () => void
  className?: string
}

export default function StarField({
  density = 1,
  gather = false,
  gatherDuration = 1700,
  onGatherComplete,
  className,
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const gatherStartRef = useRef<number | null>(null)
  const gatherDoneRef = useRef(false)
  // 用 ref 保持最新 props，避免重建动画循环
  const gatherRef = useRef(gather)
  const onCompleteRef = useRef(onGatherComplete)
  gatherRef.current = gather
  onCompleteRef.current = onGatherComplete

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let reduced = false

    const makeStars = () => {
      const count = Math.min(220, Math.max(8, Math.round(((w * h) / 9000) * density)))
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        const big = Math.random() < 0.08
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          driftAmp: (reduced ? 0.3 : 1) * (3 + Math.random() * 14),
          driftSpeed: 0.00004 + Math.random() * 0.00012,
          phase: Math.random() * Math.PI * 2,
          size: big ? 1.4 + Math.random() * 0.9 : 0.5 + Math.random() * 0.9,
          twinkle: 0.0003 + Math.random() * 0.0009,
          alpha: big ? 0.75 : 0.25 + Math.random() * 0.55,
          warm: Math.random() < 0.12,
        })
      }
      starsRef.current = stars
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      makeStars()
    }

    const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter' // 叠加发光
      const gathering = gatherRef.current
      const cx = w / 2
      const cy = h / 2

      if (gathering && gatherStartRef.current === null) gatherStartRef.current = t

      for (const s of starsRef.current) {
        let x = s.x + Math.sin(t * s.driftSpeed + s.phase) * s.driftAmp
        let y = s.y + Math.cos(t * s.driftSpeed * 0.8 + s.phase * 1.7) * s.driftAmp
        let alpha = s.alpha * (0.62 + 0.38 * Math.sin(t * s.twinkle + s.phase))

        if (gathering && gatherStartRef.current !== null) {
          const p = Math.min(1, (t - gatherStartRef.current) / gatherDuration)
          const e = easeInOut(p)
          x += (cx - x) * e
          y += (cy - y) * e
          if (p > 0.6) alpha *= 1 + (p - 0.6) * 1.2 // 聚拢时变亮
        }

        const color = s.warm ? '242, 230, 205' : '226, 231, 255'
        ctx.fillStyle = `rgba(${color}, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fill()

        // 大一点的星星带一圈微弱光晕
        if (s.size > 1.2) {
          ctx.fillStyle = `rgba(${color}, ${alpha * 0.12})`
          ctx.beginPath()
          ctx.arc(x, y, s.size * 4.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 聚集完成，通知一次
      if (gathering && gatherStartRef.current !== null && !gatherDoneRef.current) {
        if ((t - gatherStartRef.current) / gatherDuration >= 1) {
          gatherDoneRef.current = true
          onCompleteRef.current?.()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(draw)
    }

    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density, gatherDuration])

  return <canvas ref={canvasRef} className={className ? `starfield ${className}` : 'starfield'} aria-hidden="true" />
}
