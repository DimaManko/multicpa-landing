import { Link } from 'react-router'

import LogoIcon from '@/shared/assets/icons/logo.svg?react'
import { getHomePath } from '@/shared/config/home-path'

import styles from './Logo.module.scss'

function Logo() {
  return (
    <Link className={styles.link} to={getHomePath()} aria-label="Home">
      <LogoIcon className={styles.image} aria-hidden="true" />
    </Link>
  )
}

export default Logo
