import SocialLinks from '@/shared/ui/SocialLinks'

import style from './Footer.module.scss'

type Props = {
  onScrollTop?: () => void
}

function Footer({ onScrollTop }: Props) {
  return (
    <div className={style.footer}>
      <SocialLinks variant="text" />

      <button type="button" aria-label="scroll to top" onClick={onScrollTop}>
        scroll to top ↑
      </button>
    </div>
  )
}

export default Footer
