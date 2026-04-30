"use client"

import { useEffect, useState, useCallback } from "react"
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"
import { configureAmplifyClient, getErrorMessage } from "@/lib/amplify-client"
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  LogOut,
  Mail,
  Phone,
  Trash2,
  User,
  Users,
  XCircle,
  Loader2,
  List,
  CalendarDays,
  Eye,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Reservation = Schema["Reservation"]["type"]

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-600",
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Ausstehend",
  CONFIRMED: "Bestätigt",
  REJECTED: "Abgelehnt",
  CANCELLED: "Storniert",
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<"loading" | "login" | "authenticated">("loading")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    try {
      configureAmplifyClient()
    } catch (err) {
      setLoginError(getErrorMessage(err))
      setAuthState("login")
      return
    }

    getCurrentUser()
      .then(() => setAuthState("authenticated"))
      .catch(() => setAuthState("login"))
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError("")
    try {
      await signIn({ username: email, password })
      setAuthState("authenticated")
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Login fehlgeschlagen")
    } finally {
      setLoggingIn(false)
    }
  }

  async function handleLogout() {
    await signOut()
    setAuthState("login")
  }

  if (authState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-smoke">
        <Loader2 className="h-8 w-8 animate-spin text-mahogany" />
      </div>
    )
  }

  if (authState === "login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-smoke px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl text-carbon">Admin Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">Ristorante Bonfini</p>
          </div>
          {loginError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{loginError}</div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-2 border-dust bg-smoke px-4 py-3 text-carbon focus:border-mahogany focus:outline-none"
            />
            <input
              type="password"
              required
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-2 border-dust bg-smoke px-4 py-3 text-carbon focus:border-mahogany focus:outline-none"
            />
            <button
              type="submit"
              disabled={loggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-mahogany py-3 text-sm font-medium uppercase tracking-widest text-white hover:bg-garnet disabled:opacity-60"
            >
              {loggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Anmelden
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <Dashboard onLogout={handleLogout} />
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"list" | "calendar">("list")
  const [selected, setSelected] = useState<Reservation | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [loadError, setLoadError] = useState("")

  const fetchReservations = useCallback(async () => {
    setLoadError("")
    try {
      configureAmplifyClient()
      await fetchAuthSession()
      const client = generateClient<Schema>({ authMode: "userPool" })
      const { data, errors } = await client.models.Reservation.list({
        limit: 1000,
      })
      if (errors?.length) {
        throw new Error(errors[0].message)
      }
      setReservations(
        (data ?? []).sort(
          (a, b) =>
            (b.reservationDate ?? "").localeCompare(a.reservationDate ?? "") ||
            (b.reservationTime ?? "").localeCompare(a.reservationTime ?? "")
        )
      )
    } catch (err) {
      console.error("Failed to fetch reservations", err)
      setLoadError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  async function updateStatus(r: Reservation, status: "CONFIRMED" | "REJECTED" | "CANCELLED") {
    setActionLoading(r.id)
    try {
      const client = generateClient<Schema>({ authMode: "userPool" })
      await client.models.Reservation.update({ id: r.id, status })

      // Send status email to user (best-effort)
      try {
        const emailClient = generateClient<Schema>({ authMode: "userPool" })
        await emailClient.queries.sendStatusEmail({
          email: r.email!,
          name: r.name!,
          reservationDate: r.reservationDate!,
          reservationTime: r.reservationTime!,
          guests: r.guests!,
          status,
        })
      } catch (emailErr) {
        console.error("Status email failed (reservation still updated):", emailErr)
      }

      await fetchReservations()
      if (selected?.id === r.id) {
        setSelected({ ...r, status })
      }
    } catch (err) {
      console.error("Failed to update status", err)
    } finally {
      setActionLoading(null)
    }
  }

  async function deleteReservation(id: string) {
    if (!confirm("Reservierung wirklich löschen?")) return
    setActionLoading(id)
    try {
      const client = generateClient<Schema>({ authMode: "userPool" })
      await client.models.Reservation.delete({ id })
      await fetchReservations()
      if (selected?.id === id) setSelected(null)
    } catch (err) {
      console.error("Failed to delete", err)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-smoke">
      {/* Header */}
      <header className="border-b border-dust bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-carbon">Reservierungen</h1>
            <p className="text-sm text-muted-foreground">Ristorante Bonfini – Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex rounded-lg border border-dust bg-smoke p-1">
              <button
                onClick={() => setTab("list")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  tab === "list" ? "bg-white text-carbon shadow-sm" : "text-muted-foreground"
                )}
              >
                <List className="h-4 w-4" /> Liste
              </button>
              <button
                onClick={() => setTab("calendar")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  tab === "calendar" ? "bg-white text-carbon shadow-sm" : "text-muted-foreground"
                )}
              >
                <CalendarDays className="h-4 w-4" /> Kalender
              </button>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-lg border border-dust px-4 py-2 text-sm text-muted-foreground hover:bg-white hover:text-carbon"
            >
              <LogOut className="h-4 w-4" /> Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-mahogany" />
          </div>
        ) : loadError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-medium">Reservierungen konnten nicht geladen werden.</p>
            <p className="mt-2 text-sm">{loadError}</p>
          </div>
        ) : tab === "list" ? (
          <ReservationList
            reservations={reservations}
            onSelect={setSelected}
            onUpdateStatus={updateStatus}
            onDelete={deleteReservation}
            actionLoading={actionLoading}
          />
        ) : (
          <CalendarView
            reservations={reservations}
            onSelect={setSelected}
          />
        )}
      </main>

      {/* Detail modal */}
      {selected && (
        <ReservationDetail
          reservation={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={updateStatus}
          onDelete={deleteReservation}
          actionLoading={actionLoading}
        />
      )}
    </div>
  )
}

/* ─── Reservation List ─── */
function ReservationList({
  reservations,
  onSelect,
  onUpdateStatus,
  onDelete,
  actionLoading,
}: {
  reservations: Reservation[]
  onSelect: (r: Reservation) => void
  onUpdateStatus: (r: Reservation, s: "CONFIRMED" | "REJECTED" | "CANCELLED") => void
  onDelete: (id: string) => void
  actionLoading: string | null
}) {
  if (!reservations.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Keine Reservierungen vorhanden.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-dust bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dust bg-smoke/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Uhrzeit</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gäste</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} className="border-b border-dust last:border-0 hover:bg-smoke/30">
                <td className="px-4 py-3 font-medium">{r.reservationDate}</td>
                <td className="px-4 py-3">{r.reservationTime}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.guests}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                      STATUS_COLORS[r.status ?? "PENDING"]
                    )}
                  >
                    {STATUS_LABELS[r.status ?? "PENDING"]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelect(r)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-smoke hover:text-carbon"
                      title="Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {r.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(r, "CONFIRMED")}
                          disabled={actionLoading === r.id}
                          className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50"
                          title="Bestätigen"
                        >
                          {actionLoading === r.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => onUpdateStatus(r, "REJECTED")}
                          disabled={actionLoading === r.id}
                          className="rounded p-1.5 text-red-500 hover:bg-red-50"
                          title="Ablehnen"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(r.id)}
                      disabled={actionLoading === r.id}
                      className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-500"
                      title="Löschen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── Calendar View ─── */
function CalendarView({
  reservations,
  onSelect,
}: {
  reservations: Reservation[]
  onSelect: (r: Reservation) => void
}) {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [month, setMonth] = useState(() => new Date().getMonth())

  const firstDay = new Date(year, month, 1)
  const startDow = firstDay.getDay() || 7 // Monday = 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const pad = (n: number) => String(n).padStart(2, "0")

  // Group reservations by date string (YYYY-MM-DD) — no timezone conversion
  const byDate: Record<string, Reservation[]> = {}
  for (const r of reservations) {
    const d = r.reservationDate ?? ""
    if (!d) continue
    ;(byDate[d] ??= []).push(r)
  }

  function prev() {
    if (month === 0) { setMonth(11); setYear(year - 1) }
    else setMonth(month - 1)
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(year + 1) }
    else setMonth(month + 1)
  }

  const monthNames = [
    "Januar","Februar","März","April","Mai","Juni",
    "Juli","August","September","Oktober","November","Dezember",
  ]

  const cells: (number | null)[] = []
  for (let i = 1; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="rounded-xl border border-dust bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={prev} className="rounded-lg p-2 hover:bg-smoke">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="font-serif text-xl text-carbon">
          {monthNames[month]} {year}
        </h2>
        <button onClick={next} className="rounded-lg p-2 hover:bg-smoke">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-dust text-sm">
        {["Mo","Di","Mi","Do","Fr","Sa","So"].map((d) => (
          <div key={d} className="bg-smoke px-2 py-2 text-center text-xs font-medium uppercase text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className="bg-white p-2" />
          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`
          const dayRes = byDate[dateStr] ?? []
          const isToday = dateStr === todayStr()
          return (
            <div
              key={i}
              className={cn(
                "min-h-[80px] bg-white p-2",
                isToday && "ring-2 ring-inset ring-mahogany/30"
              )}
            >
              <div className={cn("mb-1 text-xs font-medium", isToday ? "text-mahogany" : "text-carbon")}>
                {day}
              </div>
              <div className="space-y-0.5">
                {dayRes.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onSelect(r)}
                    className={cn(
                      "block w-full truncate rounded px-1 py-0.5 text-left text-[10px] leading-tight",
                      STATUS_COLORS[r.status ?? "PENDING"]
                    )}
                  >
                    {r.reservationTime} {r.name}
                  </button>
                ))}
                {dayRes.length > 3 && (
                  <div className="text-[10px] text-muted-foreground">
                    +{dayRes.length - 3} mehr
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Detail Modal ─── */
function ReservationDetail({
  reservation: r,
  onClose,
  onUpdateStatus,
  onDelete,
  actionLoading,
}: {
  reservation: Reservation
  onClose: () => void
  onUpdateStatus: (r: Reservation, s: "CONFIRMED" | "REJECTED" | "CANCELLED") => void
  onDelete: (id: string) => void
  actionLoading: string | null
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl text-carbon">{r.name}</h2>
            <span
              className={cn(
                "mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                STATUS_COLORS[r.status ?? "PENDING"]
              )}
            >
              {STATUS_LABELS[r.status ?? "PENDING"]}
            </span>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-smoke">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <Row icon={<Calendar className="h-4 w-4" />} label="Datum" value={r.reservationDate ?? ""} />
          <Row icon={<Clock className="h-4 w-4" />} label="Uhrzeit" value={`${r.reservationTime} Uhr`} />
          <Row icon={<Users className="h-4 w-4" />} label="Gäste" value={String(r.guests ?? "")} />
          <Row icon={<Mail className="h-4 w-4" />} label="E-Mail" value={r.email ?? ""} />
          <Row icon={<Phone className="h-4 w-4" />} label="Telefon" value={r.phone ?? "-"} />
          {r.message && (
            <div className="rounded-lg bg-smoke p-3">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Nachricht</p>
              <p className="text-carbon">{r.message}</p>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            ID: {r.id}
            <br />
            Erstellt: {r.createdAt ? new Date(r.createdAt).toLocaleString("de-DE") : "-"}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-dust pt-4">
          {r.status === "PENDING" && (
            <>
              <button
                onClick={() => onUpdateStatus(r, "CONFIRMED")}
                disabled={actionLoading === r.id}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                <CheckCircle2 className="h-4 w-4" /> Bestätigen
              </button>
              <button
                onClick={() => onUpdateStatus(r, "REJECTED")}
                disabled={actionLoading === r.id}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                <XCircle className="h-4 w-4" /> Ablehnen
              </button>
            </>
          )}
          {r.status === "CONFIRMED" && (
            <button
              onClick={() => onUpdateStatus(r, "CANCELLED")}
              disabled={actionLoading === r.id}
              className="flex items-center gap-1.5 rounded-lg border border-dust px-4 py-2 text-sm text-muted-foreground hover:bg-smoke"
            >
              Stornieren
            </button>
          )}
          <button
            onClick={() => onDelete(r.id)}
            disabled={actionLoading === r.id}
            className="flex items-center gap-1.5 rounded-lg border border-dust px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" /> Löschen
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-dust pb-3">
      <div className="text-mahogany">{icon}</div>
      <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-carbon">{value}</span>
    </div>
  )
}

function todayStr() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
