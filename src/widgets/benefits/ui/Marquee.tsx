import styles from './Marquee.module.scss'

const PHRASE_IDS = ['first', 'second'] as const

type Props = {
  phrase: string
  className?: string
}

type GroupProps = {
  phrase: string
  isHidden?: boolean
}

function PhraseGroup({ phrase, isHidden = false }: GroupProps) {
  return (
    <div className={styles.group} aria-hidden={isHidden || undefined}>
      {PHRASE_IDS.map((id) => (
        <span className={styles.phrase} key={id}>
          {phrase}
          <span className={styles.logo} aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

export function Marquee({ phrase, className }: Props) {
  const marqueeClassName = className ? `${styles.marquee} ${className}` : styles.marquee

  return (
    <div className={marqueeClassName}>
      <div className={styles.track}>
        <PhraseGroup phrase={phrase} />
        <PhraseGroup phrase={phrase} isHidden />
      </div>
    </div>
  )
}
