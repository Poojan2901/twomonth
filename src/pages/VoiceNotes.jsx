import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { VOICE_NOTES } from '../data/content'

function Waveform({ active }) {
  return (
    <div className="flex h-10 w-full items-end justify-center gap-1 py-2">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 shrink-0 rounded-full bg-romance-pink"
          animate={active ? { height: [4, 8 + Math.random() * 20, 4] } : { height: 4 }}
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: active ? Infinity : 0,
            delay: i * 0.03,
          }}
        />
      ))}
    </div>
  )
}

function VoiceCard({ note }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!note.src) {
      alert('Add your voice note to public/voice-notes/ and set src in content.js')
      return
    }
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const end = () => setPlaying(false)
    el.addEventListener('ended', end)
    return () => el.removeEventListener('ended', end)
  }, [])

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass flex h-full flex-col rounded-2xl p-6"
    >
      {note.src && <audio ref={audioRef} src={note.src} preload="metadata" />}
      <p className="font-display text-lg text-romance-pink">{note.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{note.message}</p>
      <div className="my-4 flex flex-1 items-center justify-center">
        <Waveform active={playing} />
      </div>
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex min-w-[7rem] items-center justify-center rounded-full bg-romance-rose/30 px-6 py-2.5 font-display text-sm transition hover:bg-romance-rose/50"
        >
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <span className="shrink-0 text-xs tabular-nums text-white/40">{note.duration}</span>
      </div>
    </motion.div>
  )
}

export default function VoiceNotes() {
  return (
    <PageSection>
      <SectionHeader
        title="Voice Notes"
        subtitle="🎙️ Words I could not only type"
      />
      <div className="card-grid-equal mx-auto grid max-w-2xl grid-cols-1 gap-6">
        {VOICE_NOTES.map((n) => (
          <VoiceCard key={n.id} note={n} />
        ))}
      </div>
    </PageSection>
  )
}
