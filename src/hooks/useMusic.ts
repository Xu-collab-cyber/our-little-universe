import { useEffect, useRef, useState } from 'react'
import { music } from '../data/content'

/**
 * 背景音乐系统（预留）。
 * 设计原则：
 *  - 不自动播放（手机浏览器会阻止自动播放）
 *  - 由用户点击 ♪ 按钮开始 / 暂停
 *  - 音乐文件不存在或未启用时，给出优雅提示
 */
export function useMusic() {
  const [playing, setPlaying] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<number | null>(null)

  const showNotice = (text: string) => {
    setNotice(text)
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setNotice(null), 2600)
  }

  const toggle = () => {
    if (!music.enabled) {
      showNotice('音乐还未加入 · 以后在 content.ts 里开启')
      return
    }

    let audio = audioRef.current
    if (!audio) {
      audio = new Audio(music.src)
      audio.loop = music.loop
      audio.volume = music.volume
      audioRef.current = audio
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => showNotice('音乐加载失败 · 请检查 public/music/'))
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  // 离开页面时停止播放，避免后台继续响
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  return { playing, toggle, notice }
}
