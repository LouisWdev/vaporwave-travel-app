import { useState, useEffect, useCallback } from 'react'

export function useVaporMode() {
  const [vaporMode, setVaporMode] = useState(false)
  const [holdTimer, setHoldTimer] = useState(null)

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'v' || e.key === 'V') {
        if (!holdTimer) {
          const timer = setTimeout(() => {
            setVaporMode((prev) => {
              const next = !prev
              if (next) {
                document.body.classList.add('vapor-mode')
                document.body.style.transition = 'filter 0.3s ease'
              } else {
                document.body.classList.remove('vapor-mode')
              }
              return next
            })
          }, 500)
          setHoldTimer(timer)
        }
      }
    },
    [holdTimer]
  )

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'v' || e.key === 'V') {
        if (holdTimer) {
          clearTimeout(holdTimer)
          setHoldTimer(null)
        }
      }
    },
    [holdTimer]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return vaporMode
}
