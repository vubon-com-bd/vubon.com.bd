/**
 * Email base configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const EMAIL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('EMAIL_ENABLED', true),
  provider: getOptionalEnv('EMAIL_PROVIDER', 'smtp'), // smtp | sendgrid | ses | mailgun | resend
  fromName: getOptionalEnv('EMAIL_FROM_NAME', 'Vubon'),
  fromAddress: getOptionalEnv('EMAIL_FROM_ADDRESS', 'noreply@vubon.com.bd'),
  replyTo: getOptionalEnv('EMAIL_REPLY_TO', ''),
  maxRecipients: getOptionalEnvInt('EMAIL_MAX_RECIPIENTS', 100),
  maxAttachments: getOptionalEnvInt('EMAIL_MAX_ATTACHMENTS', 10),
  maxAttachmentSizeMb: getOptionalEnvInt('EMAIL_MAX_ATTACHMENT_MB', 25),
  trackOpens: getOptionalEnvBool('EMAIL_TRACK_OPENS', true),
  trackClicks: getOptionalEnvBool('EMAIL_TRACK_CLICKS', true),
  unsubscribeRequired: getOptionalEnvBool('EMAIL_UNSUBSCRIBE_REQUIRED', true),
});
