interface Environment {
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  santas_email_address: string;
  sender_email_address: string;
  axa_user_profiles: string;
  axa_users: string;
  allowed_max_age: number;
  app_port: number;
  app_name: string;
}

export const environment: Environment = {
  smtp_host: process.env.SMTP_HOST!,
  smtp_port: parseInt(process.env.SMTP_PORT || "587"),
  smtp_username: process.env.SMTP_USERNAME!,
  smtp_password: process.env.SMTP_PASSWORD!,
  santas_email_address: process.env.SANTAS_EMAIL_ADDRESS!,
  sender_email_address: process.env.SENDER_EMAIL_ADDRESS!,
  axa_user_profiles: process.env.AXA_USER_PROFILES!,
  axa_users: process.env.AXA_USERS!,
  allowed_max_age: parseInt(process.env.ALLOWED_MAX_AGE || "10"),
  app_port: parseInt(process.env.PORT || "3000"),
  app_name: process.env.PROJECT_NAME || `localhost`,
};
