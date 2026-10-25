import type { ReactNode } from 'react'

import snake from '@/shared/assets/img/benefits-snake.png'
import type { Locale } from '@/shared/config/locales'
import { SectionLabel } from '@/shared/ui/SectionLabel'

import { accentWord, marqueePhrase, sectionLabel } from '../model/copy'
import { Marquee } from './Marquee'

import styles from './Benefits.module.scss'

type Props = {
  locale: Locale
  title: string
  description: string
  benefits: string[]
}

const renderTitle = (title: string, accent: string): ReactNode => {
  const start = title.toLowerCase().indexOf(accent.toLowerCase())

  if (accent === '' || start === -1) {
    return title
  }

  const end = start + accent.length

  return (
    <>
      {title.slice(0, start)}
      <span className={styles.accent}>{title.slice(start, end)}</span>
      {title.slice(end)}
    </>
  )
}

export function Benefits({ locale, title, description, benefits }: Props) {
  return (
    <section className={styles.screen} aria-labelledby="benefits-title">
      <div className={styles.content}>
        <SectionLabel className={styles.label}>{sectionLabel[locale]}</SectionLabel>
        <div className={styles.copy}>
          <h2 id="benefits-title" className={styles.title}>
            {renderTitle(title, accentWord[locale])}
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
      <Marquee className={styles.marquee} phrase={marqueePhrase[locale]} />
    </section>
  )
}
