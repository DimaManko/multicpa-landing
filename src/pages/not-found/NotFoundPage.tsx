import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Background } from '@/widgets/background'
import { NotFoundScreen } from '@/widgets/not-found'
import { getHomePath } from '@/shared/config/home-path'
import { Logo } from '@/shared/ui/logo'

import styles from './not-found-page.module.scss'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <Background>
        <div className={styles.stack}>
          <NotFoundScreen />
          <div className={styles.content}>
            <Link to={getHomePath()} aria-label={t('header.home')} className={styles.logoLink}>
              <Logo className={styles.logo}/>
            </Link>
          </div>
        </div>
      </Background>
    </main>
  )
}

export default NotFoundPage
