import { z } from 'zod'

const TELEGRAM_CONTACT = /^(https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}|@[a-zA-Z0-9_]{5,32})$/

const PHONE = /^\+[1-9]\d{6,14}$/

const isTelegramContact = (value: string): boolean => TELEGRAM_CONTACT.test(value)

const isPhone = (value: string): boolean => PHONE.test(value)

export const contactFormSchema = z
  .object({
    name: z.string().trim(),
    method: z.enum(['telegram', 'whatsapp', 'email'], {
      error: 'form.errors.methodRequired',
    }),
    contact: z.string().trim().min(1, 'form.errors.contactRequired'),
  })
  .superRefine((data, context) => {
    if (data.contact === '') {
      return
    }

    if (data.method === 'email' && !z.email().safeParse(data.contact).success) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'form.errors.email',
      })
    }

    if (data.method === 'telegram' && !isTelegramContact(data.contact)) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'form.errors.telegram',
      })
    }

    if (data.method === 'whatsapp' && !isPhone(data.contact)) {
      context.addIssue({
        code: 'custom',
        path: ['contact'],
        message: 'form.errors.whatsapp',
      })
    }
  })

export type ContactFormValues = z.infer<typeof contactFormSchema>
