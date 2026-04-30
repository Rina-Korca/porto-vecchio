import { defineBackend } from "@aws-amplify/backend";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { sendReservationEmail } from "./functions/send-reservation-email/resource.js";
import { sendStatusEmail } from "./functions/send-status-email/resource.js";

const backend = defineBackend({
  auth,
  data,
  sendReservationEmail,
  sendStatusEmail,
});

const sesPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ["ses:SendEmail", "ses:SendRawEmail"],
  resources: ["*"],
});

backend.sendReservationEmail.resources.lambda.addToRolePolicy(sesPolicy);
backend.sendStatusEmail.resources.lambda.addToRolePolicy(sesPolicy);
