export const companyInfo = {
  name: "Ristorante Bonfini",
  addressLine1: "Chausseestraße 15",
  addressLine2: "10115 Berlin",
  country: "Germany",
  addressDisplay: "Chausseestraße 15, 10115 Berlin, Germany",
  phoneDisplay: "+49 30 95614848",
  phoneHref: "tel:+493095614848",
  email: "reservierung@ristorante-bonfini.de",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Chausseestra%C3%9Fe+15%2C+10115+Berlin%2C+Germany",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Chausseestra%C3%9Fe+15%2C+10115+Berlin%2C+Germany",
}

export const openingSchedule = [
  { day: "Monday", dayIndex: 1, opensAt: "11:30", closesAt: "23:00", hours: "11:30 AM – 11:00 PM" },
  { day: "Tuesday", dayIndex: 2, opensAt: "11:30", closesAt: "23:00", hours: "11:30 AM – 11:00 PM" },
  { day: "Wednesday", dayIndex: 3, opensAt: "11:30", closesAt: "23:00", hours: "11:30 AM – 11:00 PM" },
  { day: "Thursday", dayIndex: 4, opensAt: "11:30", closesAt: "23:00", hours: "11:30 AM – 11:00 PM" },
  { day: "Friday", dayIndex: 5, opensAt: "11:30", closesAt: "24:00", hours: "11:30 AM – 12:00 AM" },
  { day: "Saturday", dayIndex: 6, opensAt: "12:00", closesAt: "24:00", hours: "12:00 PM – 12:00 AM" },
  { day: "Sunday", dayIndex: 0, opensAt: "12:00", closesAt: "23:00", hours: "12:00 PM – 11:00 PM" },
]

export const openingHours = openingSchedule.map(({ day, hours }) => ({ day, hours }))
