import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HIDDEN_NOTES } from '../data/content'

export default function HiddenStars() {
  const [note, setNote] = useState(null)

  const reveal = useCallback(() => {
    const random = HIDDEN_NOTES[Math.floor(Math.random() * HIDDEN_NOTES.length)]
    setNote(random)
    setTimeout(() => setNote(null), 4000)
  }, [])

  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    top: 10 + Math.random() * 80,
  }))

  return (
    <>
      {stars.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={reveal}
          className="fixed z-30 cursor-pointer text-lg opacity-20 transition hover:opacity-80 hover:scale-125"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          aria-label="Hidden love note"
        >
          ✦
        </button>
      ))}
      <AnimatePresence>
        {note && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong fixed left-1/2 top-1/2 z-50 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-center font-display text-lg text-romance-pink"
          >
            {note}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
