import type { ReactNode } from 'react'

import styles from './Header.module.scss'

type HeaderProps = {
    logo: ReactNode
    languageSwitch?: ReactNode
    links?: readonly { label: string; onClick: () => void }[]
}

export function Header({ logo, languageSwitch, links = [] }: HeaderProps) {
    return (
        <header className={styles.header}>
            {logo}

            <div className={styles.actions}>
                {links.length > 0 && (
                    <nav className={styles.nav} aria-label="Основная навигация">
                        {links.map(({ label, onClick }) => (
                            <button
                                key={label}
                                className={`${styles.link} ${styles.navButton}`}
                                type="button"
                                onClick={onClick}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                )}
                {languageSwitch}
            </div>
        </header>
    )
}