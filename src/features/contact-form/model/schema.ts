//Схема валидации

import { z } from 'zod'

const TELEGRAM_USERNAME = /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/
const PHONE = /^\+?\d{7,15}$/

const stripPhoneSeparators = (value: string): string => value.replace(/[\s\-().]/g, '')

const isPhone = (value: string): boolean => PHONE.test(stripPhoneSeparators(value))

const isTelegramContact = (value: string): boolean =>
  TELEGRAM_USERNAME.test(value) || isPhone(value)

export const contactFormSchema = z
  .object({
    name: z.string().trim(),
    method: z.enum(['telegram', 'whatsapp', 'email'], {
      error: 'Выберите способ связи',
    }),
    contact: z.string().trim().min(1, 'Укажите контакт'),
  })
  .superRefine((data, context) => {
    if (data.contact === '') {
      return
    }

    if (data.method === 'email' && !z.email().safeParse(data.contact).success) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'Укажите корректный email',
      })
    }

    if (data.method === 'telegram' && !isTelegramContact(data.contact)) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'Укажите username (@name) или номер телефона',
      })
    }

    if (data.method === 'whatsapp' && !isPhone(data.contact)) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'Укажите номер телефона в международном формате',
      })
    }
  })

export type ContactFormValues = z.infer<typeof contactFormSchema>
