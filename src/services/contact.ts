export interface ContactPayload { name: string; email: string; inquiryType: string; message: string }

export async function sendContact(payload: ContactPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  if (!endpoint) throw new Error('NOT_CONFIGURED')
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) })
  if (!response.ok) throw new Error('REQUEST_FAILED')
}
