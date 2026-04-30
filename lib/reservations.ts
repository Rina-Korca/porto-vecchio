import { openingSchedule } from "./company-info"

const RESERVATION_SLOT_INTERVAL_MINUTES = 30
const LAST_RESERVATION_BEFORE_CLOSE_MINUTES = 30

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function minutesToTime(totalMinutes: number) {
  const minutesInDay = 24 * 60
  const normalizedMinutes = ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay
  const hours = Math.floor(normalizedMinutes / 60)
  const minutes = normalizedMinutes % 60
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

function parseDateInput(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(year, month - 1, day)

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null
  }

  return parsed
}

function getReservationTimeSlotsForHours(hours: {
  opensAt: string
  closesAt: string
}) {
  const slots: string[] = []
  const opensAt = timeToMinutes(hours.opensAt)
  let closesAt = timeToMinutes(hours.closesAt)

  if (closesAt <= opensAt) {
    closesAt += 24 * 60
  }

  const lastSlot = closesAt - LAST_RESERVATION_BEFORE_CLOSE_MINUTES
  for (
    let slot = opensAt;
    slot <= lastSlot;
    slot += RESERVATION_SLOT_INTERVAL_MINUTES
  ) {
    slots.push(minutesToTime(slot))
  }

  return slots
}

export const reservationTimeSlots = Array.from(
  new Set(openingSchedule.flatMap((hours) => getReservationTimeSlotsForHours(hours))),
).sort()

export function getReservationTimeSlotsForDate(date: string) {
  const parsedDate = parseDateInput(date)
  if (!parsedDate) return []

  const hours = openingSchedule.find((entry) => entry.dayIndex === parsedDate.getDay())
  if (!hours) return []

  return getReservationTimeSlotsForHours(hours)
}

export function todayDateValue() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export function validateReservationRequest(input: {
  name: string
  email: string
  phone?: string
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

  if (input.phone?.trim() && !normalizeReservationPhone(input.phone)) {
    errors.phone = "Bitte geben Sie eine gueltige Telefonnummer ein."
  }

  if (!input.date || input.date < todayDateValue()) {
    errors.date = "Bitte waehlen Sie ein Datum ab heute."
  }

  if (!getReservationTimeSlotsForDate(input.date).includes(input.time)) {
    errors.time = "Bitte waehlen Sie eine gueltige Uhrzeit."
  }

  const guests = Number(input.guests)
  if (!Number.isInteger(guests) || guests < 1) {
    errors.guests = "Bitte geben Sie mindestens einen Gast an."
  }

  return errors
}

export function normalizeReservationPhone(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return null

  const compact = trimmed.replace(/[^\d+]/g, "")
  if (!compact) return null
  if ((compact.match(/\+/g) ?? []).length > 1) return null
  if (compact.includes("+") && !compact.startsWith("+")) return null

  let normalized: string
  if (compact.startsWith("+")) {
    normalized = `+${compact.slice(1).replace(/\D/g, "")}`
  } else if (compact.startsWith("00")) {
    normalized = `+${compact.slice(2).replace(/\D/g, "")}`
  } else if (compact.startsWith("0")) {
    normalized = `+49${compact.slice(1).replace(/\D/g, "")}`
  } else {
    normalized = `+49${compact.replace(/\D/g, "")}`
  }

  return /^\+[1-9]\d{6,14}$/.test(normalized) ? normalized : null
}
