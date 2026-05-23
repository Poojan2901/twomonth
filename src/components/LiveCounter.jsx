import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../data/content'

function getStats(since) {
  const start = new Date(since).getTime()
  const now = Date.now()
  const diff = Math.max(0, now - start)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalSeconds: seconds,
  }
}

function StatBox({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 px-3 py-5">
      <p className="tabular-nums font-display text-3xl leading-none text-white sm:text-4xl md:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-center text-xs uppercase tracking-wider text-white/50">
        {label}
      </p>
    </div>
  )
}

export default function LiveCounter({ compact = false }) {
  const [stats, setStats] = useState(() => getStats(SITE.officialDate))

  useEffect(() => {
    const t = setInterval(() => setStats(getStats(SITE.officialDate)), 1000)
    return () => clearInterval(t)
  }, [])

  if (compact) {
    return (
      <span className="tabular-nums font-display text-romance-pink">
        {stats.days} days · {stats.totalSeconds.toLocaleString()} seconds
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass w-full rounded-2xl p-6 text-center sm:p-8"
    >
      <p className="font-display text-xs uppercase tracking-[0.3em] text-romance-pink/80 sm:text-sm">
        Together
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatBox label="Days" value={stats.days} />
        <StatBox label="Hours" value={stats.hours} />
        <StatBox label="Minutes" value={stats.minutes} />
        <StatBox label="Seconds" value={stats.seconds} />
      </div>

      <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
        We&apos;ve survived{' '}
        <span className="tabular-nums text-gradient-love font-display text-lg sm:text-xl">
          {stats.totalSeconds.toLocaleString()}
        </span>{' '}
        seconds together ❤️
      </p>
    </motion.div>
  )
}
