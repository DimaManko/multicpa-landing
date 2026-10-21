import { Background } from '@/widgets/background'
import { NotFoundScreen } from '@/widgets/not-found'
import { Logo } from '@/shared/ui/logo'

import styles from './not-found-page.module.scss'

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.layer}>
        <Background />
      </div>
      <div className={styles.layer}>
        <NotFoundScreen />
      </div>
      <div className={styles.content}>
        <Logo />
      </div>
    </main>
  )
}

export default NotFoundPage
