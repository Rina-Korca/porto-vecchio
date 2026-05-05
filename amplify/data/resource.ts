import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sendReservationEmail } from "../functions/send-reservation-email/resource.js";
import { sendStatusEmail } from "../functions/send-status-email/resource.js";

const schema = a.schema({
  Reservation: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone(),
      reservationDate: a.date().required(),
      reservationTime: a.string().required(),
      guests: a.integer().required(),
      message: a.string(),
      status: a.enum(["PENDING", "CONFIRMED", "REJECTED", "CANCELLED"]),
    })
    .authorization((allow) => [
      allow.guest().to(["create"]),
      allow.authenticated("identityPool").to(["create", "read", "update", "delete"]),
      allow.authenticated("userPools").to(["create", "read", "update", "delete"]),
    ]),

  CustomerOrder: a
    .model({
      customerName: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      pickupDate: a.date().required(),
      pickupTime: a.string().required(),
      orderDetails: a.string().required(),
      notes: a.string(),
      status: a.enum(["PENDING", "ACCEPTED", "PREPARING", "READY", "COMPLETED", "CANCELLED"]),
    })
    .authorization((allow) => [
      allow.guest().to(["create"]),
      allow.authenticated("identityPool").to(["create", "read", "update", "delete"]),
      allow.authenticated("userPools").to(["create", "read", "update", "delete"]),
    ]),

  sendReservationEmail: a
    .query()
    .arguments({
      id: a.string().required(),
      name: a.string().required(),
      email: a.string().required(),
      phone: a.string(),
      reservationDate: a.string().required(),
      reservationTime: a.string().required(),
      guests: a.integer().required(),
      message: a.string(),
      status: a.string().required(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.guest(), allow.authenticated("identityPool"), allow.authenticated("userPools")])
    .handler(a.handler.function(sendReservationEmail)),

  sendStatusEmail: a
    .query()
    .arguments({
      email: a.string().required(),
      name: a.string().required(),
      reservationDate: a.string().required(),
      reservationTime: a.string().required(),
      guests: a.integer().required(),
      status: a.string().required(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.authenticated("identityPool"), allow.authenticated("userPools")])
    .handler(a.handler.function(sendStatusEmail)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
