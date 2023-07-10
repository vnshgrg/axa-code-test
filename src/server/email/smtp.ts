import * as nodemailer from "nodemailer";
import { environment } from "../utils";

const { smtp_host, smtp_port, smtp_username, smtp_password } = environment;

// SMTP settings
const smtpConfig = {
  host: smtp_host,
  port: smtp_port,
  secure: false,
  auth: {
    user: smtp_username,
    pass: smtp_password,
  },
};

export const mailerTransporter = nodemailer.createTransport(smtpConfig);
