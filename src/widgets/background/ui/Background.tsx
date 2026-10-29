import type { ReactNode } from 'react'

import styles from './background.module.scss'

interface BackgroundProps {
  children: ReactNode
  isDimmed?: boolean
}

export function Background({ children, isDimmed = false }: BackgroundProps) {
  return (
    <div className={styles.screen} data-dimmed={isDimmed}>
      <div className={styles.grid} aria-hidden="true">
        <div className={styles.glow} />
      </div>
      {children}
    </div>
  )
}
