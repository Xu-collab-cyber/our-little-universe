import { useMusic } from '../hooks/useMusic'
import { MusicIcon } from './icons'
import { cn } from '../utils/cn'

/**
 * 极小的音乐开关（右上角 ♪）。
 * 音乐默认不自动播放；点击开始 / 暂停。
 */
export default function MusicButton() {
  const { playing, toggle, notice } = useMusic()

  return (
    <>
      <button
        className={cn('music-btn', playing && 'is-playing')}
        onClick={toggle}
        aria-label={playing ? '暂停音乐' : '播放音乐'}
      >
        <MusicIcon />
      </button>
      {notice && <p className="music-notice" role="status">{notice}</p>}
    </>
  )
}
