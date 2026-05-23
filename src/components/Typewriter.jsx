import { useState, useEffect } from 'react'

export default function Typewriter({ text, speed = 55, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setDone(true)
        onComplete?.()
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span>
      {displayed}
      {!done && (
        <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-romance-pink align-middle" />
      )}
    </span>
  )
}
