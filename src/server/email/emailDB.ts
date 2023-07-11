import { Log, generateUniqueId } from "../utils";

type EmailStatus = "pending" | "sent";

export interface Email {
  id: string;
  subject: string;
  body: string;
  status: EmailStatus;
  addedAt: Date;
  sentAt?: Date;
}

export interface EmailInput {
  body: string;
  subject: string;
}

export class EmailDatabase {
  private emailDatabase: Email[];
  private isProcessing: boolean;

  constructor() {
    this.emailDatabase = [];
    this.isProcessing = false;
  }

  getAllEmails(): Email[] {
    return this.emailDatabase;
  }

  getPendingEmails(): Email[] {
    if (this.isProcessing) {
      Log("[RETURNING EMPTY AS EMAIL IS STILL BEING PROCESSED]");
      return [];
    }
    return this.emailDatabase.filter((email) => email.status === "pending");
  }

  getEmailById(id: string): Email | undefined {
    return this.emailDatabase.find((email) => email.id === id);
  }

  addEmail(emailInput: EmailInput): string {
    const email: Email = {
      id: generateUniqueId(),
      subject: emailInput.subject,
      body: emailInput.body,
      status: "pending",
      addedAt: new Date(),
    };

    this.emailDatabase.push(email);
    Log(`[ADDED EMAIL TO DB] ${email.id}`);
    return email.id;
  }

  markEmailAsSent(id: string): void {
    this.emailDatabase = this.emailDatabase.map((email) =>
      email.id === id ? { ...email, status: "sent", sentAt: new Date() } : email
    );
    Log(`[MARKED AS SENT] ${id}`);
  }

  lock(): void {
    this.isProcessing = true;
    Log(`[DB LOCKED]`);
  }
  unlock(): void {
    this.isProcessing = false;
    Log(`[DB UNLOCKED]`);
  }
}

// Initialize our database
export const emailDB = new EmailDatabase();
