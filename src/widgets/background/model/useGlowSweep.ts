import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { RefObject } from 'react'

const TOP_RIGHT = { x: '95.8vw', y: '20.4vh' }
const LEFT_CENTER = { x: '11vw', y: '49.3vh' }
const BOTTOM_RIGHT = { x: '95.8vw', y: '100.4vh' }
const GLOW_PATH = [TOP_RIGHT, LEFT_CENTER, BOTTOM_RIGHT, LEFT_CENTER, TOP_RIGHT] as const
const SEGMENT_DURATION = 3
const ANIMATED_QUERY = '(min-width: 769px) and (prefers-reduced-motion: no-preference)'

export const useGlowSweep = (glowRef: RefObject<HTMLDivElement | null>) => {
  useGSAP(
    () => {
      const glow = glowRef.current

      if (!glow) {
        return
      }

      const [start, ...waypoints] = GLOW_PATH

      gsap.set(glow, { xPercent: -50, yPercent: -50, ...start })

      gsap.matchMedia().add(ANIMATED_QUERY, () => {
        const timeline = gsap.timeline({
          repeat: -1,
          defaults: { duration: SEGMENT_DURATION, ease: 'power1.inOut' },
        })

        for (const waypoint of waypoints) {
          timeline.to(glow, waypoint)
        }
      })
    },
    { scope: glowRef },
  )
}
