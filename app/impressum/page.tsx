import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Phone } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo"
import { BrandWordmark } from "@/components/brand-wordmark"
import { companyInfo } from "@/lib/company-info"

export const metadata: Metadata = createPageMetadata({
  title: "Impressum",
  description: "Rechtliche Angaben des Porto Vecchio in Speyer.",
  path: "/impressum",
})

function LegalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-dust pt-8 first:border-t-0 first:pt-0">
      <h2 className="mb-4 font-serif text-2xl text-carbon">{title}</h2>
      <div className="space-y-4 leading-7 text-muted-foreground">{children}</div>
    </section>
  )
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-20 text-carbon md:px-10 md:py-28">
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Startseite", path: "/" },
          { name: "Impressum", path: "/impressum" },
        ])}
      />
      <section className="mx-auto max-w-4xl">
        <div className="mb-12">
          <a href="/" aria-label="Porto Vecchio Startseite" className="mb-8 inline-block">
            <BrandWordmark className="text-carbon" />
          </a>
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-mahogany">
            Rechtliche Angaben
          </p>
          <h1 className="font-serif text-4xl text-carbon md:text-5xl">Impressum</h1>
        </div>

        <article className="bg-white p-6 shadow-lg md:p-10">
          <div className="space-y-10">
            <LegalSection title="Angaben gemäß § 5 TMG">
              <p>
                {companyInfo.name}
                <br />
                Inhaber: {companyInfo.owner}
                <br />
                {companyInfo.addressLine1}
                <br />
                {companyInfo.addressLine2}
              </p>
            </LegalSection>

            <LegalSection title="Vertreten durch">
              <p>{companyInfo.owner}</p>
            </LegalSection>

            <LegalSection title="Kontakt">
              <div className="space-y-3">
                <a
                  href={companyInfo.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-mahogany"
                >
                  <Phone className="h-5 w-5 shrink-0 text-mahogany" />
                  <span>{companyInfo.phoneDisplay}</span>
                </a>
              </div>
            </LegalSection>

            <LegalSection title="Streitschlichtung">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
                (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mahogany underline-offset-4 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere Kontaktdaten finden Sie oben im Impressum.
              </p>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
                einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </LegalSection>

            <LegalSection title="Haftung für Inhalte">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
                diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
                nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </LegalSection>

            <LegalSection title="Haftung für Links">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren
                Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
                Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
                ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
                entfernen.
              </p>
            </LegalSection>

            <LegalSection title="Urheberrecht">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
                werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
                wir derartige Inhalte umgehend entfernen.
              </p>
            </LegalSection>
          </div>
        </article>
      </section>
    </main>
  )
}
