import { createContext, useContext, useState, useCallback } from 'react'
import { SITE } from '../data/content'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem('our60days_unlocked') === 'true'
  })
  const [error, setError] = useState('')

  const tryUnlock = useCallback((answer) => {
    const normalized = answer.trim().toLowerCase().replace(/\s+/g, ' ')
    const valid = SITE.secretAnswers.some(
      (a) => a.toLowerCase().replace(/\s+/g, ' ') === normalized
    )
    if (valid) {
      sessionStorage.setItem('our60days_unlocked', 'true')
      setUnlocked(true)
      setError('')
      return true
    }
    setError('That date is not quite right… try again, love.')
    return false
  }, [])

  return (
    <AuthContext.Provider value={{ unlocked, tryUnlock, error, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
