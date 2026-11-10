import { useId, useState } from 'react'

import Modal from '@/shared/ui/Modal'

import ContactForm from './ContactForm'

import styles from './ContactModal.module.scss'

type Props = {
  label: string
}

const ContactModal = ({ label }: Props) => {
  const titleId = useId()
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {label}
      </button>

      <Modal isOpen={isOpen} onClose={close} labelledBy={titleId} closeLabel="Close">
        <h2 id={titleId} className={styles.title}>
          Contact us
        </h2>
        <ContactForm onClose={close} />
      </Modal>
    </>
  )
}

export default ContactModal
