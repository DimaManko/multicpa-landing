import gsap from 'gsap'

import styles from '../ui/Tasks.module.scss'

// CSS ease-out: cubic-bezier(0, 0, 0.58, 1).
const easeOut = (progress: number) => {
  let start = 0
  let end = 1

  for (let iteration = 0; iteration < 20; iteration += 1) {
    const t = (start + end) / 2
    const x = 1.74 * (1 - t) * t * t + t * t * t

    if (x < progress) {
      start = t
    } else {
      end = t
    }
  }

  const t = (start + end) / 2

  return 3 * (1 - t) * t * t + t * t * t
}

export const tasksEnter = (element: HTMLElement) => {
  const intro = element.querySelector<HTMLElement>(`.${styles.intro}`)
  const [middle, right] = element.querySelectorAll<HTMLElement>(
    `.${styles.column}`,
  )

  if (!intro || !middle || !right) {
    return
  }

  gsap.set(element, { x: 0, yPercent: 0, autoAlpha: 1 })
  gsap.set([intro, middle, right], { x: 0, y: 0, autoAlpha: 1 })

  const sectionRect = element.getBoundingClientRect()
  const introRect = intro.getBoundingClientRect()
  const scale = element.clientWidth / 1440
  const introShift = sectionRect.left - introRect.right

  return gsap
    .timeline({
      defaults: {
        duration: 0.5,
        ease: easeOut,
      },
    })
    .set(intro, { x: introShift })
    .set(middle, { x: 870 * scale })
    .set(right, { x: 490 * scale })
    .to(intro, { x: 0 }, '+=0.001')
    .to(middle, { x: 0 }, '+=0.001')
    .to(right, { x: 0 }, '+=0.001')
}