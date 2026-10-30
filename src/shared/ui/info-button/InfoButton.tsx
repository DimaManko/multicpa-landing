import type { ReactNode } from 'react'

import styles from './InfoButton.module.scss'

type Props = {
  children: ReactNode
  isActive?: boolean
  disabled?: boolean
  onClick: () => void
}

const InfoButton = ({ children, isActive = false, disabled = false, onClick }: Props) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      type="button"
      aria-pressed={isActive}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>

      <svg
        className={styles.arrow}
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 10H38M30 2L38 10L30 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default InfoButton
