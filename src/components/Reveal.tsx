import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import { cn } from '../utils/cn'

interface RevealProps {
  children: ReactNode
  /** 延迟（毫秒），用于卡片错落出现 */
  delay?: number
  /** 初始向下偏移的像素数 */
  y?: number
  className?: string
}

/**
 * 滚动渐入包装器：元素进入视口后淡入 + 上移。
 * 只用 opacity / transform，保证 Android 上流畅。
 */
export default function Reveal({ children, delay = 0, y = 18, className }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-delay': `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
