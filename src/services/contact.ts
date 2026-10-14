export interface ContactPayload { name: string; email: string; inquiryType: string; message: string }
export interface ContactSubmissionOptions {
  labels: { name: string; inquiryType: string; message: string }
  inquiryType: string
  honeypot?: string
}

export async function sendContact(payload: ContactPayload, options: ContactSubmissionOptions): Promise<void> {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()
  if (!endpoint) throw new Error('NOT_CONFIGURED')

  const submission = {
    [options.labels.name]: payload.name,
    email: payload.email,
    [options.labels.inquiryType]: options.inquiryType,
    [options.labels.message]: payload.message,
    _gotcha: options.honeypot ?? '',
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) throw new Error('REQUEST_FAILED')
}
