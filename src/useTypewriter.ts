import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  speed?: number
  startDelay?: number
}

interface UseTypewriterResult {
  displayed: string
  done: boolean
}

export function useTypewriter(
  text: string,
  { speed = 38, startDelay = 600 }: UseTypewriterOptions = {},
): UseTypewriterResult {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let index = 0
    let intervalId: number | undefined

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          if (intervalId) window.clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
