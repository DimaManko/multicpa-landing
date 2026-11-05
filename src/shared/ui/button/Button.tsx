import type { ReactNode } from 'react'

import styles from './Button.module.scss'

type Props = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const Button = ({ children, onClick, type = 'button', disabled = false, className }: Props) => {
  return (
    <button
      className={className ? `${styles.button} ${className}` : styles.button}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className={styles.face}>
        <span className={styles.label}>{children}</span>
      </span>
    </button>
  )
}

export default Button
