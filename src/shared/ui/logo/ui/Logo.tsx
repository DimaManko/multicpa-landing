import { Link } from 'react-router'

import logo from '@/shared/assets/icons/logo.svg'
import { getHomePath } from '@/shared/config/home-path'

import styles from './logo.module.scss'

export function Logo() {
  return (
    <Link className={styles.link} to={getHomePath()} aria-label="Home">
      <img className={styles.image} src={logo} alt="" />
    </Link>
  )
}
