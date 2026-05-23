import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import PageSection from '../components/PageSection'
import SectionHeader from '../components/SectionHeader'
import { QUIZ_QUESTIONS, DATE_GUESSES, GALLERY } from '../data/content'

function GameCard({ title, children, className = '' }) {
  return (
    <div
      className={`glass flex h-full min-h-[280px] flex-col rounded-2xl p-6 ${className}`}
    >
      {title && (
        <h3 className="mb-4 shrink-0 font-display text-lg text-romance-pink">{title}</h3>
      )}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

function MemoryQuiz() {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const q = QUIZ_QUESTIONS[idx]

  const answer = (i) => {
    if (i === q.answer) setScore((s) => s + 1)
    if (idx + 1 >= QUIZ_QUESTIONS.length) setDone(true)
    else setIdx((x) => x + 1)
  }

  if (done) {
    return (
      <GameCard>
        <p className="flex flex-1 items-center justify-center text-center font-display text-lg leading-relaxed text-romance-pink sm:text-xl">
          You got {score}/{QUIZ_QUESTIONS.length}. You know us well ❤️
        </p>
      </GameCard>
    )
  }

  return (
    <GameCard title="Memory Quiz">
      <p className="font-display text-base leading-snug text-white/90">{q.q}</p>
      <div className="mt-4 flex flex-1 flex-col justify-center gap-2">
        {q.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => answer(i)}
            className="w-full rounded-lg border border-white/10 px-4 py-3 text-left text-sm transition hover:border-romance-pink/30 hover:bg-romance-pink/10 sm:text-base"
          >
            {opt}
          </button>
        ))}
      </div>
    </GameCard>
  )
}

function GuessDate() {
  const [idx, setIdx] = useState(0)
  const [guess, setGuess] = useState('')
  const [msg, setMsg] = useState('')
  const item = DATE_GUESSES[idx]

  const check = () => {
    if (guess === item.date) {
      setMsg('Perfect! You remember 💕')
      setTimeout(() => {
        setMsg('')
        setGuess('')
        setIdx((i) => (i + 1) % DATE_GUESSES.length)
      }, 1500)
    } else {
      setMsg('Not quite. Try again!')
    }
  }

  return (
    <GameCard title="Guess the Date">
      <p className="text-white/85">
        <span className="text-romance-pink">{item.event}</span>
      </p>
      <div className="mt-auto space-y-3 pt-6">
        <input
          type="date"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-black/30 px-3 py-2.5 text-white outline-none focus:border-romance-pink/50"
        />
        <button
          type="button"
          onClick={check}
          className="w-full rounded-lg bg-romance-rose/40 py-2.5 font-display transition hover:bg-romance-rose/55"
        >
          Check
        </button>
        {msg && <p className="text-center text-sm text-romance-pink">{msg}</p>}
      </div>
    </GameCard>
  )
}

function PhotoPuzzle() {
  const photo = GALLERY[0]
  const [tiles, setTiles] = useState([])
  const size = 3
  const tileSize = 72

  const shuffle = useCallback(() => {
    const arr = Array.from({ length: size * size }, (_, i) => i)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setTiles(arr)
  }, [])

  useEffect(() => shuffle(), [shuffle])

  const move = (index) => {
    const empty = tiles.indexOf(size * size - 1)
    const row = Math.floor(index / size)
    const col = index % size
    const er = Math.floor(empty / size)
    const ec = empty % size
    if (Math.abs(row - er) + Math.abs(col - ec) !== 1) return
    const next = [...tiles]
    ;[next[index], next[empty]] = [next[empty], next[index]]
    setTiles(next)
  }

  const solved = tiles.length > 0 && tiles.every((t, i) => t === i)
  const gridWidth = size * tileSize + (size - 1) * 4

  return (
    <GameCard title="Photo Puzzle" className="items-center text-center">
      <p className="mb-4 text-sm text-white/60">Slide tiles to solve</p>
      <div
        className="mx-auto grid shrink-0 gap-1"
        style={{
          gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
          width: gridWidth,
        }}
      >
        {tiles.map((tile, index) => {
          const row = Math.floor(tile / size)
          const col = tile % size
          const isEmpty = tile === size * size - 1
          return (
            <button
              key={index}
              type="button"
              onClick={() => move(index)}
              className="overflow-hidden rounded border border-white/20"
              style={{
                width: tileSize,
                height: tileSize,
                ...(isEmpty
                  ? { background: '#1a1a22' }
                  : {
                      backgroundImage: `url(${photo.src})`,
                      backgroundSize: `${size * 100}%`,
                      backgroundPosition: `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`,
                    }),
              }}
              aria-label={isEmpty ? 'empty' : `tile ${tile}`}
            />
          )
        })}
      </div>
      {solved && (
        <p className="mt-4 text-romance-pink">You solved us! 🎉</p>
      )}
      <button
        type="button"
        onClick={shuffle}
        className="mt-4 text-sm text-white/50 transition hover:text-white"
      >
        Shuffle again
      </button>
    </GameCard>
  )
}

function CatchHearts() {
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState([])
  const [playing, setPlaying] = useState(false)
  const idRef = useRef(0)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      const id = idRef.current++
      setHearts((h) => [
        ...h.slice(-12),
        { id, x: 12 + Math.random() * 76, duration: 2 + Math.random() * 2 },
      ])
      setTimeout(() => {
        setHearts((h) => h.filter((heart) => heart.id !== id))
      }, 4000)
    }, 650)
    return () => clearInterval(interval)
  }, [playing])

  const catchHeart = (id) => {
    setHearts((h) => h.filter((heart) => heart.id !== id))
    setScore((s) => s + 1)
  }

  return (
    <GameCard title="Catch the Hearts">
      <p className="text-sm text-white/50">
        Score: <span className="tabular-nums text-romance-pink">{score}</span>
      </p>
      <div className="relative mt-3 flex-1 min-h-[12rem] overflow-hidden rounded-xl bg-black/40">
        {hearts.map((heart) => (
          <motion.button
            key={heart.id}
            type="button"
            initial={{ top: '-8%' }}
            animate={{ top: '108%' }}
            transition={{ duration: heart.duration, ease: 'linear' }}
            onClick={() => catchHeart(heart.id)}
            className="absolute -translate-x-1/2 text-2xl leading-none"
            style={{ left: `${heart.x}%` }}
          >
            ♥
          </motion.button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setPlaying(true)
          setScore(0)
          setHearts([])
        }}
        className="mt-4 w-full rounded-lg bg-romance-glow/50 py-2.5 font-display transition hover:bg-romance-glow/65"
      >
        {playing ? 'Playing…' : 'Start Game'}
      </button>
    </GameCard>
  )
}

export default function Games() {
  return (
    <PageSection>
      <SectionHeader
        title="Little Games"
        subtitle="Because love should be fun too"
      />
      <div className="card-grid-equal mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <MemoryQuiz />
        <GuessDate />
        <PhotoPuzzle />
        <CatchHearts />
      </div>
    </PageSection>
  )
}
