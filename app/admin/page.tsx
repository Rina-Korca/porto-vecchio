"use client"

import { useEffect, useState, useCallback } from "react"
import {
  signIn,
  signOut,
  confirmSignIn,
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
  ShoppingBag,
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
type CustomerOrder = Schema["CustomerOrder"]["type"]
type ReservationActionStatus = "CONFIRMED" | "REJECTED" | "CANCELLED"
type OrderStatus = "PENDING" | "ACCEPTED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED"

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

const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-violet-100 text-violet-800",
  READY: "bg-emerald-100 text-emerald-800",
  COMPLETED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-red-100 text-red-700",
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Neu",
  ACCEPTED: "Angenommen",
  PREPARING: "In Vorbereitung",
  READY: "Bereit",
  COMPLETED: "Abgeschlossen",
  CANCELLED: "Storniert",
}

async function hasValidUserPoolTokens(): Promise<boolean> {
  try {
    const session = await fetchAuthSession()
    return !!session.tokens?.accessToken
  } catch {
    return false
  }
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<"loading" | "login" | "newPassword" | "authenticated">("loading")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
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

    hasValidUserPoolTokens().then((valid) =>
      setAuthState(valid ? "authenticated" : "login"),
    )
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError("")
    try {
      // Clear any stale sign-in session from a previous attempt
      try { await signOut() } catch { /* ignore */ }
      const { isSignedIn, nextStep } = await signIn({ username: email, password })

      if (!isSignedIn) {
        if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
          setAuthState("newPassword")
          setLoginError("")
          return
        }
        setLoginError(
          `Anmeldung erfordert einen weiteren Schritt: ${nextStep.signInStep}`,
        )
        return
      }

      const valid = await hasValidUserPoolTokens()
      if (!valid) {
        setLoginError("Anmeldung erfolgreich, aber keine gültige Sitzung erhalten. Bitte erneut versuchen.")
        return
      }

      setAuthState("authenticated")
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Login fehlgeschlagen")
    } finally {
      setLoggingIn(false)
    }
  }

  async function handleNewPassword(e: React.FormEvent) {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError("")
    try {
      const { isSignedIn } = await confirmSignIn({ challengeResponse: newPassword })
      if (!isSignedIn) {
        setLoginError("Passwort konnte nicht gesetzt werden. Bitte erneut versuchen.")
        return
      }
      const valid = await hasValidUserPoolTokens()
      if (!valid) {
        setLoginError("Anmeldung erfolgreich, aber keine gültige Sitzung erhalten.")
        return
      }
      setAuthState("authenticated")
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Fehler beim Setzen des neuen Passworts")
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

  if (authState === "login" || authState === "newPassword") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-smoke px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl text-carbon">
              {authState === "newPassword" ? "Neues Passwort setzen" : "Admin Login"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {authState === "newPassword"
                ? "Bitte wählen Sie ein neues Passwort"
                : "Porto Vecchio"}
            </p>
          </div>
          {loginError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{loginError}</div>
          )}
          {authState === "newPassword" ? (
            <form onSubmit={handleNewPassword} className="space-y-4">
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="Neues Passwort"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border-2 border-dust bg-smoke px-4 py-3 text-carbon focus:border-mahogany focus:outline-none"
              />
              <button
                type="submit"
                disabled={loggingIn}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-mahogany py-3 text-sm font-medium uppercase tracking-widest text-white hover:bg-garnet disabled:opacity-60"
              >
                {loggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Passwort setzen
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
              <input
                name="username"
                type="email"
                required
                autoComplete="username"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-2 border-dust bg-smoke px-4 py-3 text-carbon focus:border-mahogany focus:outline-none"
              />
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
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
          )}
        </div>
      </div>
    )
  }

  return <Dashboard onLogout={handleLogout} />
}

