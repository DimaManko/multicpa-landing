import { z } from 'zod'

import type { Locale } from '@/shared/config/locales'

import { getJson } from './request'

const benefitsSchema = z.object({
  title: z.string(),
  description: z.string(),
  benefits: z.array(z.string()),
})

export type Benefits = z.infer<typeof benefitsSchema>

export const getBenefits = (lang: Locale, signal?: AbortSignal) =>
  getJson('benefits', lang, benefitsSchema, signal)
