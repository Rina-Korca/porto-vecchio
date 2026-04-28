"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  Download,
  LogOut,
  RefreshCw,
  Trash2,
} from "lucide-react"
import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/admin/status-badge"
import { getReservationClient, hasAmplifyOutputs } from "@/lib/amplify-client"
import {
  reservationStatuses,
  reservationToCsv,
  sortReservationsDescending,
  statusLabel,
  type ReservationRecord,
  type ReservationStatus,
} from "@/lib/reservations"
import { cn } from "@/lib/utils"

type StatusFilter = ReservationStatus | "ALL"

export function ReservationsDashboard() {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const [reservations, setReservations] = useState<Array<ReservationRecord>>([])
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationRecord | null>(null)
  const [selectedDay, setSelectedDay] = useState("")
  const [monthCursor, setMonthCursor] = useState(() => new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const filteredReservations = useMemo(() => {
    return sortReservationsDescending(
      reservations.filter((reservation) => {
        if (statusFilter !== "ALL" && reservation.status !== statusFilter) {
          return false
        }
        if (dateFrom && reservation.date < dateFrom) {
          return false
        }
        if (dateTo && reservation.date > dateTo) {
          return false
        }
        return true
      }),
    )
  }, [dateFrom, dateTo, reservations, statusFilter])

  const selectedDayReservations = useMemo(
    () =>
      sortReservationsDescending(
        reservations.filter((reservation) => reservation.date === selectedDay),
      ).reverse(),
    [reservations, selectedDay],
  )

  useEffect(() => {
    let isMounted = true

    async function checkAccess() {
      if (!hasAmplifyOutputs()) {
        setError("Amplify outputs fehlen. Fuehren Sie zuerst ampx sandbox aus.")
        setIsReady(true)
        return
      }

      try {
        getReservationClient()
        await getCurrentUser()
        const session = await fetchAuthSession()
        const groups = session.tokens?.accessToken.payload["cognito:groups"]
        const groupList = Array.isArray(groups) ? groups.map(String) : []

        if (!groupList.includes("ADMINS")) {
          router.replace("/admin/unauthorized")
          return
        }

        if (isMounted) {
          setIsReady(true)
          await loadReservations()
        }
      } catch {
        router.replace("/admin/login")
      }
    }

    checkAccess()

    return () => {
      isMounted = false
    }
  }, [router])

  async function loadReservations() {
    setIsLoading(true)
    setError("")

    try {
      const client = getReservationClient()
      const all: Array<ReservationRecord> = []
      let nextToken: string | null | undefined

      do {
        const result = await client.models.Reservation.list(
          { limit: 1000, nextToken, authMode: "userPool" },
        )
        if (result.errors?.length) {
          throw new Error(result.errors.map((item) => item.message).join(", "))
        }
        all.push(...((result.data || []) as Array<ReservationRecord>))
        nextToken = result.nextToken
      } while (nextToken)

      setReservations(sortReservationsDescending(all))
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Reservierungen konnten nicht geladen werden.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function updateStatus(
    reservation: ReservationRecord,
    status: ReservationStatus,
  ) {
    setError("")
    const previous = reservations
    setReservations((current) =>
      current.map((item) =>
        item.id === reservation.id ? { ...item, status } : item,
      ),
    )

    try {
      const client = getReservationClient()
      const result = await client.mutations.updateReservationStatus(
        { id: reservation.id, status },
        { authMode: "userPool" },
      )
      if (result.errors?.length || !result.data) {
        throw new Error(result.errors?.map((item) => item.message).join(", "))
      }
      const updated = result.data as ReservationRecord
      setReservations((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      )
      setSelectedReservation((current) =>
        current?.id === updated.id ? updated : current,
      )
    } catch (updateError) {
      setReservations(previous)
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Status konnte nicht aktualisiert werden.",
      )
    }
  }

  async function deleteReservation(reservation: ReservationRecord) {
    if (!window.confirm(`Reservierung von ${reservation.name} loeschen?`)) {
      return
    }

    setError("")
    const previous = reservations
    setReservations((current) =>
      current.filter((item) => item.id !== reservation.id),
    )
    setSelectedReservation(null)

    try {
      const client = getReservationClient()
      const result = await client.models.Reservation.delete(
        { id: reservation.id },
        { authMode: "userPool" },
      )
      if (result.errors?.length) {
        throw new Error(result.errors.map((item) => item.message).join(", "))
      }
    } catch (deleteError) {
      setReservations(previous)
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Reservierung konnte nicht geloescht werden.",
      )
    }
  }

  async function handleSignOut() {
    await signOut()
    router.replace("/admin/login")
  }

  function exportCsv() {
    const csv = reservationToCsv(filteredReservations)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "reservierungen.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!isReady) {
    return (
      <main className="min-h-screen bg-smoke p-6 text-carbon">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
          <RefreshCw className="mr-3 h-5 w-5 animate-spin text-mahogany" />
          Adminbereich wird geladen...
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-smoke text-carbon">
      <header className="border-b border-dust bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-mahogany">
              Bonfini Admin
            </p>
            <h1 className="font-serif text-3xl text-carbon">
              Reservierungen
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadReservations}>
              <RefreshCw />
              Aktualisieren
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {error ? (
          <div className="mb-4 rounded-lg border border-strawberry/30 bg-strawberry/10 p-4 text-sm text-garnet">
            {error}
          </div>
        ) : null}

        <Tabs defaultValue="reservations" className="gap-6">
          <TabsList className="bg-white">
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <ReservationsToolbar
              statusFilter={statusFilter}
              dateFrom={dateFrom}
              dateTo={dateTo}
              setStatusFilter={setStatusFilter}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
              exportCsv={exportCsv}
              resultCount={filteredReservations.length}
            />
            <ReservationsTable
              reservations={filteredReservations}
              isLoading={isLoading}
              onOpen={setSelectedReservation}
              onDelete={deleteReservation}
              onStatusChange={updateStatus}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarPanel
              reservations={reservations}
              monthCursor={monthCursor}
              selectedDay={selectedDay}
              selectedDayReservations={selectedDayReservations}
              setMonthCursor={setMonthCursor}
              setSelectedDay={setSelectedDay}
              onOpen={setSelectedReservation}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ReservationDetailDialog
        reservation={selectedReservation}
        onOpenChange={(open) => !open && setSelectedReservation(null)}
        onDelete={deleteReservation}
        onStatusChange={updateStatus}
      />
    </main>
  )
}

function ReservationsToolbar({
  statusFilter,
  dateFrom,
  dateTo,
  resultCount,
  setStatusFilter,
  setDateFrom,
  setDateTo,
  exportCsv,
}: {
  statusFilter: StatusFilter
  dateFrom: string
  dateTo: string
  resultCount: number
  setStatusFilter: (value: StatusFilter) => void
  setDateFrom: (value: string) => void
  setDateTo: (value: string) => void
  exportCsv: () => void
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-dust bg-white p-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm font-medium">
          Status
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className="h-10 rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="ALL">{statusLabel("ALL")}</option>
            {reservationStatuses.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Von
          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            className="h-10 rounded-md border border-input bg-white px-3 text-sm"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Bis
          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            className="h-10 rounded-md border border-input bg-white px-3 text-sm"
          />
        </label>
      </div>
      <Button onClick={exportCsv} disabled={resultCount === 0}>
        <Download />
        CSV Export ({resultCount})
      </Button>
    </div>
  )
}

function ReservationsTable({
  reservations,
  isLoading,
  onOpen,
  onDelete,
  onStatusChange,
}: {
  reservations: Array<ReservationRecord>
  isLoading: boolean
  onOpen: (reservation: ReservationRecord) => void
  onDelete: (reservation: ReservationRecord) => void
  onStatusChange: (
    reservation: ReservationRecord,
    status: ReservationStatus,
  ) => void
}) {
  return (
    <div className="rounded-lg border border-dust bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Uhrzeit</TableHead>
            <TableHead>Name / Kontakt</TableHead>
            <TableHead>Gaeste</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Erstellt</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Reservierungen werden geladen...
              </TableCell>
            </TableRow>
          ) : null}
          {!isLoading && reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Keine Reservierungen fuer diese Filter.
              </TableCell>
            </TableRow>
          ) : null}
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>
                <button
                  className="text-left font-medium text-carbon hover:text-mahogany"
                  onClick={() => onOpen(reservation)}
                >
                  {reservation.name}
                </button>
                <div className="text-xs text-muted-foreground">
                  {reservation.email}
                  {reservation.phone ? ` - ${reservation.phone}` : ""}
                </div>
              </TableCell>
              <TableCell>{reservation.guests}</TableCell>
              <TableCell>
                <StatusBadge status={reservation.status} />
              </TableCell>
              <TableCell>{formatDateTime(reservation.createdAt)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap justify-end gap-2">
                  {reservationStatuses.map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={
                        reservation.status === status ? "default" : "outline"
                      }
                      onClick={() => onStatusChange(reservation, status)}
                    >
                      {statusLabel(status)}
                    </Button>
                  ))}
                  <Button
                    size="icon-sm"
                    variant="destructive"
                    aria-label="Reservierung loeschen"
                    onClick={() => onDelete(reservation)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function CalendarPanel({
  reservations,
  monthCursor,
  selectedDay,
  selectedDayReservations,
  setMonthCursor,
  setSelectedDay,
  onOpen,
}: {
  reservations: Array<ReservationRecord>
  monthCursor: Date
  selectedDay: string
  selectedDayReservations: Array<ReservationRecord>
  setMonthCursor: (date: Date) => void
  setSelectedDay: (day: string) => void
  onOpen: (reservation: ReservationRecord) => void
}) {
  const days = buildMonthDays(monthCursor)
  const reservationCounts = reservations.reduce<Record<string, number>>(
    (accumulator, reservation) => {
      accumulator[reservation.date] = (accumulator[reservation.date] || 0) + 1
      return accumulator
    },
    {},
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-lg border border-dust bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setMonthCursor(addMonths(monthCursor, -1))}
          >
            Zurueck
          </Button>
          <h2 className="font-serif text-2xl">
            {monthCursor.toLocaleDateString("de-DE", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button
            variant="outline"
            onClick={() => setMonthCursor(addMonths(monthCursor, 1))}
          >
            Weiter
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day) => {
            const value = dateValue(day)
            const count = reservationCounts[value] || 0
            const isCurrentMonth = day.getMonth() === monthCursor.getMonth()
            return (
              <button
                key={value}
                onClick={() => setSelectedDay(value)}
                className={cn(
                  "min-h-20 rounded-lg border p-2 text-left transition-colors",
                  isCurrentMonth ? "bg-white" : "bg-smoke text-silver",
                  count > 0 && "border-mahogany bg-mahogany/5",
                  selectedDay === value && "ring-2 ring-mahogany",
                )}
              >
                <span className="text-sm font-bold">{day.getDate()}</span>
                {count > 0 ? (
                  <span className="mt-3 flex items-center gap-1 text-xs text-mahogany">
                    <CalendarDays className="h-3 w-3" />
                    {count}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className="rounded-lg border border-dust bg-white p-4">
        <h3 className="font-serif text-xl">
          {selectedDay || "Tag auswaehlen"}
        </h3>
        <div className="mt-4 space-y-3">
          {!selectedDay ? (
            <p className="text-sm text-muted-foreground">
              Waehlen Sie einen markierten Tag im Kalender.
            </p>
          ) : null}
          {selectedDay && selectedDayReservations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Keine Reservierungen an diesem Tag.
            </p>
          ) : null}
          {selectedDayReservations.map((reservation) => (
            <button
              key={reservation.id}
              onClick={() => onOpen(reservation)}
              className="w-full rounded-lg border border-dust p-3 text-left hover:border-mahogany"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">
                  {reservation.time} - {reservation.name}
                </span>
                <StatusBadge status={reservation.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {reservation.guests} Gaeste
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReservationDetailDialog({
  reservation,
  onOpenChange,
  onDelete,
  onStatusChange,
}: {
  reservation: ReservationRecord | null
  onOpenChange: (open: boolean) => void
  onDelete: (reservation: ReservationRecord) => void
  onStatusChange: (
    reservation: ReservationRecord,
    status: ReservationStatus,
  ) => void
}) {
  return (
    <Dialog open={Boolean(reservation)} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {reservation ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {reservation.name}
              </DialogTitle>
              <DialogDescription>
                Reservierung am {reservation.date} um {reservation.time}
              </DialogDescription>
            </DialogHeader>
            <dl className="grid gap-3 sm:grid-cols-2">
              <Detail label="E-Mail" value={reservation.email} />
              <Detail label="Telefon" value={reservation.phone || "-"} />
              <Detail label="Datum" value={reservation.date} />
              <Detail label="Uhrzeit" value={reservation.time} />
              <Detail label="Gaeste" value={String(reservation.guests)} />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1">
                  <StatusBadge status={reservation.status} />
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Nachricht
                </dt>
                <dd className="mt-1 whitespace-pre-wrap rounded-lg bg-smoke p-3 text-sm">
                  {reservation.message || "-"}
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap justify-between gap-2 border-t border-dust pt-4">
              <div className="flex flex-wrap gap-2">
                {reservationStatuses.map((status) => (
                  <Button
                    key={status}
                    variant={reservation.status === status ? "default" : "outline"}
                    onClick={() => onStatusChange(reservation, status)}
                  >
                    {statusLabel(status)}
                  </Button>
                ))}
              </div>
              <Button
                variant="destructive"
                onClick={() => onDelete(reservation)}
              >
                <Trash2 />
                Loeschen
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}

function buildMonthDays(cursor: Date) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
  const startOffset = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(first.getDate() - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return day
  })
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function dateValue(date: Date) {
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function formatDateTime(value: string) {
  if (!value) {
    return "-"
  }
  return new Date(value).toLocaleString("de-DE", {
    dateStyle: "short",
    timeStyle: "short",
  })
}
