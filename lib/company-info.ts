export const companyInfo = {
  name: "Porto Vecchio",
  legalName: "Porto Vecchio",
  owner: "Arsim Konxheli",
  addressLine1: "Im Hafenbecken 11",
  addressLine2: "67346 Speyer",
  country: "Germany",
  addressDisplay: "Im Hafenbecken 11, 67346 Speyer",
  phoneDisplay: "06232 - 62 01 01",
  phoneHref: "tel:+496232620101",
  websiteHref: "https://www.portovecchio.de",
  email: "",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Porto%20Vecchio%20Im%20Hafenbecken%2011%2067346%20Speyer",
  googleProfileHref:
    "https://www.google.com/maps/search/?api=1&query=Porto%20Vecchio%20Im%20Hafenbecken%2011%2067346%20Speyer",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Porto%20Vecchio%20Im%20Hafenbecken%2011%2067346%20Speyer",
  menuHref: "/menu",
  menuPdfHref: "/menu/speisekarte.pdf",
  instagramHref: "https://www.instagram.com/porto_vecchio_speyer/",
  facebookHref: "https://www.facebook.com/Porto-Vecchio-641488872591668",
  priceRange: "€20–30 pro Person",
  reservationNote: "Reservierungen ausschließlich telefonisch",
  parkingNote:
    "Unmittelbar vor dem Restaurant finden Sie zwei gebührenpflichtige Parkplätze des Yacht-Hafens sowie Parkbuchten am Straßenrand.",
}

export const openingSchedule = [
  {
    day: "Monday",
    label: "Montag",
    dayIndex: 1,
    opensAt: "12:00",
    closesAt: "22:00",
    servicePeriods: [
      { opensAt: "12:00", closesAt: "14:30" },
      { opensAt: "17:00", closesAt: "22:00" },
    ],
    hours: "12:00 bis 14:30 Uhr und 17:00 bis 22:00 Uhr",
  },
  {
    day: "Tuesday",
    label: "Dienstag",
    dayIndex: 2,
    opensAt: "00:00",
    closesAt: "00:00",
    servicePeriods: [],
    isClosed: true,
    hours: "Ruhetag",
  },
  {
    day: "Wednesday",
    label: "Mittwoch",
    dayIndex: 3,
    opensAt: "12:00",
    closesAt: "22:00",
    servicePeriods: [
      { opensAt: "12:00", closesAt: "14:30" },
      { opensAt: "17:00", closesAt: "22:00" },
    ],
    hours: "12:00 bis 14:30 Uhr und 17:00 bis 22:00 Uhr",
  },
  {
    day: "Thursday",
    label: "Donnerstag",
    dayIndex: 4,
    opensAt: "12:00",
    closesAt: "22:00",
    servicePeriods: [
      { opensAt: "12:00", closesAt: "14:30" },
      { opensAt: "17:00", closesAt: "22:00" },
    ],
    hours: "12:00 bis 14:30 Uhr und 17:00 bis 22:00 Uhr",
  },
  {
    day: "Friday",
    label: "Freitag",
    dayIndex: 5,
    opensAt: "12:00",
    closesAt: "22:00",
    servicePeriods: [
      { opensAt: "12:00", closesAt: "14:30" },
      { opensAt: "17:00", closesAt: "22:00" },
    ],
    hours: "12:00 bis 14:30 Uhr und 17:00 bis 22:00 Uhr",
  },
  {
    day: "Saturday",
    label: "Samstag",
    dayIndex: 6,
    opensAt: "12:00",
    closesAt: "22:00",
    servicePeriods: [
      { opensAt: "12:00", closesAt: "14:30" },
      { opensAt: "17:00", closesAt: "22:00" },
    ],
    hours: "12:00 bis 14:30 Uhr und 17:00 bis 22:00 Uhr",
  },
  {
    day: "Sunday",
    label: "Sonntag",
    dayIndex: 0,
    opensAt: "12:00",
    closesAt: "22:00",
    servicePeriods: [
      { opensAt: "12:00", closesAt: "14:30" },
      { opensAt: "17:00", closesAt: "22:00" },
    ],
    hours: "12:00 bis 14:30 Uhr und 17:00 bis 22:00 Uhr",
  },
]

export const openingHours = openingSchedule.map(({ label, hours }) => ({ day: label, hours }))
