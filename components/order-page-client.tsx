"use client"

import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  User,
  XCircle,
} from "lucide-react"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"
import { configureAmplifyClient, getErrorMessage } from "@/lib/amplify-client"
import { companyInfo } from "@/lib/company-info"
import { MENU_PDF_HREF } from "@/lib/menu"
import {
  formatCurrency,
  ORDER_MENU_CATEGORIES,
  ORDER_MENU_ITEMS,
  type OrderMenuItem,
} from "@/lib/order-menu"
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
  notes: "",
}

const categoryOptions = [
  { id: "popular", label: "Beliebt" },
  ...ORDER_MENU_CATEGORIES,
]

type Cart = Record<string, number>

type CartItem = {
  item: OrderMenuItem
  quantity: number
}

export function OrderPageClient() {
  const [formData, setFormData] = useState(emptyOrderForm)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<Cart>({})

  const availableTimeSlots = useMemo(
    () => getOrderTimeSlotsForDate(formData.pickupDate),
    [formData.pickupDate],
  )

  const cartItems = useMemo<CartItem[]>(
    () =>
      ORDER_MENU_ITEMS
        .map((item) => ({ item, quantity: cart[item.id] ?? 0 }))
        .filter((entry) => entry.quantity > 0),
    [cart],
  )

  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0)
  const subtotalCents = cartItems.reduce(
    (sum, entry) => sum + entry.quantity * entry.item.priceCents,
    0,
  )
  const orderDetails = useMemo(
    () => buildOrderDetails(cartItems, subtotalCents),
    [cartItems, subtotalCents],
  )

  const visibleItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (query) {
      return ORDER_MENU_ITEMS.filter((item) => {
        const haystack = `${item.name} ${item.description} ${item.tags?.join(" ") ?? ""}`.toLowerCase()
        return haystack.includes(query)
      })
    }

    if (activeCategory === "popular") {
      return ORDER_MENU_ITEMS.filter((item) => item.popular)
    }

    return ORDER_MENU_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory, searchQuery])

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

  function incrementItem(itemId: string) {
    setCart((current) => ({
      ...current,
      [itemId]: Math.min((current[itemId] ?? 0) + 1, 20),
    }))
    setErrors((current) => {
      const { cart: _cartError, ...rest } = current
      return rest
    })
  }

  function decrementItem(itemId: string) {
    setCart((current) => {
      const nextQuantity = (current[itemId] ?? 0) - 1
      if (nextQuantity <= 0) {
        const { [itemId]: _removed, ...rest } = current
        return rest
      }

      return { ...current, [itemId]: nextQuantity }
    })
  }

  function removeItem(itemId: string) {
    setCart((current) => {
      const { [itemId]: _removed, ...rest } = current
      return rest
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    const nextErrors = validateOrderRequest({
      ...formData,
      orderDetails,
    })

    if (!cartItems.length) {
      nextErrors.cart = "Bitte waehlen Sie mindestens einen Artikel aus."
    }

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
        orderDetails,
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
      setCart({})
      setSearchQuery("")
      setActiveCategory("popular")
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
      "w-full rounded-lg border-2 bg-smoke py-3.5 pl-11 pr-4 text-carbon transition-all duration-300 placeholder:text-silver",
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

      {isSubmitted ? (
        <section className="mx-auto flex max-w-3xl items-center justify-center px-6 py-20">
          <div className="w-full rounded-2xl bg-white p-8 text-center shadow-xl shadow-carbon/5 md:p-10">
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-600" />
            <h1 className="font-serif text-4xl text-carbon">Bestellung erhalten</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
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
        </section>
      ) : (
        <section className="mx-auto grid max-w-[1500px] gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:py-12">
          <div>
            <div className="mb-8">
              <span className="mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-mahogany">
                <ShoppingBag className="h-4 w-4" />
                Online bestellen
              </span>
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h1 className="font-serif text-4xl leading-tight md:text-5xl">
                    Speisen und Getraenke waehlen und zur Abholung anfragen
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                    Stellen Sie Ihre Bestellung aus der Karte zusammen. Checkout
                    sendet eine Anfrage an das Restaurant; Zahlung erfolgt vor Ort
                    oder bei Abholung.
                  </p>
                </div>
                <a
                  href={MENU_PDF_HREF}
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-dust bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-carbon transition hover:border-mahogany hover:text-mahogany"
                >
                  <FileText className="h-4 w-4" />
                  PDF ansehen
                </a>
              </div>
            </div>

            <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="flex gap-2 overflow-x-auto rounded-xl border border-dust bg-white p-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category.id)
                      setSearchQuery("")
                    }}
                    className={cn(
                      "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition",
                      activeCategory === category.id && !searchQuery
                        ? "bg-mahogany text-white"
                        : "text-muted-foreground hover:bg-smoke hover:text-carbon",
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Speisen/Getraenke suchen"
                  className="h-full min-h-12 w-full rounded-xl border border-dust bg-white py-3 pl-11 pr-4 text-sm text-carbon outline-none transition focus:border-mahogany focus:ring-2 focus:ring-mahogany/10"
                />
              </div>
            </div>

            {errors.cart ? (
              <div className="mb-5 rounded-lg border border-strawberry/30 bg-red-50 p-4 text-sm text-strawberry">
                {errors.cart}
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] ?? 0}
                  onIncrement={() => incrementItem(item.id)}
                  onDecrement={() => decrementItem(item.id)}
                />
              ))}
            </div>

            {!visibleItems.length ? (
              <div className="rounded-xl border border-dust bg-white p-10 text-center text-muted-foreground">
                Keine Artikel gefunden. Sie koennen die PDF-Speisekarte pruefen
                oder telefonisch bestellen.
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-2xl border border-dust bg-white shadow-xl shadow-carbon/5"
              autoComplete="on"
            >
              <div className="border-b border-dust bg-carbon p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                      Warenkorb
                    </p>
                    <h2 className="mt-1 font-serif text-3xl">
                      {cartCount ? `${cartCount} Artikel` : "Noch leer"}
                    </h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
                    {formatCurrency(subtotalCents)}
                  </div>
                </div>
              </div>

              <div className="max-h-[42vh] overflow-y-auto border-b border-dust p-5">
                {cartItems.length ? (
                  <div className="space-y-4">
                    {cartItems.map(({ item, quantity }) => (
                      <CartRow
                        key={item.id}
                        item={item}
                        quantity={quantity}
                        onIncrement={() => incrementItem(item.id)}
                        onDecrement={() => decrementItem(item.id)}
                        onRemove={() => removeItem(item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl bg-smoke p-6 text-center text-sm text-muted-foreground">
                    Waehlen Sie links Artikel aus. Der Checkout wird aktiv,
                    sobald mindestens ein Artikel im Warenkorb liegt.
                  </div>
                )}
              </div>

              <div className="space-y-5 p-5">
                <div className="flex items-center justify-between rounded-xl bg-smoke p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Zwischensumme
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Zahlung bei Abholung
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-carbon">
                    {formatCurrency(subtotalCents)}
                  </p>
                </div>

                <div className="rounded-xl border border-mahogany/20 bg-mahogany/5 p-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                    <div>
                      <p className="text-sm font-semibold text-carbon">
                        Online-Zahlung geplant
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Aktuell wird keine Zahlung ausgefuehrt. Die Zahlung wird
                        direkt mit dem Restaurant geklaert.
                      </p>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="rounded-lg border border-strawberry/30 bg-red-50 p-4 text-strawberry">
                    <div className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <p className="text-sm">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <FieldError error={errors.name}>
                    <User className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-silver" />
                    <input
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Name"
                      className={inputClasses("name")}
                    />
                  </FieldError>

                  <FieldError error={errors.email}>
                    <Mail className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-silver" />
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="E-Mail"
                      className={inputClasses("email")}
                    />
                  </FieldError>

                  <FieldError error={errors.phone}>
                    <Phone className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-silver" />
                    <input
                      name="tel"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Telefon"
                      className={inputClasses("phone")}
                    />
                  </FieldError>

                  <FieldError error={errors.pickupDate}>
                    <Calendar className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-silver" />
                    <input
                      name="pickupDate"
                      type="date"
                      required
                      min={todayDateValue()}
                      autoComplete="off"
                      value={formData.pickupDate}
                      onChange={(event) => setFormData({ ...formData, pickupDate: event.target.value })}
                      onFocus={() => setFocusedField("pickupDate")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(inputClasses("pickupDate"), "cursor-pointer")}
                    />
                  </FieldError>

                  <FieldError error={errors.pickupTime}>
                    <Clock className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-silver" />
                    <select
                      name="pickupTime"
                      required
                      autoComplete="off"
                      disabled={!formData.pickupDate || availableTimeSlots.length === 0}
                      value={formData.pickupTime}
                      onChange={(event) => setFormData({ ...formData, pickupTime: event.target.value })}
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
                          ? "Datum waehlen"
                          : availableTimeSlots.length === 0
                            ? "Geschlossen"
                            : "Abholzeit"}
                      </option>
                      {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time} Uhr
                        </option>
                      ))}
                    </select>
                  </FieldError>
                </div>

                <FieldError>
                  <MessageSquare className="absolute left-4 top-4 z-10 h-4 w-4 text-silver" />
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
                    onFocus={() => setFocusedField("notes")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Hinweise, Allergien oder Rueckfragen"
                    className={textAreaClasses(focusedField === "notes")}
                  />
                </FieldError>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-mahogany py-4 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-garnet active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    "Bestellung anfragen"
                  )}
                </button>
              </div>
            </form>
          </aside>
        </section>
      )}
    </main>
  )
}

