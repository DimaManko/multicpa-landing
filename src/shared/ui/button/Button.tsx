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
      {/* {children} */}
      <span className={styles.face}> {children} </span>
    </button>
  )
}

export default Button
