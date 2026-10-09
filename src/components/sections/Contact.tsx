import { useState, type FormEvent } from 'react'
import { socialLinks } from '../../data/content'
import { sendContact, type ContactPayload } from '../../services/contact'
import { ArrowIcon } from '../ui/ArrowIcon'
import { SectionLabel } from '../ui/SectionLabel'
import { usePreferences } from '../../contexts/PreferencesContext'

type Errors = Partial<Record<keyof ContactPayload, string>>
type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'unavailable'
const initialForm: ContactPayload = { name: '', email: '', inquiryType: '', message: '' }

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
  const { t } = usePreferences()
  const update = (field: keyof ContactPayload, value: string) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); if (status !== 'idle') setStatus('idle') }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return
    const nextErrors = validate(form, t)
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); setStatus('error'); return }
    setStatus('sending')
    try { await sendContact(form); setStatus('success'); setForm(initialForm) }
    catch (error) { setStatus(error instanceof Error && error.message === 'NOT_CONFIGURED' ? 'unavailable' : 'error') }
  }

  const message = status === 'success' ? t('contact.success') : status === 'unavailable' ? t('contact.unavailable') : status === 'error' && !Object.keys(errors).length ? t('contact.failed') : ''

  return (
    <footer className="contact contact--form" id="contacto">
      <SectionLabel index="05" light>{t('contact.label')}</SectionLabel>
      <div className="contact-form-layout">
        <div className="contact-form-layout__intro"><p>{t('contact.kicker')}</p><h2>{t('contact.title1')}<br /><em>{t('contact.title2')}</em></h2><span>{t('contact.note')}</span></div>
        <form className="contact-form" onSubmit={submit} noValidate>
          <label><span>01 / {t('contact.name')}</span><input value={form.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} autoComplete="name" placeholder={t('contact.namePlaceholder')} />{errors.name && <small id="name-error">{errors.name}</small>}</label>
          <label><span>02 / {t('contact.email')}</span><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} autoComplete="email" placeholder={t('contact.emailPlaceholder')} />{errors.email && <small id="email-error">{errors.email}</small>}</label>
          <label><span>03 / {t('contact.type')}</span><select value={form.inquiryType} onChange={(event) => update('inquiryType', event.target.value)} aria-invalid={Boolean(errors.inquiryType)} aria-describedby={errors.inquiryType ? 'type-error' : undefined}><option value="">{t('contact.select')}</option><option value="website">{t('contact.web')}</option><option value="application">{t('contact.app')}</option><option value="improvement">{t('contact.improve')}</option><option value="job">{t('contact.job')}</option><option value="other">{t('contact.other')}</option></select>{errors.inquiryType && <small id="type-error">{errors.inquiryType}</small>}</label>
          <label><span>04 / {t('contact.project')}</span><textarea value={form.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} rows={4} placeholder={t('contact.projectPlaceholder')} />{errors.message && <small id="message-error">{errors.message}</small>}<i>{form.message.length} {t('contact.characters')}</i></label>
          <p className="contact-form__privacy">{t('contact.privacy')}</p>
          <button className="contact-form__submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t('contact.sending') : <>{t('contact.send')} <ArrowIcon direction="up-right" /></>}</button>
          <div className={`contact-form__status contact-form__status--${status}`} role="status" aria-live="polite">{message}</div>
        </form>
      </div>
      <div className="contact__footer"><a href="#inicio">Agustín © 2026</a><div><span>{socialLinks.github ? 'GitHub' : t('contact.githubPending')}</span><span>{socialLinks.linkedin ? 'LinkedIn' : t('contact.linkedinPending')}</span><span>{t('contact.resume')}</span></div><a href="#inicio">{t('contact.top')}</a></div>
    </footer>
  )
}
