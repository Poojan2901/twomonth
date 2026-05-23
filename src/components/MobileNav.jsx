import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/timeline', label: 'Story' },
  { to: '/reasons', label: 'Why You' },
  { to: '/voice', label: 'Voice' },
  { to: '/letter', label: 'Letter' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/open-when', label: 'Open When' },
  { to: '/games', label: 'Games' },
  { to: '/finale', label: 'Finale' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 left-5 z-50 md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="glass flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-lg"
        aria-label="Menu"
        aria-expanded={open}
      >
        {open ? '✕' : '☰'}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] bg-black/50"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              className="glass-strong absolute bottom-14 left-0 w-52 overflow-hidden rounded-2xl p-2 shadow-xl"
            >
              <ul className="max-h-[60vh] overflow-y-auto">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center rounded-xl px-4 py-2.5 font-display text-sm transition ${
                          isActive
                            ? 'bg-romance-pink/20 text-romance-pink'
                            : 'text-white/85 hover:bg-white/5'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
