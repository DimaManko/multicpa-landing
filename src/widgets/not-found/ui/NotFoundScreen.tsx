import { useNavigate } from 'react-router'

import snake from '@/shared/assets/img/404-snake.png'
import { getHomePath } from '@/shared/config/home-path'

import styles from './not-found-screen.module.scss'

function getHistoryIndex(state: unknown): number | null {
  if (typeof state !== 'object' || state === null || !('idx' in state)) {
    return null
  }

  const index = state.idx

  return typeof index === 'number' ? index : null
}

export function NotFoundScreen() {
  const navigate = useNavigate()

  const handleBack = () => {
    const historyIndex = getHistoryIndex(window.history.state)

    if (historyIndex === null || historyIndex === 0) {
      navigate(getHomePath(), { replace: true })
      return
    }

    navigate(-1)
  }

  return (
    <section className={styles.screen}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <img className={styles.snake} src={snake} alt="Snake" draggable={false} />
        <button className={styles.button} type="button" onClick={handleBack}>
          Oops, take me back
        </button>
      </div>
    </section>
  )
}
