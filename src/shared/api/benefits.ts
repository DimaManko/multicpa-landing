import { z } from 'zod'

import type { Locale } from '@/shared/config/locales'

import { useFetch } from './useFetch'

const benefitsSchema = z.object({
  title: z.string(),
  description: z.string(),
  benefits: z.array(z.string()),
})

export type Benefits = z.infer<typeof benefitsSchema>

export const useBenefits = (lang: Locale) => useFetch('benefits', lang, benefitsSchema)
