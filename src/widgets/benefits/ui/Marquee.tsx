import { useEffect, useRef } from 'react'

import styles from './Marquee.module.scss'

const MOBILE_QUERY = '(max-width: 768px)'

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
      {PHRASE_IDS.map((id, index) => (
        <span className={styles.phrase} key={id} aria-hidden={index > 0 || isHidden || undefined}>
          {phrase}
          <span className={styles.logo} aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

export function Marquee({ phrase, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const marqueeClassName = className ? `${styles.marquee} ${className}` : styles.marquee

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const media = window.matchMedia(MOBILE_QUERY)
    let observer: IntersectionObserver | null = null

    const disconnect = () => {
      observer?.disconnect()
      observer = null
      track.classList.remove(styles.isRunning)
    }

    const connect = () => {
      disconnect()
      if (!media.matches) {
        return
      }

      observer = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1]
        if (!entry) {
          return
        }
        if (entry.isIntersecting) {
          track.classList.add(styles.isRunning)
        } else {
          track.classList.remove(styles.isRunning)
        }
      })
      observer.observe(track)
    }

    const handleMediaChange = () => {
      if (media.matches) {
        connect()
        return
      }
      disconnect()
    }

    handleMediaChange()
    media.addEventListener('change', handleMediaChange)

    return () => {
      disconnect()
      media.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <div className={marqueeClassName}>
      <div ref={trackRef} className={styles.track} data-marquee>
        <PhraseGroup phrase={phrase} />
        <PhraseGroup phrase={phrase} isHidden />
      </div>
    </div>
  )
}
