import { useEffect, useState } from 'react'
import type { z } from 'zod'

import type { Locale } from '@/shared/config/locales'

interface FetchState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export const getEnv = (name: 'VITE_API_URL' | 'VITE_API_KEY'): string => {
  const value: unknown = import.meta.env[name]

  if (typeof value !== 'string' || value === '') {
    throw new Error(`${name} is not set`)
  }

  return value
}

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error('Unexpected error') //todo should add translate

const request = async <T>(
  path: string,
  lang: Locale,
  schema: z.ZodType<T>,
  signal: AbortSignal,
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

export const useFetch = <T>(path: string, lang: Locale, schema: z.ZodType<T>): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, isLoading: true })

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      setState({ data: null, error: null, isLoading: true })

      try {
        const data = await request(path, lang, schema, controller.signal)

        setState({ data, error: null, isLoading: false })
      } catch (error: unknown) {
        if (controller.signal.aborted) {
          return
        }

        setState({ data: null, error: toError(error), isLoading: false })
      }
    }

    load()

    return () => controller.abort()
  }, [path, lang, schema])

  return state
}
