import { useEffect } from 'react'

import logo from '@/shared/assets/icons/logo.svg'

import { useProgress } from '../model/useProgress'

import styles from './Preloader.module.scss'

type Props = {
  isLoading: boolean
  onFinish: () => void
}

export function Preloader({ isLoading, onFinish }: Props) {
  const { progress, isFinished } = useProgress(isLoading)

  useEffect(() => {
    if (isFinished) {
      onFinish()
    }
  }, [isFinished, onFinish])

  if (isFinished) {
    return null
  }

  const percent = Math.round(progress)

  return (
    <div className={styles.preloader}>
      <img className={styles.logo} src={logo} alt="" />
      <span className={styles.percent}>{percent}%</span>
      <progress className={styles.bar} max={100} value={percent} />
    </div>
  )
}
