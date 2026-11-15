import styles from '../ui/Marquee.module.scss'

import gsap from "gsap";

import type { SnapAnimation } from "@/features/snap-scroll";
import { defaultLeave, defaultEnter } from "@/features/snap-scroll/model/defaultAnimation";


const DURATION = 0.5;
const EASE = 'power2.out';
const COPY_SELECTOR = '[data-anim="copy"]'
const SNAKE_SELECTOR = '[data-anim="snake"]'
const CARDS_SELECTOR = '[data-anim="cards"]'
const CONTENT = '[data-anim="content"]'
const MARQUEE = '[data-marquee]'

export const benefitsEnter: SnapAnimation = (element, direction) => {
    const copy = element.querySelector(COPY_SELECTOR)
    const snake = element.querySelector(SNAKE_SELECTOR)
    const cards = element.querySelector(CARDS_SELECTOR)
    const content = element.querySelector(CONTENT)
    const marquee = element.querySelector(MARQUEE)
    const section = defaultEnter(element, direction)
    const timeline = gsap.timeline()

    if (section) {
        timeline.add(section)
    }

    timeline
        .set(content, { overflow: 'visible' })
        .from(copy, {x: '-100vw', autoAlpha: 0, duration: DURATION, ease: EASE})
        .from(snake, {x: '100vw', autoAlpha: 0, duration: DURATION, ease: EASE}, '<')
        .from(cards, {x: '100vw', autoAlpha: 0, duration: DURATION, ease: EASE}, '<')
        .set(content, { overflow: '' })
        .call(() => marquee?.classList.add(styles.isRunning))

    return timeline
}

export const benefitsLeave: SnapAnimation = (element, direction) => {
  element.querySelector(MARQUEE)?.classList.remove(styles.isRunning)
  return defaultLeave(element, direction)
}
 

