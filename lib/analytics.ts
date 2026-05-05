declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const
type UtmKey = typeof UTM_KEYS[number]
export type UtmData = Partial<Record<UtmKey, string>>

const STORAGE_KEY = 'ms_utm'

export function captureUtmFromUrl(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const captured: UtmData = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) captured[key] = value
  }
  if (Object.keys(captured).length === 0) return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured))
  } catch {}
}

export function getStoredUtm(): UtmData {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function track(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}
