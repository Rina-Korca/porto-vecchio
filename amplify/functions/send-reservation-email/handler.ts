import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "eu-west-1" });

interface ReservationEvent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  message?: string;
  status: string;
}

export const handler = async (event: { arguments: ReservationEvent }) => {
  const r = event.arguments;

  const SES_SENDER = process.env.SES_SENDER_EMAIL;
  if (!SES_SENDER) {
    console.error("SES_SENDER_EMAIL env var is not set");
    return { success: false, error: "Sender email not configured" };
  }

  const adminRaw = process.env.ADMIN_EMAILS ?? "";
  const adminEmails = adminRaw.split(",").map((e) => e.trim()).filter(Boolean);
  if (!adminEmails.length) {
    console.error("ADMIN_EMAILS env var is empty or not set");
    return { success: false, error: "Admin emails not configured" };
  }

  if (!r.email) {
    console.error("Customer email is missing from arguments:", JSON.stringify(r));
    return { success: false, error: "Customer email is required" };
  }

  console.log("Sending reservation emails", {
    customer: r.email,
    admins: adminEmails,
    sender: SES_SENDER,
    id: r.id,
  });

  await Promise.all([
    ses.send(
      new SendEmailCommand({
        Source: SES_SENDER,
        Destination: { ToAddresses: [r.email] },
        Message: {
          Subject: {
            Data: `Reservierungsanfrage erhalten – ${r.reservationDate}`,
          },
          Body: {
            Html: {
              Data: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#a4161a">Ristorante Bonfini</h2>
  <p>Liebe/r ${r.name},</p>
  <p>vielen Dank für Ihre Reservierungsanfrage!</p>
  <table style="border-collapse:collapse;width:100%;margin:16px 0">
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Datum</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.reservationDate}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Uhrzeit</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.reservationTime} Uhr</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Gäste</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.guests}</td></tr>
  </table>
  <p style="background:#fff3cd;padding:12px;border-radius:6px"><strong>Hinweis:</strong> Ihre Reservierung ist noch nicht bestätigt. Unser Team wird sich in Kürze bei Ihnen melden.</p>
  <p>Mit freundlichen Grüßen,<br/>Ristorante Bonfini</p>
</div>`,
            },
          },
        },
      })
    ),

    ses.send(
      new SendEmailCommand({
        Source: SES_SENDER,
        Destination: { ToAddresses: adminEmails },
        Message: {
          Subject: {
            Data: `Neue Reservierung – ${r.name} – ${r.reservationDate} ${r.reservationTime}`,
          },
          Body: {
            Html: {
              Data: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#a4161a">Neue Reservierungsanfrage</h2>
  <p>Status: <strong>PENDING</strong></p>
  <table style="border-collapse:collapse;width:100%;margin:16px 0">
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>ID</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.id}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Name</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.name}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>E-Mail</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.email}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Telefon</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.phone || "-"}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Datum</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.reservationDate}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Uhrzeit</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.reservationTime} Uhr</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Gäste</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.guests}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Nachricht</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.message || "-"}</td></tr>
  </table>
</div>`,
            },
          },
        },
      })
    ),
  ]);

  return { success: true };
};
