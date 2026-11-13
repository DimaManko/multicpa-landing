import gsap from 'gsap'

import type { SnapAnimation } from '@/features/snap-scroll'
import { defaultEnter, defaultLeave } from '@/features/snap-scroll'

const FOOTER_SHIFT = 110
const DURATION = 0.5
const EASE = 'power2.out'
const CONTENT_SELECTOR = '[role="tablist"], [role="tabpanel"]'
const FOOTER_SELECTOR = 'footer'

export const multiplyEnter: SnapAnimation = (element, direction) => {
  const content = element.querySelectorAll(CONTENT_SELECTOR)
  const footer = element.querySelectorAll(FOOTER_SELECTOR)
  const section = defaultEnter(element, direction)
  const timeline = gsap.timeline()

  if (section) {
    timeline.add(section)
  }

  timeline
    .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: DURATION, ease: EASE })
    .fromTo(footer, { y: FOOTER_SHIFT }, { y: 0, duration: DURATION, ease: EASE }, '<')

  return timeline
}

export const multiplyLeave: SnapAnimation = (element, direction) => {
  const content = element.querySelectorAll(CONTENT_SELECTOR)
  const footer = element.querySelectorAll(FOOTER_SELECTOR)
  const section = defaultLeave(element, direction)
  const timeline = gsap.timeline()

  if (section) {
    timeline.add(section, 0)
  }

  timeline
    .to(content, { autoAlpha: 0, duration: DURATION, ease: EASE }, 0)
    .to(footer, { y: FOOTER_SHIFT, duration: DURATION, ease: EASE }, 0)

  return timeline
}
