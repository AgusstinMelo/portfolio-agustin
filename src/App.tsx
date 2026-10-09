import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { About } from './components/sections/About'
import { Technologies } from './components/sections/Technologies'
import { HowIWork } from './components/sections/HowIWork'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Technologies />
        <HowIWork />
      </main>
      <Contact />
    </>
  )
}
