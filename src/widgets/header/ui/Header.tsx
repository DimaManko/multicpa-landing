import type { ReactNode } from 'react'

import styles from './Header.module.scss'

type HeaderProps = {
  logo: ReactNode
  languageSwitch?: ReactNode
  links?: readonly { label: string; href: string }[]
}

export function Header({ logo, languageSwitch, links = [] }: HeaderProps) {
  return (
    <header className={styles.header}>
      {logo}

      <div className={styles.actions}>
        {links.length > 0 && (
          <nav className={styles.nav} aria-label="Основная навигация">
            {links.map(({ label, href }) => (
              <a key={href} className={styles.link} href={href}>
                {label}
              </a>
            ))}
          </nav>
        )}
        {languageSwitch}
      </div>
    </header>
  )
}