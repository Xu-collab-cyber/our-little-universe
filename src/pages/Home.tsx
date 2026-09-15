import { Link } from 'react-router-dom'
import MusicButton from '../components/MusicButton'
import Reveal from '../components/Reveal'
import { ChevronRightIcon, SparkleIcon } from '../components/icons'
import { home } from '../data/content'

/**
 * 主页：标题 + 欢迎语 + 四个入口。
 * 底部有一颗极小极小的星星 —— 隐藏的生日彩蛋入口。
 */
export default function Home() {
  return (
    <div className="home">
      <div className="topbar">
        <span />
        <MusicButton />
      </div>

      <div className="home-inner">
        <SparkleIcon className="home-sparkle" />
        <h1 className="home-title">{home.title}</h1>
        <p className="home-welcome">{home.welcome}</p>

        <nav className="home-nav">
          {home.entries.map((entry, i) => (
            <Reveal key={entry.path} delay={i * 130} y={14}>
              <Link to={entry.path} className="home-entry">
                <span className="home-entry-label">{entry.label}</span>
                <span className="home-entry-sub">{entry.subtitle}</span>
                <ChevronRightIcon className="home-entry-chev" />
              </Link>
            </Reveal>
          ))}
        </nav>
      </div>

      {/* 隐藏的生日彩蛋入口 */}
      <Link to="/birthday" className="home-egg" aria-label="生日彩蛋">
        <SparkleIcon />
      </Link>
    </div>
  )
}
