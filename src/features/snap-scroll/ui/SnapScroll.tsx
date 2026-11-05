import type { Ref } from 'react'
import { useImperativeHandle } from 'react'

import type { SnapScrollHandle, SnapSection } from '../model/types'
import { useSnapScroll } from '../model/useSnapScroll'

import styles from './SnapScroll.module.scss'

type Props = {
  sections: SnapSection[]
  onActiveChange?: (index: number) => void
  ref?: Ref<SnapScrollHandle>
}

export function SnapScroll({ sections, onActiveChange, ref }: Props) {
  const { rootRef, activeIndex, isEnabled, goTo } = useSnapScroll(sections, onActiveChange)

  useImperativeHandle(ref, () => ({ goTo }), [goTo])

  return (
    <div ref={rootRef} className={styles.root}>
      {sections.map(({ id, content }, index) => (
        <div
          key={id}
          className={styles.section}
          data-snap-section=""
          inert={isEnabled && index !== activeIndex}
        >
          {content}
        </div>
      ))}
    </div>
  )
}
