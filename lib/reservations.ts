export const reservationStatuses = ["PENDING", "CONFIRMED", "REJECTED"] as const

export type ReservationStatus = (typeof reservationStatuses)[number]

export type ReservationRecord = {
  id: string
  name: string
  email: string
  phone?: string | null
  date: string
  time: string
  guests: number
  message?: string | null
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}

export const reservationTimeSlots = Array.from({ length: 12 }, (_, index) => {
  const minutes = 17 * 60 + index * 30
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
})

export function todayDateValue() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export function statusLabel(status: ReservationStatus | "ALL") {
  const labels = {
    ALL: "Alle",
    PENDING: "Offen",
    CONFIRMED: "Bestaetigt",
    REJECTED: "Abgelehnt",
  }
  return labels[status]
}

export function sortReservationsDescending(
  reservations: Array<ReservationRecord>,
) {
  return [...reservations].sort((a, b) =>
    `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`),
  )
}

export function validateReservationRequest(input: {
  name: string
  email: string
  date: string
  time: string
  guests: string
}) {
  const errors: Record<string, string> = {}

  if (input.name.trim().length < 2) {
    errors.name = "Bitte geben Sie mindestens 2 Zeichen ein."
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Bitte geben Sie eine gueltige E-Mail-Adresse ein."
  }

  if (!input.date || input.date < todayDateValue()) {
    errors.date = "Bitte waehlen Sie ein Datum ab heute."
  }

  if (!reservationTimeSlots.includes(input.time)) {
    errors.time = "Bitte waehlen Sie eine gueltige Uhrzeit."
  }

  const guests = Number(input.guests)
  if (!Number.isInteger(guests) || guests < 1) {
    errors.guests = "Bitte geben Sie mindestens einen Gast an."
  }

  return errors
}

export function reservationToCsv(reservations: Array<ReservationRecord>) {
  const rows = [
    [
      "ID",
      "Name",
      "E-Mail",
      "Telefon",
      "Datum",
      "Uhrzeit",
      "Gaeste",
      "Status",
      "Nachricht",
      "Erstellt",
    ],
    ...reservations.map((reservation) => [
      reservation.id,
      reservation.name,
      reservation.email,
      reservation.phone || "",
      reservation.date,
      reservation.time,
      String(reservation.guests),
      reservation.status,
      reservation.message || "",
      reservation.createdAt,
    ]),
  ]

  return rows
    .map((row) =>
      row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n")
}
