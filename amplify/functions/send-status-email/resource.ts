import { defineFunction } from "@aws-amplify/backend";

export const sendStatusEmail = defineFunction({
  name: "send-status-email",
  entry: "./handler.ts",
  runtime: 22,
  environment: {
    SES_SENDER_EMAIL: "reservierung@ristorante-bonfini.de",
  },
  timeoutSeconds: 15,
});
