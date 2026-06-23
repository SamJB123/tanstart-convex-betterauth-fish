import { fetchAuth } from '~/library/server'

// Upload a file to the Convex `/uploadFile` HTTP action (convex/http.ts) and get
// back the storage id. The whole upload is one authenticated request (the
// "custom HTTP action" path): we attach the current Convex JWT as a Bearer token
// so the action's auth gate accepts it. Use the id with
// licensing/attestation:attachEvidence.
export async function uploadFile(file: Blob): Promise<string> {
  const siteUrl = import.meta.env.VITE_CONVEX_SITE_URL as string
  const { token } = await fetchAuth()
  const res = await fetch(`${siteUrl}/uploadFile`, {
    method: 'POST',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: file,
  })
  if (!res.ok) {
    throw new Error(`Upload failed (${res.status}). ${res.status === 401 ? 'Please sign in again.' : ''}`)
  }
  const { storageId } = (await res.json()) as { storageId: string }
  return storageId
}
