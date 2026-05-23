import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { LOVE_LETTER, DAILY_LOVE_PROMPTS, SITE } from '../data/content'

export default function LoveLetter() {
  const [visibleChars, setVisibleChars] = useState(0)
  const [dynamicLine, setDynamicLine] = useState('')

  useEffect(() => {
    if (visibleChars >= LOVE_LETTER.length) return
    const t = setTimeout(() => setVisibleChars((c) => c + 1), 28)
    return () => clearTimeout(t)
  }, [visibleChars])

  useEffect(() => {
    const prompt = DAILY_LOVE_PROMPTS[Math.floor(Math.random() * DAILY_LOVE_PROMPTS.length)]
    setDynamicLine(`Today I love you because ${prompt}.`)
  }, [])

  return (
    <PageSection>
      <SectionHeader title="A Letter For You" accent="rose" />

      <motion.div
        initial={{ opacity: 0, rotate: -0.5 }}
        animate={{ opacity: 1, rotate: 0 }}
        className="paper-texture mx-auto w-full max-w-2xl rounded-sm p-8 shadow-2xl sm:p-10 md:p-14"
      >
        <p className="font-script text-3xl text-[#5c4033] sm:text-4xl">
          Dear {SITE.herName},
        </p>
        <pre className="mt-6 whitespace-pre-wrap font-body text-base leading-loose text-[#3d2914] sm:mt-8 sm:text-lg">
          {LOVE_LETTER.slice(0, visibleChars)}
          {visibleChars < LOVE_LETTER.length && (
            <span className="inline-block w-0.5 animate-pulse bg-[#5c4033] align-middle">
              |
            </span>
          )}
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass mx-auto mt-10 flex w-full max-w-xl flex-col items-center rounded-2xl p-6 text-center sm:mt-12 sm:p-8"
      >
        <p className="text-xs uppercase tracking-widest text-romance-pink/80">
          Today&apos;s love note
        </p>
        <p className="mt-4 max-w-md font-display text-lg italic leading-relaxed text-white/90 sm:text-xl">
          {dynamicLine}
        </p>
        <button
          type="button"
          onClick={() => {
            const p = DAILY_LOVE_PROMPTS[Math.floor(Math.random() * DAILY_LOVE_PROMPTS.length)]
            setDynamicLine(`Today I love you because ${p}.`)
          }}
          className="mt-5 rounded-full border border-romance-pink/30 px-5 py-2 text-sm text-romance-pink transition hover:bg-romance-pink/10"
        >
          Generate another ✨
        </button>
      </motion.div>
    </PageSection>
  )
}
