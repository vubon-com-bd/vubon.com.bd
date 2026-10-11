// application/queries/index.ts — Queries barrel export
export * from './notification/index.js';
export * from './email/index.js';
export * from './sms/index.js';
export * from './push/index.js';
export * from './in-app/index.js';
export * from './delivery/index.js';
export * from './template/index.js';
export * from './schedule/index.js';
export * from './broadcast/index.js';
export * from './digest/index.js';
export * from './preference/index.js';
export * from './device/index.js';
export * from './webhook/index.js';
export * from './analytics/index.js';

// Aggregated handler arrays
import { NOTIFICATION_QUERY_HANDLERS } from './notification/index.js';
import { EMAIL_QUERY_HANDLERS } from './email/index.js';
import { SMS_QUERY_HANDLERS } from './sms/index.js';
import { PUSH_QUERY_HANDLERS } from './push/index.js';
import { IN_APP_QUERY_HANDLERS } from './in-app/index.js';
import { DELIVERY_QUERY_HANDLERS } from './delivery/index.js';
import { TEMPLATE_QUERY_HANDLERS } from './template/index.js';
import { SCHEDULE_QUERY_HANDLERS } from './schedule/index.js';
import { BROADCAST_QUERY_HANDLERS } from './broadcast/index.js';
import { DIGEST_QUERY_HANDLERS } from './digest/index.js';
import { PREFERENCE_QUERY_HANDLERS } from './preference/index.js';
import { DEVICE_QUERY_HANDLERS } from './device/index.js';
import { WEBHOOK_QUERY_HANDLERS } from './webhook/index.js';
import { ANALYTICS_QUERY_HANDLERS } from './analytics/index.js';

export const ALL_QUERY_HANDLERS = [
  ...NOTIFICATION_QUERY_HANDLERS,
  ...EMAIL_QUERY_HANDLERS,
  ...SMS_QUERY_HANDLERS,
  ...PUSH_QUERY_HANDLERS,
  ...IN_APP_QUERY_HANDLERS,
  ...DELIVERY_QUERY_HANDLERS,
  ...TEMPLATE_QUERY_HANDLERS,
  ...SCHEDULE_QUERY_HANDLERS,
  ...BROADCAST_QUERY_HANDLERS,
  ...DIGEST_QUERY_HANDLERS,
  ...PREFERENCE_QUERY_HANDLERS,
  ...DEVICE_QUERY_HANDLERS,
  ...WEBHOOK_QUERY_HANDLERS,
  ...ANALYTICS_QUERY_HANDLERS,
] as const;
