import ArrowUp from '@/shared/assets/icons/arrow-top.svg?react'

import style from './ScrollTopButton.module.scss'

type Props = {
  onClick?: () => void
}

function ScrollTopButton({ onClick }: Props) {
  return (
    <button
      className={style.scrollButton}
      type="button"
      aria-label="scroll to top"
      onClick={onClick}
    >
      scroll to top <ArrowUp />
    </button>
  )
}

export default ScrollTopButton
