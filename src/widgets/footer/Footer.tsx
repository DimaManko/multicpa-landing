import { ScrollTopButton } from '@/shared/ui/ScrollTopButton'
import { SocialLinks } from '@/shared/ui/social-link'

import style from './Footer.module.scss'

type Props = {
  onScrollTop?: () => void
}

function Footer({ onScrollTop }: Props) {
  return (
    <div className={style.footer}>
      <SocialLinks variant="text" />

      <ScrollTopButton onClick={onScrollTop} />
    </div>
  )
}

export default Footer
