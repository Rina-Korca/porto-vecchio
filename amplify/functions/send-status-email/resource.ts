import { defineFunction } from "@aws-amplify/backend";

export const sendStatusEmail = defineFunction({
  name: "send-status-email",
  entry: "./handler.ts",
  environment: {
    SES_SENDER_EMAIL: "reservierung@ristorante-bonfini.de",
  },
  timeoutSeconds: 15,
});
