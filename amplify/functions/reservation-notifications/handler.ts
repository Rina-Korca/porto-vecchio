import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import { env } from "$amplify/env/reservation-notifications"
import type { Schema } from "../../data/resource"

type ReservationStatus = "PENDING" | "CONFIRMED" | "REJECTED"

type ReservationPayload = {
  id?: string
  name: string
  email: string
  phone?: string | null
  date: string
  time: string
  guests: number
  message?: string | null
  status: ReservationStatus
  createdAt?: string
  updatedAt?: string
}

const ses = new SESv2Client({ region: "eu-west-1" })
let dataClientPromise: Promise<ReturnType<typeof generateClient<Schema>>> | null =
  null

export const handler = async (event: Record<string, unknown>) => {
  const fieldName =
    (event as any).info?.fieldName ??
    (event as any).fieldName ??
    (event as any).typeName
  const args: Record<string, unknown> =
    (event as any).arguments ?? (event as any).args ?? event

  if (fieldName === "createReservationRequest") {
    return createReservation(args)
  }

  if (fieldName === "updateReservationStatus") {
    return updateReservationStatus(args)
  }

  throw new Error(`Unsupported reservation operation: ${fieldName}`)
}

async function createReservation(args: Record<string, unknown>) {
  const client = await getDataClient()
  const input = validateCreateInput(args)
  const result = await client.models.Reservation.create({
    ...input,
    status: "PENDING",
  })

  if (result.errors?.length || !result.data) {
    console.error("Reservation create failed", result.errors)
    throw new Error("Reservation could not be created")
  }

  const reservation = result.data as ReservationPayload
  await safeSendEmails([
    {
      to: env.OWNER_EMAIL,
      subject: `Neue Reservierungsanfrage: ${reservation.name}`,
      html: reservationEmailHtml("Neue Reservierungsanfrage", reservation),
      text: reservationEmailText("Neue Reservierungsanfrage", reservation),
    },
    {
      to: reservation.email,
      subject: `${env.RESTAURANT_NAME}: Reservierungsanfrage erhalten`,
      html: reservationEmailHtml(
        "Ihre Reservierungsanfrage ist eingegangen",
        reservation,
        "Wir melden uns zeitnah mit einer Bestaetigung.",
      ),
      text: reservationEmailText(
        "Ihre Reservierungsanfrage ist eingegangen",
        reservation,
        "Wir melden uns zeitnah mit einer Bestaetigung.",
      ),
    },
  ])

  return reservation
}

async function updateReservationStatus(args: Record<string, unknown>) {
  const client = await getDataClient()
  const id = stringValue(args.id, "id")
  const status = statusValue(args.status)
  const existing = await client.models.Reservation.get({ id })

  if (existing.errors?.length || !existing.data) {
    console.error("Reservation lookup failed", existing.errors)
    throw new Error("Reservation not found")
  }

  const previousReservation = existing.data as ReservationPayload
  const previousStatus = previousReservation.status
  const result = await client.models.Reservation.update({ id, status })

  if (result.errors?.length || !result.data) {
    console.error("Reservation status update failed", result.errors)
    throw new Error("Reservation could not be updated")
  }

  const reservation = result.data as ReservationPayload

  if (previousStatus !== status && status === "CONFIRMED") {
    await safeSendEmails([
      {
        to: reservation.email,
        subject: `${env.RESTAURANT_NAME}: Reservierung bestaetigt`,
        html: reservationEmailHtml(
          "Ihre Reservierung wurde bestaetigt",
          reservation,
          "Wir freuen uns auf Ihren Besuch.",
        ),
        text: reservationEmailText(
          "Ihre Reservierung wurde bestaetigt",
          reservation,
          "Wir freuen uns auf Ihren Besuch.",
        ),
      },
    ])
  }

  if (previousStatus !== status && status === "REJECTED") {
    await safeSendEmails([
      {
        to: reservation.email,
        subject: `${env.RESTAURANT_NAME}: Rueckmeldung zu Ihrer Reservierung`,
        html: reservationEmailHtml(
          "Rueckmeldung zu Ihrer Reservierungsanfrage",
          reservation,
          "Leider koennen wir Ihre Anfrage nicht bestaetigen. Bitte kontaktieren Sie uns fuer Alternativen.",
        ),
        text: reservationEmailText(
          "Rueckmeldung zu Ihrer Reservierungsanfrage",
          reservation,
          "Leider koennen wir Ihre Anfrage nicht bestaetigen. Bitte kontaktieren Sie uns fuer Alternativen.",
        ),
      },
    ])
  }

  return reservation
}

