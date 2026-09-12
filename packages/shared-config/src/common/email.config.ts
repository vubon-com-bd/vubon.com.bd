import { getOptionalEnv } from './env/env.validation';

export const emailConfig = {
  provider: getOptionalEnv('EMAIL_PROVIDER', 'smtp'),
  host: getOptionalEnv('SMTP_HOST', 'smtp.gmail.com'),
  port: Number(getOptionalEnv('SMTP_PORT', '587')),
  secure: getOptionalEnv('SMTP_SECURE', 'false') === 'true',
  user: getOptionalEnv('SMTP_USER', ''),
  pass: getOptionalEnv('SMTP_PASS', ''),
  from: getOptionalEnv('EMAIL_FROM', 'noreply@vubon.com'),
  fromName: getOptionalEnv('EMAIL_FROM_NAME', 'Vubon'),
  maxRecipients: 1000,
  timeout: 30,
  retryAttempts: 3,
  retryDelay: 60,
} as const;
