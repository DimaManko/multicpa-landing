import type { ReactNode } from 'react'

import styles from './SectionLabel.module.scss'

type Props = {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: Props) {
  const labelClassName = className ? `${styles.label} ${className}` : styles.label

  return <p className={labelClassName}>{children}</p>
}
