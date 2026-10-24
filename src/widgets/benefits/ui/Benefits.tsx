import type { ReactNode } from 'react'

import snake from '@/shared/assets/img/benefits-snake.png'
import { SectionLabel } from '@/shared/ui/SectionLabel'

import { Marquee } from './Marquee'

import styles from './Benefits.module.scss'

const ACCENT_WORD = 'guaranteed'
const SECTION_LABEL = 'Multi-benefits'

type Props = {
  title: string
  description: string
  benefits: string[]
}

const renderTitle = (title: string): ReactNode => {
  const start = title.toLowerCase().indexOf(ACCENT_WORD)

  if (start === -1) {
    return title
  }

  const end = start + ACCENT_WORD.length

  return (
    <>
      {title.slice(0, start)}
      <span className={styles.accent}>{title.slice(start, end)}</span>
      {title.slice(end)}
    </>
  )
}

export function Benefits({ title, description, benefits }: Props) {
  return (
    <section className={styles.screen} aria-labelledby="benefits-title">
      <div className={styles.content}>
        <SectionLabel className={styles.label}>{SECTION_LABEL}</SectionLabel>
        <div className={styles.copy}>
          <h2 id="benefits-title" className={styles.title}>
            {renderTitle(title)}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>
        <img className={styles.snake} src={snake} alt="" aria-hidden="true" draggable={false} />
        <ul className={styles.cards}>
          {benefits.map((benefit) => (
            <li className={styles.card} key={benefit}>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <Marquee className={styles.marquee} />
    </section>
  )
}
