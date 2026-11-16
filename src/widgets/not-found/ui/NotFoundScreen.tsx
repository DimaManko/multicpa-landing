import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import snake from '@/shared/assets/img/404-snake.png'
import { getHomePath } from '@/shared/config/home-path'
import { Button } from '@/shared/ui/button'

import styles from './not-found-screen.module.scss'

export function NotFoundScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    if (location.key === 'default') {
      navigate(getHomePath(), { replace: true })
      return
    }

    navigate(-1)
  }

  return (
    <section className={styles.screen}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <img className={styles.snake} src={snake} alt="" draggable={false} />
        <div className={styles.action}>
          <Button onClick={handleBack}>{t('cta.takeMeBack')}</Button>
        </div>
      </div>
    </section>
  )
}
