import type { Metadata } from "next"
import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo"
import { BrandWordmark } from "@/components/brand-wordmark"
import { companyInfo } from "@/lib/company-info"

export const metadata: Metadata = createPageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung für die Website des Porto Vecchio in Speyer.",
  path: "/datenschutz",
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

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-20 text-carbon md:px-10 md:py-28">
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Startseite", path: "/" },
          { name: "Datenschutz", path: "/datenschutz" },
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
          <h1 className="font-serif text-4xl text-carbon md:text-5xl">
            Datenschutzerklärung
          </h1>
        </div>

        <article className="bg-white p-6 shadow-lg md:p-10">
          <div className="space-y-10">
            <LegalSection title="1. Datenschutz auf einen Blick">
              <h3 className="font-serif text-xl text-carbon">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
                Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
                identifiziert werden können. Ausführliche Informationen zum Thema
                Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
                Datenschutzerklärung.
              </p>

              <h3 className="font-serif text-xl text-carbon">Datenerfassung auf unserer Website</h3>
              <h4 className="font-semibold text-carbon">
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </h4>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
                Website entnehmen.
              </p>

              <h4 className="font-semibold text-carbon">Wie erfassen wir Ihre Daten?</h4>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
                Hierbei kann es sich z.B. um Daten handeln, die Sie uns telefonisch
                oder auf anderem direkten Weg mitteilen.
              </p>
              <p>
                Andere Daten werden automatisch beim Besuch der Website durch unsere
                IT-Systeme erfasst. Das sind vor allem technische Daten (z.B.
                Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die
                Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website
                betreten.
              </p>

              <h4 className="font-semibold text-carbon">Wofür nutzen wir Ihre Daten?</h4>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
                Website zu gewährleisten. Andere Daten können zur Analyse Ihres
                Nutzerverhaltens verwendet werden.
              </p>

              <h4 className="font-semibold text-carbon">
                Welche Rechte haben Sie bezüglich Ihrer Daten?
              </h4>
              <p>
                Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft,
                Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
                erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder
                Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum
                Thema Datenschutz können Sie sich jederzeit unter der im Impressum
                angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein
                Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </LegalSection>

            <LegalSection title="2. Allgemeine Hinweise und Pflichtinformationen">
              <h3 className="font-serif text-xl text-carbon">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten
                sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
                entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
                Datenschutzerklärung.
              </p>
              <p>
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
                Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
                persönlich identifiziert werden können. Die vorliegende
                Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir
                sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
                der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
                lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                möglich.
              </p>

              <h3 className="font-serif text-xl text-carbon">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website
                ist:
              </p>
              <p>
                {companyInfo.name}
                <br />
                Inhaber: {companyInfo.owner}
                <br />
                {companyInfo.addressLine1}
                <br />
                {companyInfo.addressLine2}
                <br />
                Telefon: {companyInfo.phoneDisplay}
              </p>
              <p>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die
                allein oder gemeinsam mit anderen über die Zwecke und Mittel der
                Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o.
                Ä.) entscheidet.
              </p>

              <h3 className="font-serif text-xl text-carbon">
                Widerruf Ihrer Einwilligung zur Datenverarbeitung
              </h3>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
                Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
                jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an
                uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung
                bleibt vom Widerruf unberührt.
              </p>

              <h3 className="font-serif text-xl text-carbon">
                Beschwerderecht bei der zuständigen Aufsichtsbehörde
              </h3>
              <p>
                Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein
                Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige
                Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der
                Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen
                seinen Sitz hat. Eine Liste der Datenschutzbeauftragten sowie deren
                Kontaktdaten können folgendem Link entnommen werden:{" "}
                <a
                  href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mahogany underline-offset-4 hover:underline"
                >
                  https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
                </a>
                .
              </p>

              <h3 className="font-serif text-xl text-carbon">Recht auf Datenübertragbarkeit</h3>
              <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder
                in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an
                einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu
                lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen
                Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar
                ist.
              </p>

              <h3 className="font-serif text-xl text-carbon">SSL- bzw. TLS-Verschlüsselung</h3>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                vertraulicher Inhalte, wie zum Beispiel Anfragen, die
                Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung.
                Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
                des Browsers von “http://” auf “https://” wechselt und an dem
                Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p>
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten,
                die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>

              <h3 className="font-serif text-xl text-carbon">Auskunft, Sperrung, Löschung</h3>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das
                Recht auf unentgeltliche Auskunft über Ihre gespeicherten
                personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
                Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder
                Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
                personenbezogene Daten können Sie sich jederzeit unter der im Impressum
                angegebenen Adresse an uns wenden.
              </p>

              <h3 className="font-serif text-xl text-carbon">Widerspruch gegen Werbe-Mails</h3>
              <p>
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
                Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung
                und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der
                Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der
                unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails,
                vor.
              </p>
            </LegalSection>

            <LegalSection title="3. Datenerfassung auf unserer Website">
              <h3 className="font-serif text-xl text-carbon">Cookies</h3>
              <p>
                Die Internetseiten verwenden teilweise so genannte Cookies. Cookies
                richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
                Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und
                sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner
                abgelegt werden und die Ihr Browser speichert.
              </p>
              <p>
                Die meisten der von uns verwendeten Cookies sind so genannte
                “Session-Cookies”. Sie werden nach Ende Ihres Besuchs automatisch
                gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie
                diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim
                nächsten Besuch wiederzuerkennen.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
                Cookies informiert werden und Cookies nur im Einzelfall erlauben, die
                Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie
                das automatische Löschen der Cookies beim Schließen des Browser
                aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität
                dieser Website eingeschränkt sein.
              </p>
              <p>
                Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs
                oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B.
                Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs.
                1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes
                Interesse an der Speicherung von Cookies zur technisch fehlerfreien und
                optimierten Bereitstellung seiner Dienste. Soweit andere Cookies (z.B.
                Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden, werden diese
                in dieser Datenschutzerklärung gesondert behandelt.
              </p>

              <h3 className="font-serif text-xl text-carbon">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in
                so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
                übermittelt. Dies sind:
              </p>
              <LegalList
                items={[
                  "Browsertyp und Browserversion",
                  "verwendetes Betriebssystem",
                  "Referrer URL",
                  "Hostname des zugreifenden Rechners",
                  "Uhrzeit der Serveranfrage",
                  "IP-Adresse",
                ]}
              />
              <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
              <p>
                Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
                DSGVO. Der Webseitenbetreiber hat ein berechtigtes Interesse an der
                technisch fehlerfreien Darstellung und der Optimierung seiner Webseite –
                hierzu müssen die Server-Log-Files erfasst werden.
              </p>
            </LegalSection>

            <LegalSection title="4. Plugins und Tools">
              <h3 className="font-serif text-xl text-carbon">Google Web Fonts</h3>
              <p>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
                genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf
                einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren
                Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
              </p>
              <p>
                Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den
                Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber,
                dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von
                Google Web Fonts erfolgt im Interesse einer einheitlichen und
                ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein
                berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p>
                Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift
                von Ihrem Computer genutzt.
              </p>
              <p>
                Weitere Informationen zu Google Web Fonts finden Sie unter{" "}
                <a
                  href="https://developers.google.com/fonts/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mahogany underline-offset-4 hover:underline"
                >
                  https://developers.google.com/fonts/faq
                </a>{" "}
                und in der Datenschutzerklärung von Google:{" "}
                <a
                  href="https://www.google.com/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mahogany underline-offset-4 hover:underline"
                >
                  https://www.google.com/policies/privacy/
                </a>
                .
              </p>

              <h3 className="font-serif text-xl text-carbon">Google Maps</h3>
              <p>
                Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist
                die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
              </p>
              <p>
                Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP
                Adresse zu speichern. Diese Informationen werden in der Regel an einen
                Server von Google in den USA übertragen und dort gespeichert. Der Anbieter
                dieser Seite hat keinen Einfluss auf diese Datenübertragung.
              </p>
              <p>
                Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden
                Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit
                der von uns auf der Website angegebenen Orte. Dies stellt ein
                berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p>
                Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der
                Datenschutzerklärung von Google:{" "}
                <a
                  href="https://www.google.de/intl/de/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mahogany underline-offset-4 hover:underline"
                >
                  https://www.google.de/intl/de/policies/privacy/
                </a>
                .
              </p>
            </LegalSection>
          </div>
        </article>
      </section>
    </main>
  )
}
