import { Outlet } from 'react-router-dom'
import Particles from './Particles'
import Nav from './Nav'
import MobileNav from './MobileNav'
import HiddenStars from './HiddenStars'

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-romance-black">
      <Particles />
      <HiddenStars />
      <Nav />
      <MobileNav />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  )
}