async function getDataClient() {
  dataClientPromise ??= getAmplifyDataClientConfig(env).then(
    ({ resourceConfig, libraryOptions }) => {
      Amplify.configure(resourceConfig, libraryOptions)
      return generateClient<Schema>()
    },
  )

  return dataClientPromise
}

function validateCreateInput(args: Record<string, unknown>) {
  const date = dateValue(args.date)
  const time = timeValue(args.time)
  const guests = integerValue(args.guests, "guests")

  if (guests < 1) {
    throw new Error("Guests must be at least 1")
  }

  return {
    name: minString(args.name, "name", 2),
    email: emailValue(args.email),
    phone: optionalString(args.phone),
    date,
    time,
    guests,
    message: optionalString(args.message),
  }
}

function stringValue(value: unknown, fieldName: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required`)
  }
  return value.trim()
}

function minString(value: unknown, fieldName: string, minLength: number) {
  const text = stringValue(value, fieldName)
  if (text.length < minLength) {
    throw new Error(`${fieldName} is too short`)
  }
  return text
}

function optionalString(value: unknown) {
  if (typeof value !== "string") {
    return null
  }
  const text = value.trim()
  return text.length ? text : null
}

function emailValue(value: unknown) {
  const email = stringValue(value, "email").toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Email is invalid")
  }
  return email
}

function dateValue(value: unknown) {
  const date = stringValue(value, "date")
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Date must be YYYY-MM-DD")
  }
  return date
}

function timeValue(value: unknown) {
  const time = stringValue(value, "time")
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    throw new Error("Time must be HH:MM")
  }
  return time
}

function integerValue(value: unknown, fieldName: string) {
  const number = typeof value === "number" ? value : Number(value)
  if (!Number.isInteger(number)) {
    throw new Error(`${fieldName} must be an integer`)
  }
  return number
}

function statusValue(value: unknown): ReservationStatus {
  if (value === "PENDING" || value === "CONFIRMED" || value === "REJECTED") {
    return value
  }
  throw new Error("Status is invalid")
}

async function safeSendEmails(
  messages: Array<{ to: string; subject: string; html: string; text: string }>,
) {
  await Promise.all(
    messages.map(async (message) => {
      try {
        await ses.send(
          new SendEmailCommand({
            FromEmailAddress: env.SES_FROM_EMAIL,
            Destination: {
              ToAddresses: [message.to],
            },
            Content: {
              Simple: {
                Subject: {
                  Data: message.subject,
                  Charset: "UTF-8",
                },
                Body: {
                  Html: {
                    Data: message.html,
                    Charset: "UTF-8",
                  },
                  Text: {
                    Data: message.text,
                    Charset: "UTF-8",
                  },
                },
              },
            },
          }),
        )
      } catch (error) {
        console.error("Reservation email failed", {
          to: message.to,
          subject: message.subject,
          error,
        })
      }
    }),
  )
}

function reservationEmailHtml(
  title: string,
  reservation: ReservationPayload,
  intro?: string,
) {
  const rows = [
    ["Name", reservation.name],
    ["E-Mail", reservation.email],
    ["Telefon", reservation.phone || "-"],
    ["Datum", reservation.date],
    ["Uhrzeit", reservation.time],
    ["Gaeste", String(reservation.guests)],
    ["Status", reservation.status],
    ["Nachricht", reservation.message || "-"],
  ]

  return `
    <div style="font-family:Arial,sans-serif;color:#161a1d;line-height:1.5">
      <h1 style="color:#a4161a;font-size:24px">${escapeHtml(title)}</h1>
      ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th align="left" style="border-bottom:1px solid #d3d3d3">${escapeHtml(label)}</th>
                  <td style="border-bottom:1px solid #d3d3d3">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <p style="margin-top:24px">
        ${escapeHtml(env.RESTAURANT_NAME)}<br />
        ${escapeHtml(env.RESTAURANT_ADDRESS)}<br />
        ${escapeHtml(env.RESTAURANT_PHONE)}<br />
        ${escapeHtml(env.RESTAURANT_EMAIL)}
      </p>
    </div>
  `
}

function reservationEmailText(
  title: string,
  reservation: ReservationPayload,
  intro?: string,
) {
  return [
    title,
    intro,
    `Name: ${reservation.name}`,
    `E-Mail: ${reservation.email}`,
    `Telefon: ${reservation.phone || "-"}`,
    `Datum: ${reservation.date}`,
    `Uhrzeit: ${reservation.time}`,
    `Gaeste: ${reservation.guests}`,
    `Status: ${reservation.status}`,
    `Nachricht: ${reservation.message || "-"}`,
    "",
    env.RESTAURANT_NAME,
    env.RESTAURANT_ADDRESS,
    env.RESTAURANT_PHONE,
    env.RESTAURANT_EMAIL,
  ]
    .filter(Boolean)
    .join("\n")
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
