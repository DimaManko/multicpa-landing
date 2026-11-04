import type { AnimationEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Logo from '@/shared/ui/Logo'

import styles from './Modal.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  labelledBy: string
  closeLabel: string
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function Modal({ isOpen, onClose, labelledBy, closeLabel, children }: Props) {
  const [isRendered, setIsRendered] = useState(isOpen)
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previouslyFocused = document.activeElement
    const root = document.getElementById('root')
    const { overflow } = document.body.style

    document.body.style.overflow = 'hidden'
    root?.setAttribute('inert', '')
    dialogRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const handleWheel = (event: WheelEvent) => event.stopPropagation()
    const overlay = overlayRef.current
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === overlay) {
        onCloseRef.current()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    overlay?.addEventListener('wheel', handleWheel)
    overlay?.addEventListener('click', handleOverlayClick)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      overlay?.removeEventListener('wheel', handleWheel)
      overlay?.removeEventListener('click', handleOverlayClick)
      document.body.style.overflow = overflow
      root?.removeAttribute('inert')
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [isOpen])

  if (isOpen && !isRendered) {
    setIsRendered(true)
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (!isOpen && event.target === event.currentTarget) {
      setIsRendered(false)
    }
  }

  if (!isRendered) {
    return null
  }

  return createPortal(
    <div
      ref={overlayRef}
      role="presentation"
      className={isOpen ? styles.overlay : `${styles.overlay} ${styles.closing}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={styles.modal}
      >
        <Logo className={styles.logo} />
        {children}
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          <span aria-hidden="true">X</span>
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default Modal
