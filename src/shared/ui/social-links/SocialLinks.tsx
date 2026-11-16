import { SOCIAL_LINKS } from '@/shared/config/socials'

import styles from './SocialLinks.module.scss'

type Props = {
  variant: 'icons' | 'text'
  className?: string
}

function SocialLinks({ variant, className }: Props) {
  const isIcons = variant === 'icons'
  const listClassName = [styles.list, isIcons ? styles.icons : styles.text, className]
    .filter(Boolean)
    .join(' ')

  return (
    <ul className={listClassName}>
      {SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
        <li key={id}>
          <a
            className={styles.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isIcons ? label : undefined}
          >
            {isIcons ? <Icon className={styles.icon} aria-hidden="true" /> : label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
