import type { z } from 'zod'

import { getEnv } from '@/shared/config/env'
import type { Locale } from '@/shared/config/locales'

export const getJson = async <T>(
  path: string,
  lang: Locale,
  schema: z.ZodType<T>,
  signal?: AbortSignal,
): Promise<T> => {
  const response = await fetch(`${getEnv('VITE_API_URL')}/${lang}/${path}`, {
    headers: { 'x-api-key': getEnv('VITE_API_KEY') },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  const json: unknown = await response.json()

  return schema.parse(json)
}
