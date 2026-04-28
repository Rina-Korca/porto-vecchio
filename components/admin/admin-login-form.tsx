"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LockKeyhole, LogIn } from "lucide-react"
import { confirmSignIn, fetchAuthSession, signIn } from "aws-amplify/auth"
import { Button } from "@/components/ui/button"
import { getReservationClient, hasAmplifyOutputs } from "@/lib/amplify-client"

export function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [requiresNewPassword, setRequiresNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      if (!hasAmplifyOutputs()) {
        throw new Error("Amplify outputs fehlen. Fuehren Sie zuerst ampx sandbox aus.")
      }

      getReservationClient()

      if (requiresNewPassword) {
        const result = await confirmSignIn({
          challengeResponse: newPassword,
        })
        if (!result.isSignedIn) {
          return
        }
      } else {
        const result = await signIn({
          username: email.trim(),
          password,
        })

        if (
          result.nextStep.signInStep ===
          "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
        ) {
          setRequiresNewPassword(true)
          return
        }

        if (!result.isSignedIn) {
          throw new Error("Anmeldung konnte nicht abgeschlossen werden.")
        }
      }

      const session = await fetchAuthSession()
      const groups = session.tokens?.accessToken.payload["cognito:groups"]
      const groupList = Array.isArray(groups) ? groups.map(String) : []

      if (!groupList.includes("ADMINS")) {
        router.replace("/admin/unauthorized")
        return
      }

      router.replace(safeNext(searchParams.get("next")))
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Anmeldung fehlgeschlagen.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <div className="rounded-lg border border-strawberry/30 bg-strawberry/10 p-3 text-sm text-garnet">
          {error}
        </div>
      ) : null}
      <label className="grid gap-2 text-sm font-medium">
        E-Mail
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 rounded-md border border-input bg-white px-3"
          required
          disabled={requiresNewPassword}
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Passwort
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11 rounded-md border border-input bg-white px-3"
          required
          disabled={requiresNewPassword}
        />
      </label>
      {requiresNewPassword ? (
        <label className="grid gap-2 text-sm font-medium">
          Neues Passwort
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="h-11 rounded-md border border-input bg-white px-3"
            required
            minLength={8}
          />
        </label>
      ) : null}
      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {requiresNewPassword ? <LockKeyhole /> : <LogIn />}
        {requiresNewPassword ? "Passwort setzen" : "Anmelden"}
      </Button>
    </form>
  )
}

function safeNext(next: string | null) {
  if (!next || !next.startsWith("/admin") || next.startsWith("//")) {
    return "/admin"
  }

  if (next === "/admin/login") {
    return "/admin"
  }

  return next
}
