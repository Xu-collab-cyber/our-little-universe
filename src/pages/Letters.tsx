import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import { ChevronRightIcon, EnvelopeIcon, LockIcon } from '../components/icons'
import { letters } from '../data/content'
import { cn } from '../utils/cn'

/**
 * Letters 信件收藏室。
 * 点击信封 → 打开信件；
 * 「给未来的你」被锁定，点击会轻轻摇头。
 */
export default function Letters() {
  const [shakingId, setShakingId] = useState<string | null>(null)

  const shake = (id: string) => {
    setShakingId(id)
    window.setTimeout(() => {
      setShakingId((current) => (current === id ? null : current))
    }, 500)
  }

  return (
    <PageShell kicker={letters.kicker} title={letters.title} backTo="/home">
      <Reveal y={12}>
        <p className="page-intro">{letters.intro}</p>
      </Reveal>

      <div className="letter-list">
        {letters.list.map((letter, i) => (
          <Reveal key={letter.id} delay={i * 80} y={16}>
            <div className={cn('letter-list-item', shakingId === letter.id && 'is-shaking')}>
              {letter.locked ? (
                <button
                  type="button"
                  className="letter-row is-locked"
                  onClick={() => shake(letter.id)}
                >
                  <LockIcon className="letter-row-icon" />
                  <span className="letter-row-body">
                    <span className="letter-row-title">{letter.title}</span>
                    <span className="letter-row-meta">
                      <span className="letter-row-tag">LOCKED</span>
                      <span>{letter.lockedNote}</span>
                      <span>{letter.unlockDate}</span>
                    </span>
                  </span>
                </button>
              ) : (
                <Link to={`/letters/${letter.id}`} className="letter-row">
                  <EnvelopeIcon className="letter-row-icon" />
                  <span className="letter-row-body">
                    <span className="letter-row-title">{letter.title}</span>
                    {letter.date && <span className="letter-row-date">{letter.date}</span>}
                  </span>
                  <ChevronRightIcon className="letter-row-chev" />
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
