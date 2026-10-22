import { z } from 'zod'

import type { Locale } from '@/shared/config/locales'

import { useFetch } from './useFetch'

const tasksSchema = z.object({
  description: z.string(),
  tiles: z.array(z.object({ title: z.string(), text: z.string() })),
})

export type Tasks = z.infer<typeof tasksSchema>

export const useTasks = (lang: Locale) => useFetch('tasks', lang, tasksSchema)
