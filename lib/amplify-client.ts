"use client"

import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import outputs from "@/amplify_outputs.json"
import type { Schema } from "@/amplify/data/resource"

let configured = false
let client: ReturnType<typeof generateClient<Schema>> | null = null

export function hasAmplifyOutputs() {
  const config = outputs as Record<string, unknown>
  return Boolean(config.auth && config.data)
}

export function configureAmplify() {
  if (configured || !hasAmplifyOutputs()) {
    return
  }

  Amplify.configure(outputs, { ssr: true })
  configured = true
}

export function getReservationClient() {
  configureAmplify()

  if (!client) {
    client = generateClient<Schema>()
  }

  return client
}
