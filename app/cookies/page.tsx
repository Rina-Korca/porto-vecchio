import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Cookie-Richtlinie von Porto Vecchio.",
  robots: { index: false, follow: true },
}

const sections = [
  {
    title: "1. Was sind Cookies?",
    body: "Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Website besuchen. Sie ermöglichen es unter anderem, Informationen über Ihr Nutzungsverhalten zu speichern.",
  },
  {
    title: "2. Technisch notwendige Cookies",
    body: "Wir setzen technisch notwendige Cookies ein, die für den sicheren und störungsfreien Betrieb der Website erforderlich sind (Art. 6 Abs. 1 lit. f DSGVO, § 25 Abs. 2 Nr. 2 TTDSG). Diese können nicht deaktiviert werden.",
  },
  {
    title: "3. Analyse-Cookies (Google Analytics)",
    body: "Sofern Sie einwilligen, verwenden wir Google Analytics zur anonymisierten Reichweitenmessung. Dabei werden Cookies gesetzt und Daten an Google LLC übertragen. Diese Cookies werden erst nach Ihrer aktiven Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen.",
  },
  {
    title: "4. Ihre Wahl",
    body: "Beim ersten Besuch unserer Website können Sie wählen, ob Sie Analyse-Cookies zulassen möchten. Ihre Entscheidung wird lokal in Ihrem Browser gespeichert und kann jederzeit über den Link „Cookie-Einstellungen“ im Footer geändert werden.",
  },
]

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-20 text-carbon md:px-10 md:py-28">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="mb-10 inline-block text-sm text-carbon/50 hover:text-carbon">
          ← Zurück zur Startseite
        </a>
        <h1 className="mb-10 font-serif text-3xl font-bold">Cookie-Richtlinie</h1>
        <div className="space-y-8 text-sm leading-relaxed text-carbon/70">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-semibold text-carbon">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
