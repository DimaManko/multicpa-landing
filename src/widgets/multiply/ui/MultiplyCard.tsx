import type { Multiply } from '@/shared/api'
import ArrowDown from '@/shared/assets/icons/arrow-down.svg?react'
import { Button } from '@/shared/ui/button'

import styles from './MultiplyCard.module.scss'

type Props = {
  id: string
  labelledBy: string
  ctaLabel: string
  onCtaClick?: () => void
  steps: Multiply[number]['steps']
}

function MultiplyCard({ id, labelledBy, ctaLabel, onCtaClick, steps }: Props) {
  return (
    <div className={styles.card} id={id} role="tabpanel" aria-labelledby={labelledBy}>
      {Object.entries(steps).map(([key, value]) => (
        <div key={key} className={styles.stepWrapper}>
          <p className={styles.stepText}>{value}</p>
          <ArrowDown className={styles.stepArrow} />
        </div>
      ))}
      <Button className={styles.cta} onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    </div>
  )
}

export default MultiplyCard
