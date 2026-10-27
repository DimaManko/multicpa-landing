import type { Locale } from './locales'

const localeStorageKey = 'locale'

export function rememberLocale(locale: Locale): void {
  sessionStorage.setItem(localeStorageKey, locale)
}

export function getHomePath(): string {
  const { pathname } = window.location

  if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    return '/ru'
  }

  const storedLocale = sessionStorage.getItem(localeStorageKey)

  if (storedLocale === 'ru') {
    return '/ru'
  }

  return '/'
}
