import { ScrollTopButton } from '@/shared/ui/scroll-top-button'
import { SocialLinks } from '@/shared/ui/social-links'

import style from './Footer.module.scss'

type Props = {
  onScrollTop?: () => void
}

function Footer({ onScrollTop }: Props) {
  return (
    <footer className={style.footer}>
      <SocialLinks variant="text" className={style.textLinks} />

      <ScrollTopButton onClick={onScrollTop} />
    </footer>
  )
}

export default Footer
