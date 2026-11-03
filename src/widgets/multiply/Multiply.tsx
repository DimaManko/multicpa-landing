import type { ReactNode, Ref } from 'react'
import { useState } from 'react'

import type { Multiply as MultiplyData } from '@/shared/api'
import snake from '@/shared/assets/img/multiply-snake.png'
import { InfoButton } from '@/shared/ui/info-button'

import MultiplyCard from './ui/MultiplyCard'

import styles from './Multiply.module.scss'

// type MultiplyItem = Multiply[number]

type Props = {
  items: MultiplyData
  onCtaClick?: () => void
  footer?: ReactNode
  ref?: Ref<HTMLElement>
}

const CTA_LABELS = ['Join the team', 'Partner up', 'Launch now']

function Multiply({ items, onCtaClick, footer, ref }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

  return (
    <section ref={ref} className={styles.screen} id="multiply">
      <div className={styles.container}>
        <h2 className={styles.title}>Multiply with us</h2>
        <div className={styles.content}>
          <div className={styles.tabs} role="tablist">
            {items.map(({ title }, index) => {
              const transformedTitle = title
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())

              return (
                <InfoButton
                  key={title}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  {transformedTitle}
                </InfoButton>
              )
            })}
          </div>
          <div className={styles.aside}>
            {active && (
              <MultiplyCard
                steps={active.steps}
                ctaLabel={CTA_LABELS[activeIndex]}
                onCtaClick={onCtaClick}
              />
            )}
            {footer}
          </div>
        </div>
        <div className={styles.snake}>
          <img src={snake} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Multiply
