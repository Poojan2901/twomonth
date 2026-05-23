import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function PasswordGate() {
  const { tryUnlock, error } = useAuth()
  const [answer, setAnswer] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    tryUnlock(answer)
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-romance-black px-5 sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1020_0%,_#0a0a0f_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
      >
        <p className="font-script text-4xl text-romance-pink sm:text-5xl">Our 60 Days</p>
        <p className="mt-4 font-display text-base leading-relaxed text-white/80 sm:text-lg">
          Enter the date we first talked ❤️
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-stretch">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="w-full rounded-xl border border-romance-pink/30 bg-black/40 px-4 py-3.5 text-center text-white outline-none transition focus:border-romance-pink focus:ring-1 focus:ring-romance-pink/30"
          />
          {error && (
            <p className="mt-3 text-center text-sm text-romance-rose">{error}</p>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-romance-rose to-romance-glow py-3.5 font-display text-white"
          >
            Unlock Our Story
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
