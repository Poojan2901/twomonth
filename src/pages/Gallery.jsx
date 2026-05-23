import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { GALLERY } from '../data/content'

function Polaroid({ photo, index, onExpand }) {
  const rotation = (index % 5) * 3 - 6

  return (
    <motion.div
      drag
      dragConstraints={{ left: -60, right: 60, top: -30, bottom: 30 }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      className="flex shrink-0 cursor-grab justify-center active:cursor-grabbing"
      style={{ rotate: rotation }}
      onClick={() => onExpand(photo)}
    >
      <div className="w-[13.5rem] bg-white p-3 pb-10 shadow-xl sm:w-[14.5rem]">
        <img
          src={photo.src}
          alt={photo.caption}
          className="aspect-square w-full object-cover"
          draggable={false}
        />
        <p className="mt-3 line-clamp-2 text-center font-body text-sm leading-snug text-[#3d2914]">
          {photo.caption}
        </p>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [expanded, setExpanded] = useState(null)

  return (
    <PageSection>
      <SectionHeader
        title="Memory Gallery"
        subtitle="Drag the polaroids. Click to expand."
      />

      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-x-6 gap-y-10 px-2">
        {GALLERY.map((photo, i) => (
          <Polaroid
            key={`${photo.src}-${i}`}
            photo={photo}
            index={i}
            onExpand={setExpanded}
          />
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-6"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={expanded.src}
                alt=""
                className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
              />
              <p className="mt-6 max-w-md text-center font-display text-lg text-romance-pink sm:text-xl">
                {expanded.caption}
              </p>
              <button
                type="button"
                className="mt-5 rounded-full border border-white/20 px-6 py-2 text-sm text-white/60 transition hover:border-romance-pink/40 hover:text-white"
                onClick={() => setExpanded(null)}
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageSection>
  )
}
