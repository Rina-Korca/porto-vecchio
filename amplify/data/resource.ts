import { type ClientSchema, a, defineData } from "@aws-amplify/backend"
import { reservationNotifications } from "../functions/reservation-notifications/resource"

const schema = a
  .schema({
  ReservationStatus: a.enum(["PENDING", "CONFIRMED", "REJECTED"]),

  ReservationResult: a.customType({
    id: a.id().required(),
    name: a.string().required(),
    email: a.email().required(),
    phone: a.string(),
    date: a.date().required(),
    time: a.string().required(),
    guests: a.integer().required(),
    message: a.string(),
    status: a.ref("ReservationStatus").required(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
  }),

  Reservation: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      date: a.date().required(),
      time: a.string().required(),
      guests: a.integer().required(),
      message: a.string(),
      status: a.ref("ReservationStatus").required(),
    })
    .secondaryIndexes((index) => [
      index("date").sortKeys(["time"]).queryField("reservationsByDateTime"),
      index("status")
        .sortKeys(["date", "time"])
        .queryField("reservationsByStatusDateTime"),
    ])
    .authorization((allow) => [
      allow.group("ADMINS").to(["read", "delete"]),
    ]),

  createReservationRequest: a
    .mutation()
    .arguments({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      date: a.date().required(),
      time: a.string().required(),
      guests: a.integer().required(),
      message: a.string(),
    })
    .returns(a.ref("ReservationResult"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(reservationNotifications)),

  updateReservationStatus: a
    .mutation()
    .arguments({
      id: a.id().required(),
      status: a.ref("ReservationStatus").required(),
    })
    .returns(a.ref("ReservationResult"))
    .authorization((allow) => [allow.group("ADMINS")])
    .handler(a.handler.function(reservationNotifications)),
  })
  .authorization((allow) => [
    allow.resource(reservationNotifications).to(["query", "mutate"]),
  ])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
