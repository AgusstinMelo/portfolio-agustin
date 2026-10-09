import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, type Language, type TranslationKey } from '../i18n/translations'

export type Theme = 'dark' | 'light'
interface PreferencesValue { language: Language; setLanguage: (language: Language) => void; theme: Theme; toggleTheme: () => void; t: (key: TranslationKey) => string }
const PreferencesContext = createContext<PreferencesValue | null>(null)

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio-language')
    if (saved === 'es' || saved === 'en') return saved
    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
  } catch { return 'en' }
}
function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'dark' || saved === 'light') return saved
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch { return 'dark' }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const t = (key: TranslationKey) => translations[language][key]
  const setLanguage = (next: Language) => { try { localStorage.setItem('portfolio-language', next) } catch { /* Storage may be unavailable. */ } setLanguageState(next) }
  const toggleTheme = () => setTheme((current) => { const next = current === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('portfolio-theme', next) } catch { /* Storage may be unavailable. */ } return next })

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('meta.title'))
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('meta.description'))
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'es' ? 'es_ES' : 'en_US')
  }, [language])
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme }, [theme])

  const value = useMemo(() => ({ language, setLanguage, theme, toggleTheme, t }), [language, theme])
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error('usePreferences must be used inside PreferencesProvider')
  return context
}
