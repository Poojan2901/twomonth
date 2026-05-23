import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PasswordGate from './components/PasswordGate'
import Layout from './components/Layout'
import Hero from './pages/Hero'
import Timeline from './pages/Timeline'
import Reasons from './pages/Reasons'
import VoiceNotes from './pages/VoiceNotes'
import LoveLetter from './pages/LoveLetter'
import Gallery from './pages/Gallery'
import OpenWhen from './pages/OpenWhen'
import Games from './pages/Games'
import Finale from './pages/Finale'

function AppRoutes() {
  const { unlocked } = useAuth()

  if (!unlocked) {
    return <PasswordGate />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="reasons" element={<Reasons />} />
        <Route path="voice" element={<VoiceNotes />} />
        <Route path="letter" element={<LoveLetter />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="open-when" element={<OpenWhen />} />
        <Route path="games" element={<Games />} />
        <Route path="finale" element={<Finale />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
