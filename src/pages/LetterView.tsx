import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Envelope from '../components/Envelope'
import PageShell from '../components/PageShell'
import { SparkleIcon } from '../components/icons'
import { letters } from '../data/content'

/**
 * 信件阅读页。
 * 进入后先播放开信动画（封盖翻开、信纸升起），
 * 然后信件内容淡入。
 */
export default function LetterView() {
  const { id } = useParams<{ id: string }>()
  const letter = letters.list.find((l) => l.id === id)

  const [opened, setOpened] = useState(false)

  // 等页面入场动画稳定后再开信
  useEffect(() => {
    const timer = window.setTimeout(() => setOpened(true), 400)
    return () => window.clearTimeout(timer)
  }, [])

  // 锁定信件或无效 id 时回到信件列表（放在 hooks 之后，保持 hooks 顺序稳定）
  if (!letter || letter.locked) return <Navigate to="/letters" replace />

  return (
    <PageShell backTo="/letters" className="letter-view">
      <div className="letter-stage">
        <Envelope opened={opened} />
      </div>

      <article className="letter-paper">
        <p className="letter-kicker">A LETTER FOR YOU</p>
        <h1 className="letter-title">{letter.title}</h1>
        {letter.date && <p className="letter-date">{letter.date}</p>}
        <div className="letter-rule">
          <SparkleIcon />
        </div>
        {letter.paragraphs?.map((paragraph, i) => (
          <p key={i} className="letter-para">
            {paragraph}
          </p>
        ))}
        {letter.signature && <p className="letter-signature">{letter.signature}</p>}
      </article>
    </PageShell>
  )
}
