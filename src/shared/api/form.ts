import { useCallback, useState } from 'react'

import { getEnv } from '@/shared/config/env'

export interface ContactFormData {
  name?: string
  method: 'telegram' | 'whatsapp' | 'email'
  contact: string
}

const postForm = async (data: ContactFormData): Promise<boolean> => {
  const url = `${getEnv('VITE_API_URL')}/form`
  const apiKey = getEnv('VITE_API_KEY')

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    })

    return response.ok
  } catch (error: unknown) {
    console.error('Form request failed', error)

    return false
  }
}

export const useSendForm = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const send = useCallback(async (data: ContactFormData) => {
    setIsSuccess(await postForm(data))
  }, [])

  const reset = useCallback(() => setIsSuccess(false), [])

  return { isSuccess, send, reset }
}
