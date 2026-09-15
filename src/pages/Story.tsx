import PageShell from '../components/PageShell'
import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { photo, story } from '../data/content'
import { cn } from '../utils/cn'

/**
 * Our Story 我们的故事。
 * 纵向时间线 + 照片 + 文字；
 * 时间线最后不结束，延伸到 FUTURE。
 */
export default function Story() {
  return (
    <PageShell kicker={story.kicker} title={story.title} backTo="/home">
      <div className="timeline">
        {story.items.map((item) => (
          <Reveal
            key={item.date}
            delay={80}
            y={22}
            className={cn('timeline-item', item.highlight && 'is-highlight')}
          >
            <p className="timeline-date">{item.date}</p>
            <h2 className="timeline-title">{item.title}</h2>
            <Photo src={photo(item.photo)} alt={item.title} ratio="4 / 3" hint={photo(item.photo)} />
            <p className="timeline-text">{item.text}</p>
            {item.note && <p className="timeline-note">{item.note}</p>}
          </Reveal>
        ))}

        {/* 故事还在继续 */}
        <Reveal className="timeline-future" delay={120} y={22}>
          <p className="timeline-future-label">{story.futureSection.label}</p>
          <p className="timeline-future-line">{story.futureSection.line1}</p>
          <p className="timeline-future-line">{story.futureSection.line2}</p>
        </Reveal>
      </div>
    </PageShell>
  )
}
