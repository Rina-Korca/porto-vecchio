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

  if (!reservationTimeSlots.includes(input.time)) {
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
