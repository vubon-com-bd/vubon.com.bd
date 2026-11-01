// notification-service/application/services/impl/index.ts
// Service implementations barrel

// ─── Notification aggregate ──────────────
export * from './notification.service.js';
export * from './notification-content.service.js';
export * from './notification-recipient.service.js';
export * from './notification-action.service.js';
export * from './notification-delivery.service.js';
export * from './notification-attempt.service.js';

// ─── Template aggregate ──────────────────
export * from './template.service.js';
export * from './template-variable.service.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.service.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.service.js';
export * from './broadcast-result.service.js';

// ─── Digest aggregate ────────────────────
export * from './digest.service.js';
export * from './digest-item.service.js';

// ─── Preference aggregate ────────────────
export * from './preference.service.js';
export * from './preference-matrix.service.js';

// ─── Device aggregate ────────────────────
export * from './device.service.js';
export * from './device-token.service.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.service.js';
