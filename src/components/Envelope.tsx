import { cn } from '../utils/cn'

interface EnvelopeProps {
  /** true 时播放开信动画：封盖翻开，信纸升起 */
  opened?: boolean
  className?: string
}

/**
 * 信封（SVG 绘制）。
 * 打开动画全部由 CSS transform 完成，性能友好。
 */
export default function Envelope({ opened = false, className }: EnvelopeProps) {
  return (
    <svg
      viewBox="0 0 300 200"
      className={cn('envelope', opened && 'is-open', className)}
      aria-hidden="true"
    >
      {/* 信封主体 */}
      <rect x="1.5" y="1.5" width="297" height="197" rx="12" className="env-body" />
      {/* 信纸 */}
      <g className="env-letter">
        <rect x="30" y="30" width="240" height="160" rx="8" />
        <path
          className="env-seal"
          d="M150 96 L157 89 L163 95 L150 108 L137 95 L143 89 Z"
        />
      </g>
      {/* 封盖（后绘制，盖在信纸上） */}
      <g className="env-flap">
        <path d="M1.5 2 H298.5 L150 116 Z" />
      </g>
    </svg>
  )
}
