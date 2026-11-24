import type { ReactNode } from 'react'

export type SnapDirection = 1 | -1

export type SnapAnimation = (
  element: HTMLElement,
  direction: SnapDirection,
) => gsap.core.Animation | undefined

export type SnapSection = {
  id: string
  content: ReactNode
  enter?: SnapAnimation
  leave?: SnapAnimation
}

export type SnapScrollHandle = {
  goTo: (index: number) => void
}
