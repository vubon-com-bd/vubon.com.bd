// notification-service/domain/entities/index.ts
// Entity barrel export

// ─── Notification aggregate ──────────────
export * from './notification.entity.js';
export * from './notification-content.entity.js';
export * from './notification-recipient.entity.js';
export * from './notification-action.entity.js';
export * from './notification-delivery.entity.js';
export * from './notification-attempt.entity.js';

// ─── Template aggregate ──────────────────
export * from './template.entity.js';
export * from './template-variable.entity.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.entity.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.entity.js';
export * from './broadcast-result.entity.js';

// ─── Digest aggregate ────────────────────
export * from './digest.entity.js';
export * from './digest-item.entity.js';

// ─── Preference aggregate ────────────────
export * from './preference.entity.js';
export * from './preference-matrix.entity.js';

// ─── Device aggregate ────────────────────
export * from './device.entity.js';
export * from './device-token.entity.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.entity.js';
