import { defineFunction } from "@aws-amplify/backend";

export const sendReservationEmail = defineFunction({
  name: "send-reservation-email",
  entry: "./handler.ts",
  runtime: 22,
  environment: {
    SES_SENDER_EMAIL: "reservierung@ristorante-bonfini.de",
    ADMIN_EMAILS:
      "reservierung@ristorante-bonfini.de",
  },
  timeoutSeconds: 15,
});
