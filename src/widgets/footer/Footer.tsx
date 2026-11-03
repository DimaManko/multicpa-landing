import { ScrollTopButton } from '@/shared/ui/ScrollTopButton'
import { SocialLinks } from '@/shared/ui/social-link'

import style from './Footer.module.scss'

type Props = {
  onScrollTop?: () => void
}

function Footer({ onScrollTop }: Props) {
  return (
    <footer className={style.footer}>
      <SocialLinks variant="text" className={style.textLinks} />
      <SocialLinks variant="icons" className={style.iconLinks} />

      <ScrollTopButton onClick={onScrollTop} />
    </footer>
  )
}

export default Footer
