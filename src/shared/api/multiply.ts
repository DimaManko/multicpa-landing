import { z } from 'zod'

import type { Locale } from '@/shared/config/locales'

import { getJson } from './request'

const multiplySchema = z.array(
  z.object({
    title: z.string(),
    steps: z.object({ step_1: z.string(), step_2: z.string() }),
  }),
)

export type Multiply = z.infer<typeof multiplySchema>

export const getMultiply = (lang: Locale, signal?: AbortSignal) =>
  getJson('multiply', lang, multiplySchema, signal)
