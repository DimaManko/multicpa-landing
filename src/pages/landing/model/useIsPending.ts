import { useEffect, useState } from 'react'

export const useIsPending = (promise: Promise<unknown>): boolean => {
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    let isActive = true

    const handleSettled = () => {
      if (isActive) {
        setIsPending(false)
      }
    }

    setIsPending(true)
    promise.then(handleSettled, handleSettled)

    return () => {
      isActive = false
    }
  }, [promise])

  return isPending
}
