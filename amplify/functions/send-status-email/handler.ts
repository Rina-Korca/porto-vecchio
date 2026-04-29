import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "eu-west-1" });
const SES_SENDER = process.env.SES_SENDER_EMAIL!;

interface StatusEvent {
  email: string;
  name: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  status: "CONFIRMED" | "REJECTED" | "CANCELLED";
}

const statusText: Record<string, { subject: string; body: string }> = {
  CONFIRMED: {
    subject: "Reservierung bestätigt",
    body: "Ihre Reservierung wurde bestätigt. Wir freuen uns auf Ihren Besuch!",
  },
  REJECTED: {
    subject: "Reservierung leider nicht möglich",
    body: "Leider können wir Ihre Reservierung nicht bestätigen. Bitte kontaktieren Sie uns für alternative Termine.",
  },
  CANCELLED: {
    subject: "Reservierung storniert",
    body: "Ihre Reservierung wurde storniert.",
  },
};

export const handler = async (event: StatusEvent) => {
  const r = event;
  const t = statusText[r.status] ?? statusText.CANCELLED;

  await ses.send(
    new SendEmailCommand({
      Source: SES_SENDER,
      Destination: { ToAddresses: [r.email] },
      Message: {
        Subject: { Data: `${t.subject} – ${r.reservationDate}` },
        Body: {
          Html: {
            Data: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <h2 style="color:#a4161a">Ristorante Bonfini</h2>
  <p>Liebe/r ${r.name},</p>
  <p>${t.body}</p>
  <table style="border-collapse:collapse;width:100%;margin:16px 0">
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Datum</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.reservationDate}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Uhrzeit</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.reservationTime} Uhr</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Gäste</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${r.guests}</td></tr>
  </table>
  <p>Mit freundlichen Grüßen,<br/>Ristorante Bonfini</p>
</div>`,
          },
        },
      },
    })
  );

  return { success: true };
};
