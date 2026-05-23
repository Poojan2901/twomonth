import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { OPEN_WHEN } from '../data/content'

function OpenWhenCard({ card }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div layout className="flex h-full w-full flex-col">
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="glass flex min-h-[8.5rem] w-full flex-col items-start justify-center rounded-2xl p-6 text-left transition hover:border-romance-pink/40"
        whileHover={{ scale: 1.01 }}
      >
        <span className="text-3xl leading-none">{card.emoji}</span>
        <p className="mt-3 font-display text-lg leading-snug text-white sm:text-xl">
          {card.label}
        </p>
        <p className="mt-2 text-sm text-white/40">{open ? 'Tap to close' : 'Tap to open'}</p>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-2xl border border-romance-pink/20 bg-romance-dark/90 p-5 sm:p-6">
              {card.image && (
                <img
                  src={card.image}
                  alt=""
                  className="mb-4 aspect-video w-full rounded-lg object-cover"
                />
              )}
              <p className="whitespace-pre-line text-base leading-relaxed text-white/90 sm:text-lg">
                {card.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function OpenWhen() {
  return (
    <PageSection>
      <SectionHeader
        title="Open When…"
        subtitle="Un palon ke liye jab main tumhare paas nahi ho sakta"
      />
      <div className="card-grid-equal mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {OPEN_WHEN.map((card) => (
          <OpenWhenCard key={card.id} card={card} />
        ))}
      </div>
    </PageSection>
  )
}
