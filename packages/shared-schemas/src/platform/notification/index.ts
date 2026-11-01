// shared-schemas/platform/notification/index.ts
// Notification sub-service barrel export

// ─── Domain schemas ───────────────────────
export * from './notification.schema.js';
export * from './notification-type.schema.js';
export * from './notification-channel.schema.js';
export * from './notification-status.schema.js';
export * from './notification-priority.schema.js';
export * from './notification-category.schema.js';
export * from './notification-delivery-status.schema.js';
export * from './notification-read-status.schema.js';
export * from './notification-action.schema.js';
export * from './email.schema.js';
export * from './sms.schema.js';
export * from './push.schema.js';
export * from './in-app.schema.js';
export * from './webhook.schema.js';
export * from './notification-template.schema.js';
export * from './notification-schedule.schema.js';
export * from './notification-broadcast.schema.js';
export * from './notification-digest.schema.js';
export * from './notification-rule.schema.js';
export * from './notification-preference.schema.js';
export * from './notification-device.schema.js';
export * from './notification-analytics.schema.js';
export * from './notification-report.schema.js';

// ─── Request schemas — Notification core ──
export * from './send-notification.schema.js';
export * from './send-bulk.schema.js';
export * from './resend-notification.schema.js';
export * from './cancel-notification.schema.js';
export * from './mark-read.schema.js';

// ─── Request schemas — Channel-specific ───
export * from './send-email.schema.js';
export * from './send-template-email.schema.js';
export * from './send-bulk-email.schema.js';
export * from './send-sms.schema.js';
export * from './send-bulk-sms.schema.js';
export * from './send-push.schema.js';
export * from './send-bulk-push.schema.js';

// ─── Request schemas — Template ───────────
export * from './create-template.schema.js';
export * from './update-template.schema.js';
export * from './test-template.schema.js';
export * from './send-notification-template.schema.js';

// ─── Request schemas — Schedule ───────────
export * from './create-schedule.schema.js';
export * from './update-schedule.schema.js';
export * from './cancel-schedule.schema.js';
export * from './send-notification-schedule.schema.js';

// ─── Request schemas — Broadcast ──────────
export * from './create-broadcast.schema.js';
export * from './start-broadcast.schema.js';
export * from './cancel-broadcast.schema.js';

// ─── Request schemas — Digest ─────────────
export * from './create-digest.schema.js';
export * from './send-digest.schema.js';

// ─── Request schemas — Preference ─────────
export * from './update-preference.schema.js';
export * from './bulk-update-preference.schema.js';
export * from './unsubscribe.schema.js';

// ─── Request schemas — Device ─────────────
export * from './register-device.schema.js';
export * from './update-device-token.schema.js';
export * from './unregister-device.schema.js';

// ─── Request schemas — Webhook ────────────
export * from './create-webhook.schema.js';
export * from './update-webhook.schema.js';
export * from './test-webhook.schema.js';

// ─── Provider webhooks ────────────────────
export * from './sendgrid-webhook.schema.js';
export * from './twilio-webhook.schema.js';
export * from './fcm-webhook.schema.js';
export * from './apns-webhook.schema.js';
