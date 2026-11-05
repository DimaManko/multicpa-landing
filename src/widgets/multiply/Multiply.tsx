import type { KeyboardEvent, ReactNode, Ref } from 'react'
import { useId, useState } from 'react'

import type { Multiply as MultiplyData } from '@/shared/api'
import snake from '@/shared/assets/img/multiply-snake.png'
import { InfoButton } from '@/shared/ui/info-button'
import { SectionLabel } from '@/shared/ui/SectionLabel'

import MultiplyCard from './ui/MultiplyCard'

import styles from './Multiply.module.scss'

type Props = {
  items: MultiplyData
  onCtaClick?: () => void
  footer?: ReactNode
  ref?: Ref<HTMLElement>
}

const CTA_LABELS = ['Join the team', 'Partner up', 'Launch now']

const getNextTabIndex = (key: string, current: number, last: number) => {
  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
      return current === last ? 0 : current + 1
    case 'ArrowUp':
    case 'ArrowLeft':
      return current === 0 ? last : current - 1
    case 'Home':
      return 0
    case 'End':
      return last
    default:
      return null
  }
}

function Multiply({ items, onCtaClick, footer, ref }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const baseId = useId()
  const panelId = `${baseId}-panel`
  const getTabId = (index: number) => `${baseId}-tab-${index}`

  const handleTabsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const nextIndex = getNextTabIndex(event.key, activeIndex, items.length - 1)

    if (nextIndex === null) return

    event.preventDefault()
    setActiveIndex(nextIndex)
    document.getElementById(getTabId(nextIndex))?.focus()
  }
  const active = items[activeIndex]

  return (
    <section ref={ref} className={styles.screen} id="multiply">
      <div className={styles.container}>
        <SectionLabel className={styles.title}>Multiply with us</SectionLabel>
        <div className={styles.content}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Multiply with us"
            aria-orientation="vertical"
            onKeyDown={handleTabsKeyDown}
          >
            {items.map(({ title }, index) => {
              const transformedTitle = title
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())

              return (
                <InfoButton
                  key={title}
                  id={getTabId(index)}
                  controls={panelId}
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
                id={panelId}
                labelledBy={getTabId(activeIndex)}
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
