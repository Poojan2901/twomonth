import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

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

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-strong fixed left-1/2 top-3 z-40 hidden w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-2xl px-3 py-2 md:block"
    >
      <ul className="flex flex-wrap items-center justify-center gap-0.5">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1.5 font-display text-xs transition xl:px-3 xl:text-sm ${
                  isActive
                    ? 'bg-romance-pink/20 text-romance-pink'
                    : 'text-white/70 hover:text-romance-pink'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
