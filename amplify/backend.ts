import { defineBackend } from "@aws-amplify/backend";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { sendReservationEmail } from "./functions/send-reservation-email/resource";
import { sendStatusEmail } from "./functions/send-status-email/resource";

const backend = defineBackend({
  auth,
  data,
  sendReservationEmail,
  sendStatusEmail,
});

const sesPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ["ses:SendEmail", "ses:SendRawEmail"],
  resources: [
    "arn:aws:ses:eu-west-1:*:identity/ristorante-bonfini.de",
    "arn:aws:ses:eu-west-1:*:identity/bonfini.de",
  ],
});

backend.sendReservationEmail.resources.lambda.addToRolePolicy(sesPolicy);
backend.sendStatusEmail.resources.lambda.addToRolePolicy(sesPolicy);
