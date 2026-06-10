export const companyInfo = {
  name: "Ristorante Bonfini",
  addressLine1: "Chausseestraße 15",
  addressLine2: "10115 Berlin",
  country: "Germany",
  addressDisplay: "Chausseestraße 15, 10115 Berlin, Germany",
  phoneDisplay: "+49 30 95614848",
  phoneHref: "tel:+493095614848",
  email: "reservierung@ristorante-bonfini.de",
  mapsHref: "https://maps.app.goo.gl/VetrUvZnVC17T6XB6",
  googleProfileHref: "https://maps.app.goo.gl/VetrUvZnVC17T6XB6",
  mapsDirectionsHref:
    "https://www.google.com/maps/place/Ristorante+Bonfini/@52.529594,13.3820263,17z/data=!3m1!4b1!4m6!3m5!1s0x416523d127fc1e87:0x92e6d7ad9dd86823!8m2!3d52.5295908!4d13.3846012!16s%2Fg%2F1tfrft10?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
  menuHref: "/menu",
  menuPdfHref: "/menu/speisekarte.pdf",
  orderHref: "/bestellen",
  instagramHref: "https://www.instagram.com/ristorantebonfini/",
  facebookHref: "https://de-de.facebook.com/ristorantebonfini",
  tripadvisorHref:
    "https://www.tripadvisor.de/Restaurant_Review-g187323-d1347856-Reviews-Ristorante_Bonfini-Berlin.html",
  yelpHref: "https://www.yelp.de/biz/bonfini-berlin-2",
  priceRange: "€20–30 pro Person",
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
