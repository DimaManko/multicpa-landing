//Схема валидации

import { z } from 'zod'

export const contactFormSchema = z
  .object({
    name: z.string().trim(),
    method: z.enum(['telegram', 'whatsapp', 'email'], {
      error: 'Выберите способ связи',
    }),
    contact: z.string().trim().min(1, 'Укажите контакт'),
  })
  .superRefine((data, context) => {
    if (
      data.method === 'email' &&
      data.contact !== '' &&
      !z.email().safeParse(data.contact).success
    ) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'Укажите корректный email',
      })
    }
  })

export type ContactFormValues = z.infer<typeof contactFormSchema>
