import { Background } from '@/widgets/background'
import { NotFoundScreen } from '@/widgets/not-found'
import { Logo } from '@/shared/ui/logo'

import styles from './not-found-page.module.scss'

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <Background>
        <div className={styles.stack}>
          <NotFoundScreen />
          <div className={styles.content}>
            <Logo />
          </div>
        </div>
      </Background>
    </main>
  )
}

export default NotFoundPage
