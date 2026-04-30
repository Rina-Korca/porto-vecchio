import { Amplify } from "aws-amplify"
import outputs from "@/amplify_outputs.json"

let configured = false

type AmplifyOutputs = {
  auth?: {
    aws_region?: string
    identity_pool_id?: string
    user_pool_id?: string
    user_pool_client_id?: string
  }
  data?: {
    url?: string
    aws_region?: string
    default_authorization_type?: string
    model_introspection?: unknown
  }
}

export function configureAmplifyClient() {
  if (configured) return

  const config = outputs as AmplifyOutputs

  if (!config.data?.url || !config.data?.model_introspection) {
    throw new Error(
      "Amplify is not configured: amplify_outputs.json is missing the GraphQL data endpoint. Run the Amplify backend deploy and rebuild the frontend."
    )
  }

  if (
    config.data.default_authorization_type === "AWS_IAM" &&
    (!config.auth?.identity_pool_id || !config.auth?.aws_region)
  ) {
    throw new Error(
      "Amplify is not configured: amplify_outputs.json is missing the Cognito identity pool required for guest reservations."
    )
  }

  Amplify.configure(config)
  configured = true
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}
