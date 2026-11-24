import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { defaultEnter, defaultLeave } from './defaultAnimation'
import type { SnapDirection, SnapSection } from './types'
import { useMediaQuery } from './useMediaQuery'

const MOBILE_QUERY = '(max-width: 768px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const SCROLL_TO_SECTION_DURATION = 0.45
const SCROLL_TO_MIN_DURATION = 0.8

gsap.registerPlugin(Observer)

const KEY_TARGETS: Record<string, (current: number, last: number) => number> = {
  ArrowDown: (current) => current + 1,
  PageDown: (current) => current + 1,
  ArrowUp: (current) => current - 1,
  PageUp: (current) => current - 1,
  Home: () => 0,
  End: (_, last) => last,
}

const getHashIndex = (sections: SnapSection[]): number => {
  const id = window.location.hash.slice(1)

  return Math.max(
    0,
    sections.findIndex((section) => section.id === id),
  )
}

const isEditable = (target: EventTarget | null): boolean =>
  target instanceof Element &&
  target.closest('input, textarea, select, [contenteditable="true"]') !== null

const isInsideModal = (target: EventTarget | null): boolean =>
  target instanceof Element && target.closest('[aria-modal="true"]') !== null

export const useSnapScroll = (
  sections: SnapSection[],
  onActiveChange?: (index: number) => void,
) => {
  const isEnabled = !useMediaQuery(MOBILE_QUERY)
  const rootRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef(sections)
  const onActiveChangeRef = useRef(onActiveChange)
  const goToRef = useRef<(index: number) => void>(() => undefined)
  const [activeIndex, setActiveIndex] = useState(() => getHashIndex(sections))
  const activeRef = useRef(activeIndex)
  const count = sections.length

  useLayoutEffect(() => {
    sectionsRef.current = sections
    onActiveChangeRef.current = onActiveChange
  })

  useEffect(() => {
    onActiveChangeRef.current?.(activeIndex)
  }, [activeIndex])

  useEffect(() => {
    const root = rootRef.current

    if (!isEnabled || !root || count === 0) {
      return
    }

    const elements = Array.from(root.querySelectorAll<HTMLElement>(':scope > [data-snap-section]'))
    const last = count - 1
    let isAnimating = false
    let isGestureActive = false

    const context = gsap.context(() => {
      gsap.set(elements, { autoAlpha: 0 })
    }, root)

    const run = (from: number | null, to: number, direction: SnapDirection, duration?: number) => {
      const target = elements[to]
      const config = sectionsRef.current

      if (!target) {
        return
      }

      activeRef.current = to
      setActiveIndex(to)
      isAnimating = true

      context.add(() => {
        const timeline = gsap.timeline({
          onComplete: () => {
            isAnimating = false
            const previous = from === null ? undefined : elements[from]

            if (previous && from !== to) {
              gsap.set(previous, { autoAlpha: 0 })
            }
          },
        })

        const previous = from === null ? undefined : elements[from]
        const leave = from === null ? undefined : (config[from]?.leave ?? defaultLeave)
        const enter = config[to]?.enter ?? defaultEnter

        gsap.set(target, { autoAlpha: 1 })

        const leaving = previous && leave ? leave(previous, direction) : undefined
        const entering = enter(target, direction)

        if (leaving) {
          timeline.add(leaving, 0)
        }

        if (entering) {
          timeline.add(entering, 0)
        }

        if (duration !== undefined) {
          timeline.duration(duration)
        }

        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
          timeline.progress(1)
        }
      })
    }

    const goTo = (index: number, duration?: number) => {
      const target = Math.min(Math.max(index, 0), last)
      const current = activeRef.current

      if (isAnimating || target === current) {
        return
      }

      run(current, target, target > current ? 1 : -1, duration)
    }

    const travelTo = (index: number) => {
      const target = Math.min(Math.max(index, 0), last)
      const from = activeRef.current

      if (isAnimating || target === from) {
        return
      }

      const involved = elements.slice(Math.min(from, target), Math.max(from, target) + 1)
      const distance = target - from
      const duration = window.matchMedia(REDUCED_MOTION_QUERY).matches
        ? 0
        : Math.max(Math.abs(distance) * SCROLL_TO_SECTION_DURATION, SCROLL_TO_MIN_DURATION)

      activeRef.current = target
      setActiveIndex(target)
      isAnimating = true

      context.add(() => {
        const progress = { value: 0 }
        const place = () => {
          elements.forEach((element, position) => {
            if (involved.includes(element)) {
              gsap.set(element, { yPercent: (position - from - progress.value) * 100 })
            }
          })
        }

        gsap.set(involved, { autoAlpha: 1 })
        place()

        gsap.to(progress, {
          value: distance,
          duration,
          ease: 'power2.inOut',
          onUpdate: place,
          onComplete: () => {
            gsap.set(involved, { yPercent: 0, autoAlpha: 0 })
            gsap.set(elements[target], { autoAlpha: 1 })
            isAnimating = false
          },
        })
      })
    }

    const handleStep = (direction: SnapDirection) => {
      if (isAnimating || isGestureActive) {
        return
      }

      isGestureActive = true
      goTo(activeRef.current + direction)
    }

    const observer = Observer.create({
      target: window,
      type: 'wheel',
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      ignoreCheck: (event) =>
        (event instanceof WheelEvent && event.ctrlKey) || isInsideModal(event.target),
      onUp: () => handleStep(1),
      onDown: () => handleStep(-1),
      onStop: () => {
        isGestureActive = false
      },
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      const getTarget = KEY_TARGETS[event.key]

      if (
        !getTarget ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        isEditable(event.target) ||
        isInsideModal(event.target)
      ) {
        return
      }

      event.preventDefault()
      goTo(getTarget(activeRef.current, last))
    }

    const handleHashChange = () => {
      root.scrollTop = 0
      goTo(getHashIndex(sectionsRef.current))
    }

    goToRef.current = travelTo
    run(null, Math.min(activeRef.current, last), 1)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.kill()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('hashchange', handleHashChange)
      goToRef.current = () => undefined
      context.revert()
    }
  }, [isEnabled, count])

  const goTo = useCallback((index: number) => goToRef.current(index), [])

  return { rootRef, activeIndex, isEnabled, goTo }
}
