import { emailDB } from "./emailDB";

let emailInputData = { subject: "test subject", body: "test email body" };

describe("test emailDB class", () => {
  it("Initial value should be an empty array", () => {
    expect(emailDB.getAllEmails()).toStrictEqual([]);
  });

  it("should add email", () => {
    emailDB.addEmail(emailInputData);
    // get first email from the db
    const firstEmail = emailDB.getAllEmails()[0];
    expect(firstEmail.subject).toEqual(emailInputData.subject);
    expect(firstEmail.body).toEqual(emailInputData.body);
  });

  it("should see previous email as pending", () => {
    const pendingEmail = emailDB.getPendingEmails()[0];
    expect(pendingEmail.status).toBe("pending");
  });

  it("should not get pending emails when DB is locked", () => {
    emailDB.lock();
    const pendingEmails = emailDB.getPendingEmails();
    expect(pendingEmails).toStrictEqual([]);
  });

  it("should return list of pending emails after unlocked", () => {
    emailDB.unlock();
    const pendingEmail = emailDB.getPendingEmails()[0];
    expect(pendingEmail.subject).toEqual(emailInputData.subject);
    expect(pendingEmail.body).toEqual(emailInputData.body);
  });

  it("should mark an email as sent", () => {
    const { id } = emailDB.getPendingEmails()[0];
    expect(emailDB.getEmailById(id)?.status).toEqual("pending");
    // mark email as sent
    emailDB.markEmailAsSent(id);
    expect(emailDB.getEmailById(id)?.status).toEqual("sent");
  });
});
