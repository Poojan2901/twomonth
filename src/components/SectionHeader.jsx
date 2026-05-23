import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle, accent = 'pink' }) {
  const accentClass =
    accent === 'rose' ? 'text-romance-rose' : 'text-romance-pink'

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="section-header mx-auto mb-14 max-w-3xl text-center md:mb-16"
    >
      <div className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-romance-pink/60 to-transparent" />
      <h2
        className={`font-script text-5xl leading-tight sm:text-6xl md:text-7xl ${accentClass}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-display text-base leading-relaxed text-white/65 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.header>
  )
}
