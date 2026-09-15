import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StarField from '../components/StarField'
import { SparkleIcon } from '../components/icons'
import { opening } from '../data/content'
import { cn } from '../utils/cn'

/**
 * Opening 开场页。
 * 黑色背景 + 缓慢漂移的星星；
 * 点击「进入」后，星星逐渐向屏幕中心聚集，然后进入主页。
 */
export default function Opening() {
  const navigate = useNavigate()
  const [entering, setEntering] = useState(false)

  const handleEnter = () => {
    if (entering) return
    setEntering(true)
  }

  return (
    <div className={cn('opening', entering && 'is-entering')}>
      <StarField
        density={1.3}
        gather={entering}
        gatherDuration={1700}
        onGatherComplete={() => navigate('/home', { replace: true })}
      />
      <div className="opening-inner">
        <SparkleIcon className="opening-sparkle" />
        <h1 className="opening-title">{opening.title}</h1>
        <p className="opening-subtitle">{opening.subtitle}</p>
        <button className="btn-enter" onClick={handleEnter}>
          {opening.enterButton}
        </button>
      </div>
    </div>
  )
}
