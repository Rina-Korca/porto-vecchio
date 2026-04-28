import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminUnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-smoke px-6 py-12 text-carbon">
      <div className="w-full max-w-md rounded-lg border border-dust bg-white p-8 text-center shadow-xl shadow-carbon/5">
        <p className="text-xs uppercase tracking-[0.3em] text-mahogany">
          Bonfini Admin
        </p>
        <h1 className="mt-3 font-serif text-4xl">Kein Zugriff</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Dieser Bereich ist nur fuer Mitglieder der Cognito-Gruppe ADMINS.
        </p>
        <Button asChild className="mt-8">
          <Link href="/admin/login">Zur Anmeldung</Link>
        </Button>
      </div>
    </main>
  )
}
