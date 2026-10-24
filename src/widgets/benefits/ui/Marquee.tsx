import logo from '@/shared/assets/icons/logo.svg'

import styles from './Marquee.module.scss'

const PHRASE = 'DREAM BIG EARN BIGGER!'
const PHRASE_IDS = ['first', 'second'] as const

type Props = {
  className?: string
}

type GroupProps = {
  isHidden?: boolean
}

function PhraseGroup({ isHidden = false }: GroupProps) {
  return (
    <div className={styles.group} aria-hidden={isHidden || undefined}>
      {PHRASE_IDS.map((id) => (
        <span className={styles.phrase} key={id}>
          {PHRASE}
          <img className={styles.logo} src={logo} alt="" draggable={false} />
        </span>
      ))}
    </div>
  )
}

export function Marquee({ className }: Props) {
  const marqueeClassName = className ? `${styles.marquee} ${className}` : styles.marquee

  return (
    <div className={marqueeClassName}>
      <div className={styles.track}>
        <PhraseGroup />
        <PhraseGroup isHidden />
      </div>
    </div>
  )
}
