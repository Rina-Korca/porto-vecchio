import { Suspense } from "react"
import { AdminLoginForm } from "@/components/admin/admin-login-form"

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-smoke px-6 py-12 text-carbon">
      <div className="w-full max-w-md rounded-lg border border-dust bg-white p-8 shadow-xl shadow-carbon/5">
        <p className="text-xs uppercase tracking-[0.3em] text-mahogany">
          Bonfini Admin
        </p>
        <h1 className="mt-3 font-serif text-4xl">Anmelden</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Interner Zugang fuer Reservierungsverwaltung.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
