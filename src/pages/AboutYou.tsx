import PageShell from '../components/PageShell'
import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { about, photo } from '../data/content'

/**
 * About You 关于你。
 * 十件小事，卡片形式，轻微错落渐入。
 */
export default function AboutYou() {
  return (
    <PageShell title={about.title} subtitle={about.subtitle} backTo="/home" className="about-page">
      <div className="about-grid">
        {about.items.map((item, i) => (
          <Reveal key={item.no} delay={(i % 2) * 100} y={20}>
            <article className="about-card">
              <p className="about-card-no">{String(item.no).padStart(2, '0')}</p>
              <h2 className="about-card-title">{item.title}</h2>
              <Photo src={photo(item.photo)} alt={item.title} ratio="1 / 1" hint={'public/photos/' + item.photo} />
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  )
}
