// notification-service/domain/repositories/index.ts
// Repository barrel export

// ─── Notification aggregate ──────────────
export * from './notification.repository.interface.js';
export * from './notification-content.repository.interface.js';
export * from './notification-recipient.repository.interface.js';
export * from './notification-action.repository.interface.js';
export * from './notification-delivery.repository.interface.js';
export * from './notification-attempt.repository.interface.js';

// ─── Template aggregate ──────────────────
export * from './template.repository.interface.js';
export * from './template-variable.repository.interface.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.repository.interface.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.repository.interface.js';
export * from './broadcast-result.repository.interface.js';

// ─── Digest aggregate ────────────────────
export * from './digest.repository.interface.js';
export * from './digest-item.repository.interface.js';

// ─── Preference aggregate ────────────────
export * from './preference.repository.interface.js';
export * from './preference-matrix.repository.interface.js';

// ─── Device aggregate ────────────────────
export * from './device.repository.interface.js';
export * from './device-token.repository.interface.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.repository.interface.js';
