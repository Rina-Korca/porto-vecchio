"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "cookie-consent"

type CookiePreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

type ConsentState = {
  decidedAt: string
  preferences: CookiePreferences
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const readStoredConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (!parsed?.preferences?.necessary) return null
    return parsed
  } catch {
    return null
  }
}

const storeConsent = (preferences: CookiePreferences) => {
  if (typeof window === "undefined") return
  const payload: ConsentState = {
    decidedAt: new Date().toISOString(),
    preferences,
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: payload }))
}

export const hasAnalyticsConsent = (): boolean => {
  return readStoredConsent()?.preferences.analytics === true
}

export const openCookiePreferences = () => {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event("cookie-consent-open"))
}

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

  useEffect(() => {
    const stored = readStoredConsent()
    if (!stored) {
      setIsOpen(true)
      return
    }
    setPreferences(stored.preferences)
  }, [])

  useEffect(() => {
    const openHandler = () => {
      const stored = readStoredConsent()
      setPreferences(stored?.preferences ?? defaultPreferences)
      setIsOpen(true)
      setShowPreferences(true)
    }
    window.addEventListener("cookie-consent-open", openHandler)
    return () => window.removeEventListener("cookie-consent-open", openHandler)
  }, [])

  const acceptAll = () => {
    storeConsent({ necessary: true, analytics: true, marketing: true })
    setIsOpen(false)
    setShowPreferences(false)
  }

  const rejectAll = () => {
    storeConsent({ necessary: true, analytics: false, marketing: false })
    setIsOpen(false)
    setShowPreferences(false)
  }

  const savePreferences = () => {
    storeConsent({ ...preferences, necessary: true })
    setIsOpen(false)
    setShowPreferences(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-[#1a1210]/97 text-smoke shadow-2xl">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-serif font-medium text-white">Cookie-Einstellungen</p>
            <p className="text-sm text-smoke/70">
              Wir verwenden technisch notwendige Cookies, um die Website sicher zu betreiben.
              Analyse-Cookies (Google Analytics) setzen wir nur mit Ihrer Einwilligung
              (TTDSG/DSGVO). Weitere Details finden Sie in unserer Cookie-Richtlinie.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full border border-smoke/30 px-4 py-2 text-sm font-medium text-smoke transition hover:border-smoke/60 hover:text-white"
              onClick={() => setShowPreferences((prev) => !prev)}
            >
              Einstellungen
            </button>
            <button
              type="button"
              className="rounded-full border border-smoke/30 px-4 py-2 text-sm font-medium text-smoke transition hover:border-smoke/60 hover:text-white"
              onClick={rejectAll}
            >
              Ablehnen
            </button>
            <button
              type="button"
              className="rounded-full bg-strawberry px-4 py-2 text-sm font-semibold text-white transition hover:bg-strawberry/80"
              onClick={acceptAll}
            >
              Alle akzeptieren
            </button>
          </div>
        </div>

        {showPreferences ? (
          <div className="mt-6 rounded-2xl border border-smoke/20 bg-black/20 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">Notwendig</p>
                <p className="text-xs text-smoke/70">
                  Diese Cookies sind für den technischen Betrieb und die Sicherheit der Website
                  erforderlich.
                </p>
                <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-[11px] text-smoke">
                  Immer aktiv
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Analyse</p>
                  <label className="inline-flex items-center gap-2 text-xs text-smoke">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-strawberry"
                      checked={preferences.analytics}
                      onChange={(event) =>
                        setPreferences((prev) => ({
                          ...prev,
                          analytics: event.target.checked,
                        }))
                      }
                    />
                    Aktivieren
                  </label>
                </div>
                <p className="text-xs text-smoke/70">
                  Google Analytics zur anonymisierten Reichweitenmessung.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-smoke/30 px-4 py-2 text-sm font-medium text-smoke transition hover:border-smoke/60"
                onClick={() => setShowPreferences(false)}
              >
                Abbrechen
              </button>
              <button
                type="button"
                className="rounded-full bg-strawberry px-4 py-2 text-sm font-semibold text-white transition hover:bg-strawberry/80"
                onClick={savePreferences}
              >
                Auswahl speichern
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
