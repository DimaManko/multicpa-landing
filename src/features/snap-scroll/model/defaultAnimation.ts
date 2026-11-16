import gsap from 'gsap'

import type { SnapAnimation } from './types'

const SHIFT = 12
const DURATION = 0.5
const EASE = 'power2.out'

export const defaultEnter: SnapAnimation = (element, direction) =>
  gsap.fromTo(
    element,
    { yPercent: SHIFT * direction, autoAlpha: 0 },
    { yPercent: 0, autoAlpha: 1, duration: DURATION, ease: EASE },
  )

export const defaultLeave: SnapAnimation = (element, direction) =>
  gsap.to(element, {
    yPercent: -SHIFT * direction,
    autoAlpha: 0,
    duration: DURATION,
    ease: EASE,
  })
