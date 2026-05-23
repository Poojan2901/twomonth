import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Typewriter from '../components/Typewriter'
import LiveCounter from '../components/LiveCounter'
import HeroBackground from '../components/HeroBackground'
import { SITE } from '../data/content'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pt-32">
      <HeroBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <p className="font-script text-5xl leading-none text-romance-pink sm:text-6xl md:text-8xl">
          {SITE.title}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/50 sm:text-sm sm:tracking-[0.4em]">
          {SITE.subtitle}
        </p>

        <h1 className="mt-10 min-h-[4.5rem] w-full font-display text-xl leading-relaxed text-white/90 sm:min-h-[5rem] sm:text-2xl md:mt-12 md:text-3xl">
          <Typewriter text={SITE.heroTypewriter} speed={45} />
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          {SITE.heroSubtitle}
        </p>

        <motion.div
          className="mt-10 flex justify-center"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Link to="/timeline">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-romance-rose to-romance-glow px-10 font-display text-base text-white shadow-lg shadow-romance-glow/25 sm:px-12 sm:text-lg"
            >
              Begin Our Story
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          className="mt-14 w-full sm:mt-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <LiveCounter />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-sm text-white/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden
      >
        ↓ scroll
      </motion.div>
    </section>
  )
}
