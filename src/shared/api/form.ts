import { useCallback, useState } from 'react'

import { getEnv } from '@/shared/config/env'

export interface ContactFormData {
  name?: string
  method: 'telegram' | 'whatsapp' | 'email'
  contact: string
}

const postForm = async (data: ContactFormData): Promise<void> => {
  const response = await fetch(`${getEnv('VITE_API_URL')}/form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': getEnv('VITE_API_KEY'),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
}

export const useSendForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const send = useCallback(async (data: ContactFormData) => {
    await postForm(data)
    setIsSuccess(true)
  }, [])

  const reset = useCallback(() => setIsSuccess(false), [])

  return { isSuccess, send, reset }
}
