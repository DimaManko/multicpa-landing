import type { Multiply } from '@/shared/api'
import arrowDown from '@/shared/assets/icons/arrow-down.svg'
import { Button } from '@/shared/ui/button'

import styles from './MultiplyCard.module.scss'

type Props = {
  ctaLabel: string
  onCtaClick?: () => void
  steps: Multiply[number]['steps']
}

function MultiplyCard({ ctaLabel, onCtaClick, steps }: Props) {
  return (
    <div className={styles.card} role="tabpanel">
      {Object.entries(steps).map(([key, value]) => (
        <div key={key} className={styles.stepWrapper}>
          <p className={styles.stepText}>{value}</p>
          <img className={styles.stepArrow} src={arrowDown} alt="" />
        </div>
      ))}
      <Button className={styles.cta} onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    </div>
  )
}

export default MultiplyCard
