import { usePreferences } from '../../contexts/PreferencesContext'

export function PreferenceControls() {
  const { language, setLanguage, theme, toggleTheme, t } = usePreferences()
  return (
    <div className="preference-controls">
      <div className="language-switch" role="group" aria-label={t('controls.language')}>
        <button type="button" aria-pressed={language === 'es'} onClick={() => setLanguage('es')}>ES</button><span>/</span><button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
      </div>
      <button className="theme-switch" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? t('controls.theme.light') : t('controls.theme.dark')} aria-pressed={theme === 'light'}><span aria-hidden="true">{theme === 'dark' ? '☼' : '☾'}</span></button>
    </div>
  )
}
