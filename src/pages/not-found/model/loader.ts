import type { LoaderFunctionArgs } from 'react-router'

import { resolveLocale } from '@/shared/config/home-path'
import i18n from '@/shared/i18n/i18n'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pathname = new URL(request.url).pathname

  await i18n.changeLanguage(resolveLocale(pathname))

  return null
}
