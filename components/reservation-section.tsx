"use client"

import { FormEvent, type ReactNode, useState, useEffect } from "react"
import Image from "next/image"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  Users,
  XCircle,
} from "lucide-react"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"
import { useInView } from "@/hooks/use-in-view"
import { companyInfo, openingHours } from "@/lib/company-info"
import {
  reservationTimeSlots,
  todayDateValue,
  validateReservationRequest,
} from "@/lib/reservations"
import { cn } from "@/lib/utils"

let configured = false
function ensureAmplify() {
  if (configured) return
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const outputs = require("@/amplify_outputs.json")
    Amplify.configure(outputs, { ssr: true })
    configured = true
  } catch {
    // outputs not yet generated
  }
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  message: "",
}

export function ReservationSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [formData, setFormData] = useState(emptyForm)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => { ensureAmplify() }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validateReservationRequest(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const client = generateClient<Schema>()
      const { data: created, errors: gqlErrors } = await client.models.Reservation.create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        reservationDate: formData.date,
        reservationTime: formData.time,
        guests: Number(formData.guests),
        message: formData.message.trim() || null,
        status: "PENDING",
      })

      if (gqlErrors?.length) {
        throw new Error(gqlErrors[0].message)
      }

      // Send email notifications (best-effort, don't block success)
      try {
        if (created) {
          await client.queries.sendReservationEmail({
            id: created.id,
            name: created.name,
            email: created.email,
            phone: created.phone ?? undefined,
            reservationDate: created.reservationDate,
            reservationTime: created.reservationTime,
            guests: created.guests,
            message: created.message ?? undefined,
            status: "PENDING",
          })
        }
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr)
      }

      setIsSubmitted(true)
      setFormData(emptyForm)
      setErrors({})
    } catch (err) {
      console.error("Reservation submit error:", err)
      setSubmitError(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName: string) =>
    cn(
      "w-full rounded-lg border-2 bg-smoke py-4 pl-12 pr-4 text-carbon transition-all duration-300 placeholder:text-silver",
      focusedField === fieldName
        ? "border-mahogany shadow-[0_0_0_3px_rgba(164,22,26,0.1)]"
        : "border-transparent hover:border-silver/50",
      errors[fieldName] && "border-strawberry",
    )

  return (
    <section id="reservierung" ref={ref} className="bg-smoke py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "mb-16 text-center transition-all duration-1000",
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-mahogany">
            Reservierung
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-carbon md:text-5xl lg:text-6xl">
            Reservieren Sie einen Tisch bei uns
          </h2>
          <div className="thin-divider mx-auto mt-6 w-24" />
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className={cn(
              "transition-all delay-200 duration-1000",
              isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0",
            )}
          >
            <div className="rounded-2xl bg-white p-8 shadow-xl shadow-carbon/5 md:p-10">
              {isSubmitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
                  <h3 className="mb-2 font-serif text-2xl text-carbon">
                    Vielen Dank!
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Ihre Reservierungsanfrage wurde erfolgreich gesendet. Wir
                    werden uns in Kürze bei Ihnen melden, um die Reservierung zu
                    bestätigen.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-lg bg-mahogany px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-garnet"
                  >
                    Neue Reservierung
                  </button>
                </div>
              ) : (
                <>
                  {submitError && (
                    <div className="mb-6 rounded-lg border border-strawberry/30 bg-red-50 p-4 text-strawberry">
                      <div className="flex items-start gap-3">
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        <p className="text-sm">{submitError}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FieldError error={errors.name}>
                        <User className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                        <input
                          type="text"
                          required
                          minLength={2}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Name"
                          className={inputClasses("name")}
                        />
                      </FieldError>

                      <FieldError error={errors.email}>
                        <Mail className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="E-Mail"
                          className={inputClasses("email")}
                        />
                      </FieldError>

                      <FieldError>
                        <Phone className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Telefon"
                          className={inputClasses("phone")}
                        />
                      </FieldError>

                      <FieldError error={errors.guests}>
                        <Users className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                        <input
                          type="number"
                          min={1}
                          step={1}
                          required
                          value={formData.guests}
                          onChange={(e) =>
                            setFormData({ ...formData, guests: e.target.value })
                          }
                          onFocus={() => setFocusedField("guests")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Gaeste"
                          className={inputClasses("guests")}
                        />
                      </FieldError>

                      <FieldError error={errors.date}>
                        <Calendar className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                        <input
                          type="date"
                          required
                          min={todayDateValue()}
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          onFocus={() => setFocusedField("date")}
                          onBlur={() => setFocusedField(null)}
                          className={cn(inputClasses("date"), "cursor-pointer")}
                        />
                      </FieldError>

                      <FieldError error={errors.time}>
                        <Clock className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                        <select
                          required
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          onFocus={() => setFocusedField("time")}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            inputClasses("time"),
                            "cursor-pointer appearance-none",
                          )}
                        >
                          <option value="">Uhrzeit waehlen</option>
                          {reservationTimeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time} Uhr
                            </option>
                          ))}
                        </select>
                      </FieldError>
                    </div>

                    <FieldError>
                      <MessageSquare className="absolute left-4 top-4 z-10 h-5 w-5 text-silver" />
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Nachricht / besondere Wuensche"
                        className={cn(
                          "w-full resize-none rounded-lg border-2 bg-smoke py-4 pl-12 pr-4 text-carbon transition-all duration-300 placeholder:text-silver",
                          focusedField === "message"
                            ? "border-mahogany shadow-[0_0_0_3px_rgba(164,22,26,0.1)]"
                            : "border-transparent hover:border-silver/50",
                        )}
                      />
                    </FieldError>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="magnetic-btn flex w-full items-center justify-center gap-2 rounded-lg bg-mahogany py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-garnet active:scale-[0.98] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Wird gesendet…
                        </>
                      ) : (
                        "Tisch reservieren"
                      )}
                    </button>
                  </form>
                </>
              )}

              <div className="mt-8 border-t border-dust pt-8">
                <p className="mb-4 text-sm text-muted-foreground">
                  Oder kontaktieren Sie uns direkt:
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <a
                    href={companyInfo.phoneHref}
                    className="group flex items-center gap-3 text-carbon transition-colors hover:text-mahogany"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smoke transition-colors group-hover:bg-mahogany/10">
                      <Phone className="h-4 w-4 text-mahogany" />
                    </div>
                    <span className="font-medium">{companyInfo.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="group flex items-center gap-3 text-carbon transition-colors hover:text-mahogany"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smoke transition-colors group-hover:bg-mahogany/10">
                      <Mail className="h-4 w-4 text-mahogany" />
                    </div>
                    <span className="font-medium">{companyInfo.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all delay-400 duration-1000",
              isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
            )}
          >
            <div className="relative min-h-[500px] overflow-hidden rounded-2xl shadow-xl shadow-carbon/10 lg:min-h-[700px]">
              <Image
                src="/images/interior.jpg"
                alt="Elegantes Restaurant Interieur"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="rounded-xl bg-white/95 p-6 shadow-lg backdrop-blur-sm md:p-8">
                  <h3 className="mb-6 font-serif text-2xl text-carbon">
                    Oeffnungszeiten
                  </h3>
                  <div className="space-y-4">
                    {openingHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between gap-4 border-b border-dust pb-3 last:border-0 last:pb-0"
                      >
                        <span className="font-medium text-carbon">
                          {item.day}
                        </span>
                        <span className="text-right text-muted-foreground">
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Kuechenschluss 30 Minuten vor Schliessung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FieldError({
  children,
  error,
}: {
  children: ReactNode
  error?: string
}) {
  return (
    <div>
      <div className="relative">{children}</div>
      {error ? <p className="mt-1 text-xs text-strawberry">{error}</p> : null}
    </div>
  )
}
