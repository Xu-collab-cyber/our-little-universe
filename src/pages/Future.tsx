import PageShell from '../components/PageShell'
import Reveal from '../components/Reveal'
import { future } from '../data/content'
import { cn } from '../utils/cn'

/**
 * Our Future 我们的未来。
 * 居中的时间线：现在（金色实心点）→ 等待故事的每一年。
 */
export default function Future() {
  return (
    <PageShell kicker={future.kicker} title={future.title} backTo="/home" className="future-page">
      <div className="future-timeline">
        {future.milestones.map((milestone, i) => (
          <Reveal
            key={milestone.year}
            delay={i * 130}
            y={18}
            className={cn('future-item', milestone.status === 'now' && 'is-now')}
          >
            <p className="future-year">{milestone.year}</p>
            <p className="future-label">{milestone.label}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="future-note" delay={220} y={16}>
        {future.note.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </Reveal>
    </PageShell>
  )
}
