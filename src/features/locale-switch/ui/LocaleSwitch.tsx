import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { LOCALES } from '@/shared/config/locales'

import styles from './LocaleSwitch.module.scss'

type Props = {
  className?: string
}

export function LocaleSwitch({ className }: Props) {
  const { t, i18n } = useTranslation()
  const rootClassName = [styles.root, className].filter(Boolean).join(' ')

  return (
    <nav className={rootClassName} aria-label={t('header.language')}>
      {LOCALES.map((lang) => {
        const isActive = lang === i18n.language

        return (
          <Link
            key={lang}
            className={isActive ? `${styles.link} ${styles.active}` : styles.link}
            to={lang === 'en' ? '/' : `/${lang}`}
            lang={lang}
            aria-current={isActive ? 'true' : undefined}
          >
            {lang.toUpperCase()}
          </Link>
        )
      })}
    </nav>
  )
}
