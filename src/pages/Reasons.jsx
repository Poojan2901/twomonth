import { useState } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { REASONS } from '../data/content'

function FlipCard({ front, back, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="h-full min-h-[14rem] w-full cursor-pointer perspective-[1000px] sm:min-h-[15rem]"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="relative h-full min-h-[14rem] w-full sm:min-h-[15rem]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="glass absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-6 text-center transition hover:shadow-[0_0_40px_rgba(255,107,157,0.2)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="font-display text-xl leading-snug text-romance-pink sm:text-2xl">
            {front}
          </p>
          <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/40">
            tap to flip
          </p>
        </div>
        <div
          className="glass absolute inset-0 flex items-center justify-center rounded-2xl border border-romance-glow/30 bg-romance-dark/90 p-6 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-base leading-relaxed text-white/90 sm:text-lg">{back}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Reasons() {
  return (
    <PageSection>
      <SectionHeader
        title="Reasons I Love You"
        subtitle="Flip each card, if you dare to melt"
      />
      <div className="card-grid-equal mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <FlipCard key={r.front} {...r} index={i} />
        ))}
      </div>
    </PageSection>
  )
}
