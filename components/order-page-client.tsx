"use client"

import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  ShoppingBag,
  User,
  XCircle,
} from "lucide-react"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"
import { configureAmplifyClient, getErrorMessage } from "@/lib/amplify-client"
import { companyInfo } from "@/lib/company-info"
import { MENU_PDF_HREF } from "@/lib/menu"
import {
  getOrderTimeSlotsForDate,
  normalizeOrderPhone,
  validateOrderRequest,
} from "@/lib/orders"
import { todayDateValue } from "@/lib/reservations"
import { cn } from "@/lib/utils"

const emptyOrderForm = {
  name: "",
  email: "",
  phone: "",
  pickupDate: "",
  pickupTime: "",
  orderDetails: "",
  notes: "",
}

export function OrderPageClient() {
  const [formData, setFormData] = useState(emptyOrderForm)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const availableTimeSlots = useMemo(
    () => getOrderTimeSlotsForDate(formData.pickupDate),
    [formData.pickupDate],
  )

  useEffect(() => {
    if (formData.pickupTime && !availableTimeSlots.includes(formData.pickupTime)) {
      setFormData((current) => ({ ...current, pickupTime: "" }))
    }
  }, [availableTimeSlots, formData.pickupTime])

  useEffect(() => {
    try {
      configureAmplifyClient()
    } catch (err) {
      console.error("Amplify configuration error:", err)
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validateOrderRequest(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      configureAmplifyClient()
      const normalizedPhone = normalizeOrderPhone(formData.phone)

      if (!normalizedPhone) {
        throw new Error("Invalid phone number after validation.")
      }

      const client = generateClient<Schema>()
      const { data: created, errors: gqlErrors } = await client.models.CustomerOrder.create({
        customerName: formData.name.trim(),
        email: formData.email.trim(),
        phone: normalizedPhone,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        orderDetails: formData.orderDetails.trim(),
        notes: formData.notes.trim() || null,
        status: "PENDING",
      })

      if (gqlErrors?.length) {
        throw new Error(gqlErrors[0].message)
      }

      if (!created?.id) {
        throw new Error("Order create returned no record.")
      }

      setIsSubmitted(true)
      setFormData(emptyOrderForm)
      setErrors({})
    } catch (err) {
      console.error("Order submit error:", err)
      setSubmitError(
        `Die Bestellung konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt. (${getErrorMessage(err)})`,
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
    <main className="min-h-screen bg-smoke text-carbon">
      <header className="border-b border-dust bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <a href="/" className="block w-32 transition hover:opacity-80" aria-label="Bonfini Startseite">
            <img src="/images/logo/logo-red.png" alt="Bonfini" className="h-auto w-full" />
          </a>
          <div className="flex items-center gap-3">
            <a
              href={companyInfo.menuHref}
              className="hidden items-center gap-2 rounded-lg border border-dust px-4 py-2 text-sm font-medium text-carbon transition hover:border-mahogany hover:text-mahogany sm:inline-flex"
            >
              <FileText className="h-4 w-4" />
              Speisekarte
            </a>
            <a
              href="/#reservierung"
              className="inline-flex items-center gap-2 rounded-lg bg-mahogany px-4 py-2 text-sm font-medium text-white transition hover:bg-garnet"
            >
              <ArrowLeft className="h-4 w-4" />
              Tisch reservieren
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div className="space-y-6">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-mahogany">
              <ShoppingBag className="h-4 w-4" />
              Bestellung
            </span>
            <h1 className="font-serif text-4xl leading-tight md:text-5xl">
              Bestellung ohne Online-Zahlung aufgeben
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Waehlen Sie Gerichte aus der Speisekarte, schreiben Sie Mengen und
              Sonderwuensche in das Formular und senden Sie die Anfrage ab. Unser
              Team bestaetigt die Bestellung direkt.
            </p>
          </div>

          <div className="rounded-xl border border-dust bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl text-carbon">Speisekarte</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Die aktuelle PDF-Speisekarte ist die Grundlage fuer Bestellungen.
              Zahlung erfolgt vor Ort oder bei Abholung.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={companyInfo.menuHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-mahogany px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-garnet"
              >
                <FileText className="h-4 w-4" />
                Speisekarte ansehen
              </a>
              <a
                href={MENU_PDF_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-dust px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-carbon transition hover:border-mahogany hover:text-mahogany"
              >
                PDF oeffnen
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-mahogany/20 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mahogany">
              Kontakt
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <a href={companyInfo.phoneHref} className="flex items-center gap-3 hover:text-mahogany">
                <Phone className="h-4 w-4 text-mahogany" />
                {companyInfo.phoneDisplay}
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 hover:text-mahogany">
                <Mail className="h-4 w-4 text-mahogany" />
                {companyInfo.email}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-carbon/5 md:p-8">
          {isSubmitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
              <h2 className="font-serif text-3xl text-carbon">Bestellung erhalten</h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Ihre Bestellanfrage wurde gesendet. Das Bonfini-Team bestaetigt
                Verfuegbarkeit und Abholzeit direkt. Es wurde keine Online-Zahlung
                ausgefuehrt.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-8 rounded-lg bg-mahogany px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-garnet"
              >
                Neue Bestellung
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

              <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FieldError error={errors.name}>
                    <User className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                    <input
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Name"
                      className={inputClasses("name")}
                    />
                  </FieldError>

                  <FieldError error={errors.email}>
                    <Mail className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="E-Mail"
                      className={inputClasses("email")}
                    />
                  </FieldError>

                  <FieldError error={errors.phone}>
                    <Phone className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                    <input
                      name="tel"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Telefon"
                      className={inputClasses("phone")}
                    />
                  </FieldError>

                  <FieldError error={errors.pickupDate}>
                    <Calendar className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                    <input
                      name="pickupDate"
                      type="date"
                      required
                      min={todayDateValue()}
                      autoComplete="off"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      onFocus={() => setFocusedField("pickupDate")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(inputClasses("pickupDate"), "cursor-pointer")}
                    />
                  </FieldError>

                  <FieldError error={errors.pickupTime}>
                    <Clock className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-silver" />
                    <select
                      name="pickupTime"
                      required
                      autoComplete="off"
                      disabled={!formData.pickupDate || availableTimeSlots.length === 0}
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      onFocus={() => setFocusedField("pickupTime")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        inputClasses("pickupTime"),
                        "cursor-pointer appearance-none",
                        (!formData.pickupDate || availableTimeSlots.length === 0) &&
                          "cursor-not-allowed opacity-60",
                      )}
                    >
                      <option value="">
                        {!formData.pickupDate
                          ? "Bitte zuerst Datum waehlen"
                          : availableTimeSlots.length === 0
                            ? "An diesem Tag geschlossen"
                            : "Abholzeit waehlen"}
                      </option>
                      {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time} Uhr
                        </option>
                      ))}
                    </select>
                  </FieldError>
                </div>

                <FieldError error={errors.orderDetails}>
                  <ShoppingBag className="absolute left-4 top-4 z-10 h-5 w-5 text-silver" />
                  <textarea
                    name="orderDetails"
                    rows={7}
                    required
                    value={formData.orderDetails}
                    onChange={(e) => setFormData({ ...formData, orderDetails: e.target.value })}
                    onFocus={() => setFocusedField("orderDetails")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Ihre Bestellung, z. B. 2x Pizza Margherita, 1x Tiramisu"
                    className={textAreaClasses(focusedField === "orderDetails", Boolean(errors.orderDetails))}
                  />
                </FieldError>

                <FieldError>
                  <MessageSquare className="absolute left-4 top-4 z-10 h-5 w-5 text-silver" />
                  <textarea
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    onFocus={() => setFocusedField("notes")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Hinweise, Allergien oder Rueckfragen"
                    className={textAreaClasses(focusedField === "notes", false)}
                  />
                </FieldError>

                <div className="rounded-lg bg-smoke p-4 text-sm leading-6 text-muted-foreground">
                  Keine Online-Zahlung: Das Restaurant bestaetigt die Bestellung
                  und klaert Zahlung sowie Abholung direkt mit Ihnen.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-mahogany py-4 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-garnet active:scale-[0.98] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    "Bestellung senden"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

function textAreaClasses(isFocused: boolean, hasError: boolean) {
  return cn(
    "w-full resize-none rounded-lg border-2 bg-smoke py-4 pl-12 pr-4 text-carbon transition-all duration-300 placeholder:text-silver",
    isFocused
      ? "border-mahogany shadow-[0_0_0_3px_rgba(164,22,26,0.1)]"
      : "border-transparent hover:border-silver/50",
    hasError && "border-strawberry",
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
