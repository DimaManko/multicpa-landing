import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useSendForm } from '@/shared/api'

import type { ContactFormValues } from '../model/schema'
import { contactFormSchema } from '../model/schema'

import styles from './ContactForm.module.scss'

type Props = {
  onClose: () => void
}

const ContactForm = ({ onClose }: Props) => {
  const { t } = useTranslation()

  const validationMessages: Record<string, string> = {
    'form.errors.methodRequired': t('form.errors.methodRequired'),
    'form.errors.contactRequired': t('form.errors.contactRequired'),
    'form.errors.email': t('form.errors.email'),
    'form.errors.telegram': t('form.errors.telegram'),
    'form.errors.whatsapp': t('form.errors.whatsapp'),
  }

  const translateError = (message?: string): string =>
    validationMessages[message ?? ''] ?? t('form.errors.contactRequired')

  const [hintBefore, hintAfter] = t('form.requiredHint').split('*')

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
        message: 'form.errors.send',
      })
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.success} role="status">
        <h2 className={styles.successTitle}>{t('modal.successTitle')}</h2>

        <p className={styles.successText}>{t('modal.successText')}</p>

        <button className={styles.submit} type="button" onClick={onClose}>
          {t('modal.done')}
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
        {hintBefore}
        <span className={styles.accent}>*</span>
        {hintAfter}
      </p>

      <fieldset className={styles.fields} disabled={isSubmitting}>
        <div className={styles.nameField}>
          <label className={styles.label} htmlFor={`${formId}-name`}>
            {t('form.namePlaceholder')}
          </label>

          <input
            {...register('name')}
            className={styles.control}
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            placeholder={t('form.namePlaceholder')}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${formId}-method`}>
            {t('form.contactMethodPlaceholder')} *
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
              {t('form.contactMethodPlaceholder')}
            </option>
            <option value="telegram">Telegram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>

          <span className={styles.placeholder} aria-hidden="true">
            {t('form.contactMethodPlaceholder')}
            <span className={styles.accent}>*</span>
          </span>

          {errors.method && (
            <p className={styles.error} id={`${formId}-method-error`} role="alert">
              {translateError(errors.method.message)}
            </p>
          )}
        </div>

        <div className={styles.contactField}>
          <label className={styles.label} htmlFor={`${formId}-contact`}>
            {t('form.contactPlaceholder')} *
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
            {t('form.contactPlaceholder')}
            <span className={styles.accent}>*</span>
          </span>

          {errors.contact && (
            <p className={styles.error} id={`${formId}-contact-error`} role="alert">
              {translateError(errors.contact.message)}
            </p>
          )}
        </div>

        <button className={styles.submit} type="submit">
          {isSubmitting ? t('form.sending') : t('form.submit')}
        </button>
      </fieldset>

      {errors.root && (
        <p className={styles.error} role="alert">
          {t('form.errors.send')}
        </p>
      )}
    </form>
  )
}

export default ContactForm
