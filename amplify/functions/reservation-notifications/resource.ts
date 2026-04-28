import { defineFunction } from "@aws-amplify/backend"

export const reservationNotifications = defineFunction({
  name: "reservation-notifications",
  entry: "./handler.ts",
  environment: {
    RESTAURANT_NAME: "Ristorante Bonfini",
    RESTAURANT_EMAIL: "reservierung@ristorante-bonfini.de",
    RESTAURANT_PHONE: "+49 30 95614848",
    RESTAURANT_ADDRESS: "Chausseestrasse 15, 10115 Berlin, Germany",
    SES_FROM_EMAIL: "reservierung@ristorante-bonfini.de",
    OWNER_EMAIL: "reservierung@ristorante-bonfini.de",
  },
})
