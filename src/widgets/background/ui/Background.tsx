import { type ReactNode, useRef } from 'react'

import { useGlowSweep } from '../model/useGlowSweep'

import styles from './background.module.scss'

interface BackgroundProps {
  children: ReactNode
  isDimmed?: boolean
}

export function Background({ children, isDimmed = false }: BackgroundProps) {
  const glowRef = useRef<HTMLDivElement>(null)

  useGlowSweep(glowRef)

  return (
    <div className={styles.screen} data-dimmed={isDimmed}>
      <div className={styles.grid} aria-hidden="true">
        <div ref={glowRef} className={styles.glow} />
      </div>
      {children}
    </div>
  )
}
