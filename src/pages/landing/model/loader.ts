import type { LoaderFunctionArgs } from 'react-router'
import { redirect } from 'react-router'

import { getBenefits, getMultiply, getTasks } from '@/shared/api'
import { rememberLocale, resolveLocale } from '@/shared/config/home-path'
import { isLocale } from '@/shared/config/locales'
import i18n from '@/shared/i18n/i18n'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  if (params.lang === 'en') {
    throw redirect('/')
  }

  const pathname = new URL(request.url).pathname

  await i18n.changeLanguage(resolveLocale(pathname))

  const lang = params.lang ?? 'en'

  if (!isLocale(lang)) {
    throw new Response(null, { status: 404 })
  }

  rememberLocale(lang)

  return {
    lang,
    data: Promise.all([
      getTasks(lang, request.signal),
      getBenefits(lang, request.signal),
      getMultiply(lang, request.signal),
    ]),
  }
}
