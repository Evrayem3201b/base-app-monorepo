// api/src/lib/email.ts
import "dotenv/config";
import { Resend } from "resend";
import { APP_NAME } from "@base-app/shared";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  await resend.emails.send({
    from: `${APP_NAME} <onboarding@resend.dev>`, // swap for your verified domain later
    to,
    subject,
    html,
  });
}