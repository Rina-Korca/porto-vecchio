import { defineBackend } from "@aws-amplify/backend"
import { PolicyStatement } from "aws-cdk-lib/aws-iam"
import { auth } from "./auth/resource"
import { data } from "./data/resource"
import { reservationNotifications } from "./functions/reservation-notifications/resource"

const backend = defineBackend({
  auth,
  data,
  reservationNotifications,
})

backend.reservationNotifications.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["ses:SendEmail", "ses:SendRawEmail"],
    resources: ["*"],
  }),
)
