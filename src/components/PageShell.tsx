import type { ReactNode } from 'react'
import BackButton from './BackButton'
import { cn } from '../utils/cn'

interface PageShellProps {
  /** 主标题（不传则不渲染页头，适合完全自定义版式的页面） */
  title?: string
  /** 副标题（可选） */
  subtitle?: string
  /** 标题上方的小字标签（可选），如 'OUR STORY' */
  kicker?: string
  /** 返回目标，不传则不显示返回按钮 */
  backTo?: string
  className?: string
  children: ReactNode
}

/**
 * 页面外壳：统一的顶栏（返回）、页头排版与安全区留白。
 * 页面切换动画由 .page 类统一处理。
 * 音乐按钮不在这里：它挂在 App 层，保证切换页面时音乐连续。
 */
export default function PageShell({ title, subtitle, kicker, backTo, className, children }: PageShellProps) {
  return (
    <div className={cn('page', 'page-inner', className)}>
      <div className="topbar">
        {backTo ? <BackButton to={backTo} /> : <span />}
      </div>
      {title && (
        <header className="page-head">
          {kicker && <p className="page-kicker">{kicker}</p>}
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="page-body">{children}</div>
    </div>
  )
}
