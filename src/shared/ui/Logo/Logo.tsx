import LogoIcon from '@/shared/assets/icons/logo.svg?react'

import styles from './Logo.module.scss'

type Props = {
  className?: string
}

function Logo({ className }: Props) {
  const classNames = className ? `${styles.logo} ${className}` : styles.logo

  return <LogoIcon className={classNames} aria-hidden="true" />
}

export default Logo
