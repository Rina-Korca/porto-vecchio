import { openingSchedule } from "./company-info"
import { normalizeReservationPhone, todayDateValue } from "./reservations"

const ORDER_SLOT_INTERVAL_MINUTES = 15
const LAST_ORDER_BEFORE_CLOSE_MINUTES = 45

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

type ServicePeriod = {
  opensAt: string
  closesAt: string
}

function getOrderTimeSlotsForPeriod(hours: ServicePeriod) {
  const slots: string[] = []
  const opensAt = timeToMinutes(hours.opensAt)
  let closesAt = timeToMinutes(hours.closesAt)

  if (closesAt <= opensAt) {
    closesAt += 24 * 60
  }

  const lastSlot = closesAt - LAST_ORDER_BEFORE_CLOSE_MINUTES
  for (
    let slot = opensAt;
    slot <= lastSlot;
    slot += ORDER_SLOT_INTERVAL_MINUTES
  ) {
    slots.push(minutesToTime(slot))
  }

  return slots
}

function getOrderTimeSlotsForHours(hours: {
  opensAt: string
  closesAt: string
  servicePeriods?: ServicePeriod[]
  isClosed?: boolean
}) {
  if (hours.isClosed) return []
  const periods = hours.servicePeriods?.length
    ? hours.servicePeriods
    : [{ opensAt: hours.opensAt, closesAt: hours.closesAt }]

  return periods.flatMap((period) => getOrderTimeSlotsForPeriod(period))
}

export function getOrderTimeSlotsForDate(date: string) {
  const parsedDate = parseDateInput(date)
  if (!parsedDate) return []

  const hours = openingSchedule.find((entry) => entry.dayIndex === parsedDate.getDay())
  if (!hours) return []

  return getOrderTimeSlotsForHours(hours)
}

export function normalizeOrderPhone(input: string) {
  return normalizeReservationPhone(input)
}

export function validateOrderRequest(input: {
  name: string
  email: string
  phone: string
  pickupDate: string
  pickupTime: string
  orderDetails: string
}) {
  const errors: Record<string, string> = {}

  if (input.name.trim().length < 2) {
    errors.name = "Bitte geben Sie mindestens 2 Zeichen ein."
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Bitte geben Sie eine gueltige E-Mail-Adresse ein."
  }

  if (!normalizeOrderPhone(input.phone)) {
    errors.phone = "Bitte geben Sie eine gueltige Telefonnummer ein."
  }

  if (!input.pickupDate || input.pickupDate < todayDateValue()) {
    errors.pickupDate = "Bitte waehlen Sie ein Datum ab heute."
  }

  if (!getOrderTimeSlotsForDate(input.pickupDate).includes(input.pickupTime)) {
    errors.pickupTime = "Bitte waehlen Sie eine gueltige Abholzeit."
  }

  if (input.orderDetails.trim().length < 8) {
    errors.orderDetails = "Bitte geben Sie Ihre Bestellung mit Mengen an."
  }

  return errors
}
