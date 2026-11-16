import type { Locale } from './locales'
import { isLocale } from './locales'

const localeStorageKey = 'locale'
const defaultLocale: Locale = 'en'

export function rememberLocale(locale: Locale): void {
  sessionStorage.setItem(localeStorageKey, locale)
}

function readStoredLocale(): Locale | null {
  const storedLocale = sessionStorage.getItem(localeStorageKey)

  return storedLocale !== null && isLocale(storedLocale) ? storedLocale : null
}

export function resolveLocale(pathname: string): Locale {
  const [firstSegment = ''] = pathname.split('/').filter(Boolean)

  if (firstSegment === '') {
    return defaultLocale
  }

  if (isLocale(firstSegment)) {
    return firstSegment
  }

  return readStoredLocale() ?? defaultLocale
}

export function getHomePath(): string {
  const locale = resolveLocale(window.location.pathname)

  return locale === defaultLocale ? '/' : `/${locale}`
}
