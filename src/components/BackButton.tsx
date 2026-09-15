import { Link } from 'react-router-dom'
import { ArrowBackIcon } from './icons'

interface BackButtonProps {
  to: string
  label?: string
}

/** 极简返回按钮 */
export default function BackButton({ to, label = 'BACK' }: BackButtonProps) {
  return (
    <Link to={to} className="back-btn" aria-label="返回">
      <ArrowBackIcon />
      <span>{label}</span>
    </Link>
  )
}
