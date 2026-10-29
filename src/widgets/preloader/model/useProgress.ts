import { useEffect, useState } from 'react'

const TIMER_LIMIT = 75
const TIMER_DURATION = 1500
const FINISH_DURATION = 400

const easeOut = (t: number): number => 1 - (1 - t) ** 2

const animate = (
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onDone: () => void,
): (() => void) => {
  let frame = 0
  let start: number | null = null

  const tick = (now: number) => {
    start ??= now
    const t = Math.min((now - start) / duration, 1)

    onUpdate(from + (to - from) * easeOut(t))

    if (t < 1) {
      frame = requestAnimationFrame(tick)
      return
    }

    onDone()
  }

  frame = requestAnimationFrame(tick)

  return () => cancelAnimationFrame(frame)
}

export const useProgress = (isLoading: boolean) => {
  const [progress, setProgress] = useState(0)
  const [isTimerDone, setIsTimerDone] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(
    () => animate(0, TIMER_LIMIT, TIMER_DURATION, setProgress, () => setIsTimerDone(true)),
    [],
  )

  useEffect(() => {
    if (isLoading || !isTimerDone) {
      return
    }

    return animate(TIMER_LIMIT, 100, FINISH_DURATION, setProgress, () => setIsFinished(true))
  }, [isLoading, isTimerDone])

  return { progress, isFinished }
}
