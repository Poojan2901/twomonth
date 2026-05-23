import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../data/content'

function Rose({ delay, x }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 1.2, type: 'spring' }}
      className="pointer-events-none absolute bottom-[18%] text-3xl sm:text-4xl"
      style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
    >
      
    </motion.div>
  )
}

export default function Finale() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 3500)
    const t3 = setTimeout(() => setPhase(3), 6000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pb-20 pt-24 md:pt-28">
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 2 }}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-4 text-center">
        {phase >= 1 && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="whitespace-pre-wrap font-display text-xl leading-relaxed text-white/90 sm:text-2xl md:text-3xl"
          >
            {SITE.finaleText}
          </motion.pre>
        )}
        {phase >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 font-script text-5xl leading-tight text-romance-pink sm:mt-16 sm:text-6xl md:text-8xl"
          >
            {SITE.finaleClosing}
          </motion.p>
        )}
      </div>
      {phase >= 3 && (
        <>
          {[12, 30, 50, 70, 88].map((x, i) => (
            <Rose key={x} x={x} delay={i * 0.2} />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,107,157,0.15)_0%,_transparent_60%)]"
          />
        </>
      )}
    </section>
  )
}
