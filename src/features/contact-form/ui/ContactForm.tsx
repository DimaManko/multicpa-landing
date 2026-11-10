import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
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

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    resetField,
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

    try {
      await send(values)
    } catch {
      setError('root', {
        type: 'server',
        message: 'Не удалось отправить заявку. Попробуйте ещё раз.',
      })
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.success} role="status">
        <h2 className={styles.successTitle}>WE HAVE RECEIVED YOUR APPLICATION!</h2>

        <p className={styles.successText}>
          We will process your request
          <br />
          and get in touch with you
        </p>

        <button className={styles.submit} type="button" onClick={onClose}>
          Done
        </button>
      </div>
    )
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={isSubmitting}
      noValidate
    >
      <p className={styles.hint}>
        Fields with an asterisk (<span className={styles.accent}>*</span>) are mandatory
      </p>

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
            {...register('method', { onChange: () => resetField('contact') })}
            className={styles.control}
            id={`${formId}-method`}
            defaultValue=""
            required
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

          <span className={styles.placeholder} aria-hidden="true">
            Contact Method<span className={styles.accent}>*</span>
          </span>

          {errors.method && (
            <p className={styles.error} id={`${formId}-method-error`} role="alert">
              {errors.method.message}
            </p>
          )}
        </div>

        <div className={styles.contactField}>
          <label className={styles.label} htmlFor={`${formId}-contact`}>
            Your Contact *
          </label>

          <input
            {...register('contact')}
            className={styles.control}
            id={`${formId}-contact`}
            type="text"
            placeholder=" "
            aria-required="true"
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? `${formId}-contact-error` : undefined}
          />

          <span className={styles.placeholder} aria-hidden="true">
            Your Contact<span className={styles.accent}>*</span>
          </span>

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

      {errors.root && (
        <p className={styles.error} role="alert">
          {errors.root.message}
        </p>
      )}
    </form>
  )
}

export default ContactForm
