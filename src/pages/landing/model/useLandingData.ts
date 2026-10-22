import { useBenefits, useMultiply, useTasks } from '@/shared/api'
import type { Locale } from '@/shared/config/locales'

export const useLandingData = (lang: Locale) => {
  const tasks = useTasks(lang)
  const benefits = useBenefits(lang)
  const multiply = useMultiply(lang)

  return {
    tasks: tasks.data,
    benefits: benefits.data,
    multiply: multiply.data,
    isLoading: tasks.isLoading || benefits.isLoading || multiply.isLoading,
    error: tasks.error ?? benefits.error ?? multiply.error,
  }
}
