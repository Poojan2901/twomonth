import { useMemo } from 'react'
import { motion } from 'framer-motion'

const HEART_CHARS = ['♥', '♡', '💕', '💗']
const HEART_COLORS = [
  'rgba(248, 180, 196, 0.85)',
  'rgba(255, 107, 157, 0.75)',
  'rgba(232, 160, 176, 0.7)',
  'rgba(255, 182, 193, 0.8)',
]

function FloatingHeart({ heart }) {
  return (
    <motion.span
      className="pointer-events-none absolute select-none"
      style={{
        left: `${heart.x}%`,
        fontSize: heart.size,
        color: heart.color,
        filter: `blur(${heart.blur}px) drop-shadow(0 0 ${heart.glow}px rgba(255,107,157,0.4))`,
      }}
      initial={{ y: '110vh', x: 0, opacity: 0, rotate: heart.rotate }}
      animate={{
        y: '-15vh',
        x: [0, heart.drift, -heart.drift * 0.6, heart.drift * 0.4, 0],
        opacity: [0, heart.opacity, heart.opacity, heart.opacity * 0.6, 0],
        rotate: [heart.rotate, heart.rotate + 20, heart.rotate - 15, heart.rotate + 10],
      }}
      transition={{
        duration: heart.duration,
        delay: heart.delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      aria-hidden
    >
      {heart.char}
    </motion.span>
  )
}

function Sparkle({ sparkle }) {
  return (
    <motion.span
      className="pointer-events-none absolute text-white"
      style={{
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        fontSize: sparkle.size,
      }}
      animate={{
        opacity: [0.1, 0.7, 0.1],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: sparkle.duration,
        delay: sparkle.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden
    >
      ✦
    </motion.span>
  )
}

function GlowOrb({ orb }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: `${orb.x}%`,
        top: `${orb.y}%`,
        width: orb.size,
        height: orb.size,
        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.35, 0.15],
        x: [0, orb.moveX, 0],
        y: [0, orb.moveY, 0],
      }}
      transition={{
        duration: orb.duration,
        delay: orb.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden
    />
  )
}

export default function HeroBackground() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 18 + 10,
        duration: Math.random() * 12 + 14,
        delay: Math.random() * 14,
        drift: Math.random() * 40 + 20,
        opacity: Math.random() * 0.35 + 0.25,
        rotate: Math.random() * 40 - 20,
        blur: Math.random() > 0.7 ? 1 : 0,
        glow: Math.random() * 6 + 2,
        char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      })),
    []
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      })),
    []
  )

  const orbs = useMemo(
    () => [
      { id: 0, x: 15, y: 20, size: 280, color: 'rgba(255, 107, 157, 0.25)', duration: 8, delay: 0, moveX: 20, moveY: -15 },
      { id: 1, x: 70, y: 55, size: 320, color: 'rgba(232, 160, 176, 0.2)', duration: 10, delay: 1, moveX: -25, moveY: 20 },
      { id: 2, x: 45, y: 75, size: 200, color: 'rgba(255, 182, 193, 0.18)', duration: 7, delay: 2, moveX: 15, moveY: -10 },
    ],
    []
  )

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(60, 20, 45, 0.9) 0%, rgba(10, 10, 15, 1) 70%)',
            'radial-gradient(ellipse 85% 65% at 55% 45%, rgba(70, 25, 50, 0.85) 0%, rgba(10, 10, 15, 1) 70%)',
            'radial-gradient(ellipse 80% 60% at 45% 38%, rgba(55, 18, 42, 0.9) 0%, rgba(10, 10, 15, 1) 70%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,157,0.12)_0%,transparent_50%)]"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(248,180,196,0.1)_0%,transparent_45%)]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {orbs.map((orb) => (
        <GlowOrb key={orb.id} orb={orb} />
      ))}

      {sparkles.map((s) => (
        <Sparkle key={s.id} sparkle={s} />
      ))}

      {hearts.map((h) => (
        <FloatingHeart key={h.id} heart={h} />
      ))}

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,15,0.55)_100%)]"
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-romance-black/40 via-transparent to-romance-black/80"
        aria-hidden
      />
    </motion.div>
  )
}
