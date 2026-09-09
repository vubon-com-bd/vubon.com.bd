import { getEnv } from './env/env.validation';

export const emailConfig = {
  provider: getEnv('EMAIL_PROVIDER', 'smtp'),
  host: getEnv('SMTP_HOST', 'smtp.gmail.com'),
  port: getEnv('SMTP_PORT', 587),
  secure: false,
  user: getEnv('SMTP_USER', ''),
  pass: getEnv('SMTP_PASS', ''),
  from: getEnv('EMAIL_FROM', 'noreply@vubon.com'),
  fromName: getEnv('EMAIL_FROM_NAME', 'Vubon'),
  maxRecipients: 1000,
  timeout: 30,
  retryAttempts: 3,
  retryDelay: 60,
};
