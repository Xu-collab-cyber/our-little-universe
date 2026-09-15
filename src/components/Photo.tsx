import { useEffect, useState } from 'react'
import { SparkleIcon } from './icons'
import { cn } from '../utils/cn'

interface PhotoProps {
  /** 图片路径，例如 photo('story-01.jpg') */
  src: string
  alt: string
  /** 宽高比，例如 '4 / 3'、'1 / 1' */
  ratio?: string
  /** 占位时展示的提示（建议传期望的文件路径） */
  hint?: string
  className?: string
}

/**
 * 统一照片组件：
 *  - 图片存在 → 显示真实照片（柔和淡入）
 *  - 图片不存在 → 显示优雅的 PHOTO PLACEHOLDER，绝不出现破图
 *
 * 以后把照片放到 public/photos/ 下，无需改任何代码即可自动显示。
 */
export default function Photo({ src, alt, ratio = '4 / 3', hint, className }: PhotoProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setStatus('ready')
    }
    img.onerror = () => {
      if (!cancelled) setStatus('missing')
    }
    img.src = src
    return () => {
      cancelled = true
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return (
    <div className={cn('photo', className)} style={{ aspectRatio: ratio }}>
      {status === 'ready' ? (
        <img src={src} alt={alt} className="photo-img" loading="lazy" decoding="async" />
      ) : (
        <div className="photo-placeholder">
          <SparkleIcon className="photo-placeholder-star" />
          <span className="photo-placeholder-label">PHOTO PLACEHOLDER</span>
          {hint && <span className="photo-placeholder-hint">{hint}</span>}
        </div>
      )}
    </div>
  )
}
