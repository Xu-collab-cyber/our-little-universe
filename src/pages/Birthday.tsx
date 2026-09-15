import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import MusicButton from '../components/MusicButton'
import Photo from '../components/Photo'
import StarField from '../components/StarField'
import { SparkleIcon } from '../components/icons'
import { birthday, photo } from '../data/content'

/**
 * 生日彩蛋（主页底部那颗小星星）。
 * 黑屏 → 一段一段播放，轻触屏幕可以加快。
 * 所有文字都来自 content.ts 的 birthday 配置。
 */

/** 每种类型片段的自动停留时长（毫秒） */
const STAGE_DURATION: Record<string, number> = {
  text: 2800,
  title: 3600,
  photo: 4600,
  lines: 5600,
}

export default function Birthday() {
  const sequence = birthday.sequence
  const [stage, setStage] = useState(0)
  const done = stage >= sequence.length

  // 每段自动前进；轻触屏幕也会前进（stage 变化会重置计时器）
  useEffect(() => {
    if (done) return
    const duration = STAGE_DURATION[sequence[stage].type] ?? 3000
    const timer = window.setTimeout(() => setStage((s) => s + 1), duration)
    return () => window.clearTimeout(timer)
  }, [stage, done, sequence])

  const next = () => {
    if (!done) setStage((s) => s + 1)
  }

  const current = sequence[Math.min(stage, sequence.length - 1)]

  return (
    <div className="birthday" onClick={next}>
      <StarField density={0.8} />
      <div className="topbar">
        <BackButton to="/home" />
        <MusicButton />
      </div>

      {/* 当前片段（key 变化时重新播放入场动画） */}
      <div className="birthday-stage" key={stage}>
        {current.type === 'text' && <p className="birthday-text">{current.text}</p>}
        {current.type === 'title' && <h1 className="birthday-title">{current.text}</h1>}
        {current.type === 'photo' && (
          <Photo
            src={photo(current.src)}
            alt={current.alt}
            ratio="4 / 5"
            className="birthday-photo"
            hint={'public/photos/' + current.src}
          />
        )}
        {current.type === 'lines' && (
          <div className="birthday-lines">
            {current.lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>

      {!done && <p className="birthday-hint">轻触任意处继续</p>}

      {done && (
        <div className="birthday-ending">
          <SparkleIcon />
          <div className="birthday-ending-links">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setStage(0)
              }}
            >
              再看一遍
            </button>
            <Link to="/home" onClick={(e) => e.stopPropagation()}>
              返回
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
