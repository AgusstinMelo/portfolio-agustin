import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { AboutPreview, ContactPreview, TechnologiesPreview } from './components/sections/PreviewSections'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <AboutPreview />
        <TechnologiesPreview />
      </main>
      <ContactPreview />
    </>
  )
}
