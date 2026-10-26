/**
 * Provider Registry Config
 * @module notification-service/infrastructure/config
 *
 * Central provider selection priority:
 *  - Order defines fallback chain
 *  - First enabled provider wins
 */
import { getOptionalEnv } from '@vubon/shared-config/common';

export const PROVIDER_PRIORITY_CONFIG = Object.freeze({
  email: (getOptionalEnv('EMAIL_PROVIDER_ORDER', 'sendgrid,mailgun,resend,ses,smtp,postmark') as string).split(',').map((s) => s.trim()),
  sms: (getOptionalEnv('SMS_PROVIDER_ORDER', 'sslwireless,bulksmsbd,mimsms,twilio') as string).split(',').map((s) => s.trim()),
  push: (getOptionalEnv('PUSH_PROVIDER_ORDER', 'fcm,apns,onesignal,web-push,expo') as string).split(',').map((s) => s.trim()),
  webhook: (getOptionalEnv('WEBHOOK_PROVIDER_ORDER', 'http,slack,discord,telegram') as string).split(',').map((s) => s.trim()),
  inApp: (getOptionalEnv('IN_APP_PROVIDER_ORDER', 'websocket,sse') as string).split(',').map((s) => s.trim()),
});
