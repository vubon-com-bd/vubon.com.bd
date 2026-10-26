// notification-service/application/services/interfaces/index.ts
// Service interfaces barrel

// ─── Notification aggregate ──────────────
export * from './notification.service.interface.js';
export * from './notification-content.service.interface.js';
export * from './notification-recipient.service.interface.js';
export * from './notification-action.service.interface.js';
export * from './notification-delivery.service.interface.js';
export * from './notification-attempt.service.interface.js';

// ─── Template aggregate ──────────────────
export * from './template.service.interface.js';
export * from './template-variable.service.interface.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.service.interface.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.service.interface.js';
export * from './broadcast-result.service.interface.js';

// ─── Digest aggregate ────────────────────
export * from './digest.service.interface.js';
export * from './digest-item.service.interface.js';

// ─── Preference aggregate ────────────────
export * from './preference.service.interface.js';
export * from './preference-matrix.service.interface.js';

// ─── Device aggregate ────────────────────
export * from './device.service.interface.js';
export * from './device-token.service.interface.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.service.interface.js';
