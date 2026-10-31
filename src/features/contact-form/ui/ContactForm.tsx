import { zodResolver } from '@hookform/resolvers/zod'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useSendForm } from '@/shared/api'

import type { ContactFormValues } from '../model/schema'
import { contactFormSchema } from '../model/schema'

import styles from './ContactForm.module.scss'

type Props = {
  onClose: () => void
}

const ContactForm = ({ onClose }: Props) => {
  const formId = useId()
  const { send, isSuccess } = useSendForm()
  const [hasCompletedRequest, setHasCompletedRequest] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      contact: '',
    },
  })

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    clearErrors('root')
    setHasCompletedRequest(false)

    try {
      await send(values)
    } catch {
      setError('root', {
        type: 'server',
        message: 'Не удалось отправить заявку. Попробуйте ещё раз.',
      })
    } finally {
      setHasCompletedRequest(true)
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.success} role="status">
        <h2 className={styles.successTitle}>WE HAVE RECEIVED YOUR APPLICATION!</h2>

        <p className={styles.successText}>We will process your request and get in touch with you</p>

        <button className={styles.submit} type="button" onClick={onClose}>
          Done
        </button>
      </div>
    )
  }

  const hasSendError =
    errors.root !== undefined || (hasCompletedRequest && !isSubmitting && !isSuccess)

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={isSubmitting}
      noValidate
    >
      <p className={styles.hint}>Fields with an asterisk (*) are mandatory</p>

      <fieldset className={styles.fields} disabled={isSubmitting}>
        <div className={styles.nameField}>
          <label className={styles.label} htmlFor={`${formId}-name`}>
            Your Name
          </label>

          <input
            {...register('name')}
            className={styles.control}
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            placeholder="Your Name"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-method`}>
            Contact Method *
          </label>

          <select
            {...register('method')}
            className={styles.control}
            id={`${formId}-method`}
            defaultValue=""
            aria-required="true"
            aria-invalid={Boolean(errors.method)}
            aria-describedby={errors.method ? `${formId}-method-error` : undefined}
          >
            <option value="" disabled>
              Contact Method
            </option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>

          {errors.method && (
            <p className={styles.error} id={`${formId}-method-error`} role="alert">
              {errors.method.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-contact`}>
            Your Contact *
          </label>

          <input
            {...register('contact')}
            className={styles.control}
            id={`${formId}-contact`}
            type="text"
            placeholder="Your Contact"
            aria-required="true"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? `${formId}-contact-error` : undefined}
          />

          {errors.contact && (
            <p className={styles.error} id={`${formId}-contact-error`} role="alert">
              {errors.contact.message}
            </p>
          )}
        </div>

        <button className={styles.submit} type="submit">
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </fieldset>

      {hasSendError && (
        <p className={styles.error} role="alert">
          Не удалось отправить заявку. Попробуйте ещё раз.
        </p>
      )}
    </form>
  )
}

export default ContactForm
