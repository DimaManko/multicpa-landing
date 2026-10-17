export const LOCALES = ["en", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: string): value is Locale =>
  LOCALES.some((locale) => locale === value);