function getClient() {
  configureAmplifyClient()
  return generateClient<Schema>({ authMode: "userPool" })
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"reservations" | "calendar" | "orders">("reservations")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [loadError, setLoadError] = useState("")

  const fetchReservations = useCallback(async () => {
    const client = getClient()
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
  }, [])

  const fetchOrders = useCallback(async () => {
    const client = getClient()
    const { data, errors } = await client.models.CustomerOrder.list({
      limit: 1000,
    })
    if (errors?.length) {
      throw new Error(errors[0].message)
    }
    setOrders(
      (data ?? []).sort(
        (a, b) =>
          (b.pickupDate ?? "").localeCompare(a.pickupDate ?? "") ||
          (b.pickupTime ?? "").localeCompare(a.pickupTime ?? "") ||
          (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
      )
    )
  }, [])

  const fetchDashboardData = useCallback(async () => {
    setLoadError("")
    try {
      await Promise.all([fetchReservations(), fetchOrders()])
    } catch (err) {
      console.error("Failed to fetch admin data", err)
      setLoadError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [fetchOrders, fetchReservations])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  async function updateStatus(r: Reservation, status: ReservationActionStatus) {
    setActionLoading(r.id)
    try {
      const client = getClient()
      await client.models.Reservation.update({ id: r.id, status })

      // Send status email to user (best-effort)
      if (r.email && r.name && r.reservationDate && r.reservationTime && r.guests) {
        try {
          await client.queries.sendStatusEmail({
            email: r.email,
            name: r.name,
            reservationDate: r.reservationDate,
            reservationTime: r.reservationTime,
            guests: r.guests,
            status,
          })
        } catch (emailErr) {
          console.error("Status email failed (reservation still updated):", emailErr)
        }
      }

      await fetchReservations()
      if (selectedReservation?.id === r.id) {
        setSelectedReservation({ ...r, status })
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
      const client = getClient()
      await client.models.Reservation.delete({ id })
      await fetchReservations()
      if (selectedReservation?.id === id) setSelectedReservation(null)
    } catch (err) {
      console.error("Failed to delete", err)
    } finally {
      setActionLoading(null)
    }
  }

  async function updateOrderStatus(order: CustomerOrder, status: OrderStatus) {
    setActionLoading(order.id)
    try {
      const client = getClient()
      await client.models.CustomerOrder.update({ id: order.id, status })
      await fetchOrders()
      if (selectedOrder?.id === order.id) {
        setSelectedOrder({ ...order, status })
      }
    } catch (err) {
      console.error("Failed to update order status", err)
    } finally {
      setActionLoading(null)
    }
  }

  async function deleteOrder(id: string) {
    if (!confirm("Bestellung wirklich löschen?")) return
    setActionLoading(id)
    try {
      const client = getClient()
      await client.models.CustomerOrder.delete({ id })
      await fetchOrders()
      if (selectedOrder?.id === id) setSelectedOrder(null)
    } catch (err) {
      console.error("Failed to delete order", err)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-smoke">
      {/* Header */}
      <header className="border-b border-dust bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-serif text-2xl text-carbon">Admin</h1>
            <p className="text-sm text-muted-foreground">Porto Vecchio – Admin</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap rounded-lg border border-dust bg-smoke p-1">
              <button
                onClick={() => setTab("reservations")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  tab === "reservations" ? "bg-white text-carbon shadow-sm" : "text-muted-foreground"
                )}
              >
                <List className="h-4 w-4" /> Reservierungen ({reservations.length})
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
              <button
                onClick={() => setTab("orders")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  tab === "orders" ? "bg-white text-carbon shadow-sm" : "text-muted-foreground"
                )}
              >
                <ShoppingBag className="h-4 w-4" /> Bestellungen ({orders.length})
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
            <p className="font-medium">Admin-Daten konnten nicht geladen werden.</p>
            <p className="mt-2 text-sm">{loadError}</p>
          </div>
        ) : tab === "reservations" ? (
          <ReservationList
            reservations={reservations}
            onSelect={setSelectedReservation}
            onUpdateStatus={updateStatus}
            onDelete={deleteReservation}
            actionLoading={actionLoading}
          />
        ) : tab === "calendar" ? (
          <CalendarView
            reservations={reservations}
            onSelect={setSelectedReservation}
          />
        ) : (
          <OrderList
            orders={orders}
            onSelect={setSelectedOrder}
            onUpdateStatus={updateOrderStatus}
            onDelete={deleteOrder}
            actionLoading={actionLoading}
          />
        )}
      </main>

      {/* Detail modal */}
      {selectedReservation && (
        <ReservationDetail
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onUpdateStatus={updateStatus}
          onDelete={deleteReservation}
          actionLoading={actionLoading}
        />
      )}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={updateOrderStatus}
          onDelete={deleteOrder}
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
  onUpdateStatus: (r: Reservation, s: ReservationActionStatus) => void
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

/* ─── Order List ─── */
const ORDER_FLOW_STATUSES: OrderStatus[] = ["ACCEPTED", "PREPARING", "READY", "COMPLETED"]

function getNextOrderStatus(status?: string | null): OrderStatus | null {
  switch (status) {
    case "PENDING":
      return "ACCEPTED"
    case "ACCEPTED":
      return "PREPARING"
    case "PREPARING":
      return "READY"
    case "READY":
      return "COMPLETED"
    default:
      return null
  }
}

function OrderList({
  orders,
  onSelect,
  onUpdateStatus,
  onDelete,
  actionLoading,
}: {
  orders: CustomerOrder[]
  onSelect: (order: CustomerOrder) => void
  onUpdateStatus: (order: CustomerOrder, status: OrderStatus) => void
  onDelete: (id: string) => void
  actionLoading: string | null
}) {
  if (!orders.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Keine Bestellungen vorhanden.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-dust bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dust bg-smoke/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Abholung</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Bestellung</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const nextStatus = getNextOrderStatus(order.status)

              return (
                <tr key={order.id} className="border-b border-dust last:border-0 hover:bg-smoke/30">
                  <td className="px-4 py-3 font-medium">
                    {order.pickupDate}
                    <span className="block text-xs font-normal text-muted-foreground">
                      {order.pickupTime} Uhr
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.customerName}</td>
                  <td className="px-4 py-3">{order.phone}</td>
                  <td className="max-w-[280px] truncate px-4 py-3">{order.orderDetails}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                        ORDER_STATUS_COLORS[order.status ?? "PENDING"]
                      )}
                    >
                      {ORDER_STATUS_LABELS[order.status ?? "PENDING"]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSelect(order)}
                        className="rounded p-1.5 text-muted-foreground hover:bg-smoke hover:text-carbon"
                        title="Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {nextStatus && (
                        <button
                          onClick={() => onUpdateStatus(order, nextStatus)}
                          disabled={actionLoading === order.id}
                          className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50"
                          title={ORDER_STATUS_LABELS[nextStatus]}
                        >
                          {actionLoading === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </button>
                      )}
                      {order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
                        <button
                          onClick={() => onUpdateStatus(order, "CANCELLED")}
                          disabled={actionLoading === order.id}
                          className="rounded p-1.5 text-red-500 hover:bg-red-50"
                          title="Stornieren"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(order.id)}
                        disabled={actionLoading === order.id}
                        className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-500"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
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
  onUpdateStatus: (r: Reservation, s: ReservationActionStatus) => void
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

function OrderDetail({
  order,
  onClose,
  onUpdateStatus,
  onDelete,
  actionLoading,
}: {
  order: CustomerOrder
  onClose: () => void
  onUpdateStatus: (order: CustomerOrder, status: OrderStatus) => void
  onDelete: (id: string) => void
  actionLoading: string | null
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl text-carbon">{order.customerName}</h2>
            <span
              className={cn(
                "mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                ORDER_STATUS_COLORS[order.status ?? "PENDING"]
              )}
            >
              {ORDER_STATUS_LABELS[order.status ?? "PENDING"]}
            </span>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-smoke">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <Row icon={<Calendar className="h-4 w-4" />} label="Datum" value={order.pickupDate ?? ""} />
          <Row icon={<Clock className="h-4 w-4" />} label="Uhrzeit" value={`${order.pickupTime} Uhr`} />
          <Row icon={<User className="h-4 w-4" />} label="Name" value={order.customerName ?? ""} />
          <Row icon={<Mail className="h-4 w-4" />} label="E-Mail" value={order.email ?? ""} />
          <Row icon={<Phone className="h-4 w-4" />} label="Telefon" value={order.phone ?? "-"} />

          <div className="rounded-lg bg-smoke p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">Bestellung</p>
            <p className="whitespace-pre-wrap text-carbon">{order.orderDetails}</p>
          </div>

          {order.notes && (
            <div className="rounded-lg bg-smoke p-3">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Hinweise</p>
              <p className="whitespace-pre-wrap text-carbon">{order.notes}</p>
            </div>
          )}

          <div className="rounded-lg border border-dust bg-white p-3 text-xs text-muted-foreground">
            Keine Online-Zahlung in diesem Ablauf. Zahlung und Abholung werden
            direkt mit dem Gast geklaert.
          </div>

          <div className="text-xs text-muted-foreground">
            ID: {order.id}
            <br />
            Erstellt: {order.createdAt ? new Date(order.createdAt).toLocaleString("de-DE") : "-"}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-dust pt-4">
          {ORDER_FLOW_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => onUpdateStatus(order, status)}
              disabled={actionLoading === order.id || order.status === status}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50",
                order.status === status
                  ? "bg-smoke text-muted-foreground"
                  : "bg-mahogany text-white hover:bg-garnet"
              )}
            >
              <CheckCircle2 className="h-4 w-4" />
              {ORDER_STATUS_LABELS[status]}
            </button>
          ))}
          {order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
            <button
              onClick={() => onUpdateStatus(order, "CANCELLED")}
              disabled={actionLoading === order.id}
              className="flex items-center gap-1.5 rounded-lg border border-dust px-4 py-2 text-sm text-red-500 hover:bg-red-50 disabled:opacity-60"
            >
              <XCircle className="h-4 w-4" /> Stornieren
            </button>
          )}
          <button
            onClick={() => onDelete(order.id)}
            disabled={actionLoading === order.id}
            className="flex items-center gap-1.5 rounded-lg border border-dust px-4 py-2 text-sm text-red-500 hover:bg-red-50 disabled:opacity-60"
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
