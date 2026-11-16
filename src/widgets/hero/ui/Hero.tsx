import type { ReactNode } from 'react'

import snake from '@/shared/assets/img/hero-snake.png'

import styles from './Hero.module.scss'

type HeroProps = {
  header: ReactNode
  action?: ReactNode
  socials?: ReactNode
}

export function Hero({ header, action, socials }: HeroProps) {
  return (
    <section className={styles.screen} aria-labelledby="hero-title">
      {header}

      <div className={styles.content}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            Practice
            <br />
            Makes <span className={styles.accent}>Profit</span>
          </h1>

          <p className={styles.description}>
            We provide effective solutions, tested and refined on our own products
            and ad budgets
          </p>

          {action}
        </div>

        <img className={styles.image} src={snake} alt="" />
      </div>

      {socials && <div className={styles.socials}>{socials}</div>}
    </section>
  )
}