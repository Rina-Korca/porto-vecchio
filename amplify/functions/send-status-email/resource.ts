import { defineFunction } from "@aws-amplify/backend";

export const sendStatusEmail = defineFunction({
  name: "send-status-email",
  entry: "./handler.ts",
  runtime: 22,
  environment: {
    SES_SENDER_EMAIL: process.env.SES_SENDER_EMAIL ?? "",
  },
  timeoutSeconds: 15,
});
