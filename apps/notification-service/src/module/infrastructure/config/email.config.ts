/**
 * Email Config
 * @module notification-service/infrastructure/config
 */
import {
  EMAIL_CONFIG,
  SMTP_CONFIG,
  SENDGRID_CONFIG,
  SES_CONFIG,
  MAILGUN_CONFIG,
  RESEND_CONFIG,
} from '@vubon/shared-config/platform';

export const EMAIL_PROVIDERS_CONFIG = Object.freeze({
  base: EMAIL_CONFIG,
  smtp: SMTP_CONFIG,
  sendgrid: SENDGRID_CONFIG,
  ses: SES_CONFIG,
  mailgun: MAILGUN_CONFIG,
  resend: RESEND_CONFIG,
});
