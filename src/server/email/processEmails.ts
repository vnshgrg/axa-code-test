import { emailDB } from "./emailDB";
import { sendEmail } from "./sendEmail";

export const processEmails = async () => {
  try {
    const emails = emailDB.getPendingEmails();
    if (emails.length === 0) {
      console.log("No pending emails to send.");
      return;
    }

    // locking the in-memory DB to prevent sending sending redundant emails
    // this doesn't prevent adding new email request to the DB
    emailDB.lock();
    // sending emails serially
    // there are some limitations with making bulk async requests at once
    for (const email of emails) {
      const { id, subject } = email;
      console.log(`Sending: ${subject}`);
      await sendEmail(id);
      emailDB.markEmailAsSent(id);
    }
    // unlocking
    emailDB.unlock();
  } catch (error) {
    console.log(error);
    emailDB.unlock();
  }
};
