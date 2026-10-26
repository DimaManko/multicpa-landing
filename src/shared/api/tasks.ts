import { z } from 'zod'

import type { Locale } from '@/shared/config/locales'

import { getJson } from './request'

const tasksSchema = z.object({
  description: z.string(),
  tiles: z.array(z.object({ title: z.string(), text: z.string() })),
})

export type Tasks = z.infer<typeof tasksSchema>

export const getTasks = (lang: Locale, signal?: AbortSignal) =>
  getJson('tasks', lang, tasksSchema, signal)
