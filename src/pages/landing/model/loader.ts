import type { LoaderFunctionArgs } from 'react-router'
import { redirect } from 'react-router'

import { getBenefits, getMultiply, getTasks } from '@/shared/api'
import { rememberLocale } from '@/shared/config/home-path'
import { isLocale } from '@/shared/config/locales'

export const loader = ({ params, request }: LoaderFunctionArgs) => {
  if (params.lang === 'en') {
    throw redirect('/')
  }

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
