import { emailDB } from "./emailDB";
import { mailerTransporter } from "./smtp";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/./../.env" });

export const sendEmail = async (id: string) => {
  try {
    const emailData = emailDB.getEmailById(id);
    if (!emailData) {
      return;
    }

    const { subject, body } = emailData;

    // Send mail with defined transport object
    const info = await mailerTransporter.sendMail({
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: process.env.SANTAS_EMAIL_ADDRESS,
      subject: subject,
      text: body,
    });
    console.log("Email sent:", info.messageId);
    return id;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};