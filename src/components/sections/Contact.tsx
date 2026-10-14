import { useEffect, useState, type FormEvent } from 'react'
import { socialLinks } from '../../data/content'
import { sendContact, type ContactPayload } from '../../services/contact'
import { ArrowIcon } from '../ui/ArrowIcon'
import { SectionLabel } from '../ui/SectionLabel'
import { usePreferences } from '../../contexts/PreferencesContext'
import type { TranslationKey } from '../../i18n/translations'

type Errors = Partial<Record<keyof ContactPayload, string>>
type FormStatus = 'idle' | 'sending' | 'success' | 'error'
const initialForm: ContactPayload = { name: '', email: '', inquiryType: '', message: '' }
const backgroundCode = ['while (curious) {', '  learn();', '  build();', '}']
const inquiryTypeKeys: Record<string, TranslationKey> = {
  website: 'contact.web',
  application: 'contact.app',
  improvement: 'contact.improve',
  job: 'contact.job',
  other: 'contact.other',
}

function getDayOfYear(date: Date) {
  return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86_400_000)
}

function validate(form: ContactPayload, t: ReturnType<typeof usePreferences>['t']): Errors {
  const errors: Errors = {}
  if (form.name.trim().length < 2) errors.name = t('contact.nameError')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('contact.emailError')
  if (!form.inquiryType) errors.inquiryType = t('contact.typeError')
  if (form.message.trim().length < 20) errors.message = t('contact.messageError')
  return errors
}

export function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [honeypot, setHoneypot] = useState('')
  const [firstLine, setFirstLine] = useState(() => getDayOfYear(new Date()))
  const { t } = usePreferences()
  const update = (field: keyof ContactPayload, value: string) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); if (status !== 'idle') setStatus('idle') }

  useEffect(() => {
    let timer = 0
    const scheduleNextDay = () => {
      const now = new Date()
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      timer = window.setTimeout(() => {
        setFirstLine(getDayOfYear(new Date()))
        scheduleNextDay()
      }, nextDay.getTime() - now.getTime() + 1000)
    }
    scheduleNextDay()
    return () => window.clearTimeout(timer)
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return
    const nextErrors = validate(form, t)
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); setStatus('error'); return }
    const inquiryTypeKey = inquiryTypeKeys[form.inquiryType]
    if (!inquiryTypeKey) { setErrors({ inquiryType: t('contact.typeError') }); setStatus('error'); return }
    setStatus('sending')
    try {
      await sendContact(form, {
        labels: { name: t('contact.name'), inquiryType: t('contact.type'), message: t('contact.project') },
        inquiryType: t(inquiryTypeKey),
        honeypot,
      })
      setForm(initialForm)
      setHoneypot('')
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const message = status === 'success' ? t('contact.success') : status === 'error' && !Object.keys(errors).length ? t('contact.failed') : ''

  return (
    <footer className="contact contact--form" id="contacto">
      <SectionLabel index="04" light>{t('contact.label')}</SectionLabel>
      <div className="contact-code-watermark" aria-hidden="true">
        {backgroundCode.map((line, index) => <div key={line}><span>{firstLine + index}</span><code>{line}</code></div>)}
      </div>
      <div className="contact-form-layout">
        <div className="contact-form-layout__intro"><p>{t('contact.kicker')}</p><h2>{t('contact.title1')}<br /><em>{t('contact.title2')}</em></h2><span>{t('contact.note')}</span></div>
        <form className="contact-form" onSubmit={submit} noValidate>
          <input className="contact-form__honeypot" type="text" name="_gotcha" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label><span>01 / {t('contact.name')}</span><input value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} autoComplete="name" placeholder={t('contact.namePlaceholder')} />{errors.name && <small id="name-error">{errors.name}</small>}</label>
          <label><span>02 / {t('contact.email')}</span><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} autoComplete="email" placeholder={t('contact.emailPlaceholder')} />{errors.email && <small id="email-error">{errors.email}</small>}</label>
          <label><span>03 / {t('contact.type')}</span><select value={form.inquiryType} onChange={(event) => update('inquiryType', event.target.value)} aria-invalid={Boolean(errors.inquiryType)} aria-describedby={errors.inquiryType ? 'type-error' : undefined}><option value="">{t('contact.select')}</option><option value="website">{t('contact.web')}</option><option value="application">{t('contact.app')}</option><option value="improvement">{t('contact.improve')}</option><option value="job">{t('contact.job')}</option><option value="other">{t('contact.other')}</option></select>{errors.inquiryType && <small id="type-error">{errors.inquiryType}</small>}</label>
          <label><span>04 / {t('contact.project')}</span><textarea value={form.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} rows={4} placeholder={t('contact.projectPlaceholder')} />{errors.message && <small id="message-error">{errors.message}</small>}<i>{form.message.length} {t('contact.characters')}</i></label>
          <p className="contact-form__privacy">{t('contact.privacy')}</p>
          <button className="contact-form__submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t('contact.sending') : <>{t('contact.send')} <ArrowIcon direction="up-right" /></>}</button>
          <div className={`contact-form__status contact-form__status--${status}`} role="status" aria-live="polite">{message}</div>
        </form>
      </div>
      <div className="contact__footer"><a href="#inicio">Agustín Melo © 2026</a><div><a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a><a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={socialLinks.resume} target="_blank" rel="noreferrer">{t('contact.resume')}</a></div><a href="#inicio">{t('contact.top')}</a></div>
    </footer>
  )
}
