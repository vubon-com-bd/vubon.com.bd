// application/commands/index.ts — Commands barrel export
export * from './notification/index.js';
export * from './email/index.js';
export * from './sms/index.js';
export * from './push/index.js';
export * from './in-app/index.js';
export * from './template/index.js';
export * from './schedule/index.js';
export * from './broadcast/index.js';
export * from './digest/index.js';
export * from './preference/index.js';
export * from './device/index.js';
export * from './webhook/index.js';
export * from './provider-webhook/index.js';

// Aggregated handler arrays (for module wiring)
import { NOTIFICATION_COMMAND_HANDLERS } from './notification/index.js';
import { EMAIL_COMMAND_HANDLERS } from './email/index.js';
import { SMS_COMMAND_HANDLERS } from './sms/index.js';
import { PUSH_COMMAND_HANDLERS } from './push/index.js';
import { IN_APP_COMMAND_HANDLERS } from './in-app/index.js';
import { TEMPLATE_COMMAND_HANDLERS } from './template/index.js';
import { SCHEDULE_COMMAND_HANDLERS } from './schedule/index.js';
import { BROADCAST_COMMAND_HANDLERS } from './broadcast/index.js';
import { DIGEST_COMMAND_HANDLERS } from './digest/index.js';
import { PREFERENCE_COMMAND_HANDLERS } from './preference/index.js';
import { DEVICE_COMMAND_HANDLERS } from './device/index.js';
import { WEBHOOK_COMMAND_HANDLERS } from './webhook/index.js';
import { PROVIDER_WEBHOOK_COMMAND_HANDLERS } from './provider-webhook/index.js';

export const ALL_COMMAND_HANDLERS = [
  ...NOTIFICATION_COMMAND_HANDLERS,
  ...EMAIL_COMMAND_HANDLERS,
  ...SMS_COMMAND_HANDLERS,
  ...PUSH_COMMAND_HANDLERS,
  ...IN_APP_COMMAND_HANDLERS,
  ...TEMPLATE_COMMAND_HANDLERS,
  ...SCHEDULE_COMMAND_HANDLERS,
  ...BROADCAST_COMMAND_HANDLERS,
  ...DIGEST_COMMAND_HANDLERS,
  ...PREFERENCE_COMMAND_HANDLERS,
  ...DEVICE_COMMAND_HANDLERS,
  ...WEBHOOK_COMMAND_HANDLERS,
  ...PROVIDER_WEBHOOK_COMMAND_HANDLERS,
] as const;
