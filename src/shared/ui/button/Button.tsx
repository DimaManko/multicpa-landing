import type { ReactNode } from 'react'

import styles from './Button.module.scss'

type Props = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const Button = ({ children, onClick, type = 'button', disabled = false }: Props) => {
  return (
    <button className={styles.button} onClick={onClick} type={type} disabled={disabled}>
      <span className={styles.face}>
        <span className={styles.label}>{children}</span>
      </span>
    </button>
  )
}

export default Button