function MenuItemCard({
  item,
  quantity,
  onIncrement,
  onDecrement,
}: {
  item: OrderMenuItem
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <article className="flex min-h-[220px] flex-col justify-between rounded-xl border border-dust bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl leading-snug text-carbon">{item.name}</h3>
            {item.popular ? (
              <span className="mt-2 inline-flex rounded-full bg-mahogany/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-mahogany">
                Beliebt
              </span>
            ) : null}
          </div>
          <p className="shrink-0 text-sm font-bold text-mahogany">
            {formatCurrency(item.priceCents)}
          </p>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
        {item.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-smoke px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {quantity > 0 ? (
          <div className="flex h-11 items-center rounded-lg border border-dust">
            <button
              type="button"
              onClick={onDecrement}
              className="flex h-11 w-11 items-center justify-center text-carbon transition hover:bg-smoke"
              aria-label={`${item.name} entfernen`}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-9 text-center text-sm font-bold">{quantity}</span>
            <button
              type="button"
              onClick={onIncrement}
              className="flex h-11 w-11 items-center justify-center text-carbon transition hover:bg-smoke"
              aria-label={`${item.name} hinzufuegen`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onIncrement}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-mahogany px-4 text-sm font-semibold text-white transition hover:bg-garnet"
          >
            <Plus className="h-4 w-4" />
            Hinzufuegen
          </button>
        )}
      </div>
    </article>
  )
}

function CartRow({
  item,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: OrderMenuItem
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-dust pb-4 last:border-0 last:pb-0">
      <div>
        <p className="font-medium text-carbon">{item.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {quantity} x {formatCurrency(item.priceCents)}
        </p>
      </div>
      <div className="flex items-start gap-2">
        <div className="flex h-9 items-center rounded-lg border border-dust">
          <button
            type="button"
            onClick={onDecrement}
            className="flex h-9 w-9 items-center justify-center transition hover:bg-smoke"
            aria-label={`${item.name} reduzieren`}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-7 text-center text-sm font-bold">{quantity}</span>
          <button
            type="button"
            onClick={onIncrement}
            className="flex h-9 w-9 items-center justify-center transition hover:bg-smoke"
            aria-label={`${item.name} erhoehen`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
          aria-label={`${item.name} loeschen`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <p className="col-span-2 text-right text-sm font-bold text-carbon">
        {formatCurrency(item.priceCents * quantity)}
      </p>
    </div>
  )
}

function buildOrderDetails(cartItems: CartItem[], subtotalCents: number) {
  if (!cartItems.length) return ""

  const lines = cartItems.map(
    ({ item, quantity }) =>
      `${quantity}x ${item.name} - ${formatCurrency(item.priceCents * quantity)}`,
  )

  return [
    "Bestellung:",
    ...lines,
    "",
    `Zwischensumme: ${formatCurrency(subtotalCents)}`,
    "Zahlung: Keine Online-Zahlung, Zahlung bei Abholung/vor Ort.",
  ].join("\n")
}

function textAreaClasses(isFocused: boolean) {
  return cn(
    "w-full resize-none rounded-lg border-2 bg-smoke py-3.5 pl-11 pr-4 text-carbon transition-all duration-300 placeholder:text-silver",
    isFocused
      ? "border-mahogany shadow-[0_0_0_3px_rgba(164,22,26,0.1)]"
      : "border-transparent hover:border-silver/50",
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
