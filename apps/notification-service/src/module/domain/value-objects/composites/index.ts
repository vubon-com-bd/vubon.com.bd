// notification-service/domain/value-objects/composites/index.ts
// Composite VO barrel

// ─── Notification family ──────────────────
export * from './notification.vo.js';
export * from './notification-content.vo.js';
export * from './notification-recipient.vo.js';
export * from './notification-action.vo.js';
export * from './notification-delivery.vo.js';
export * from './notification-attempt.vo.js';
export * from './notification-summary.vo.js';

// ─── Template family ──────────────────────
export * from './template.vo.js';
export * from './template-variable.vo.js';
export * from './template-render.vo.js';

// ─── Schedule family ──────────────────────
export * from './schedule.vo.js';

// ─── Broadcast family ─────────────────────
export * from './broadcast.vo.js';
export * from './broadcast-result.vo.js';

// ─── Digest family ────────────────────────
export * from './digest.vo.js';
export * from './digest-item.vo.js';

// ─── Preference family ────────────────────
export * from './preference.vo.js';
export * from './preference-matrix.vo.js';

// ─── Device family ────────────────────────
export * from './device.vo.js';
export * from './device-token.vo.js';

// ─── Webhook family ───────────────────────
export * from './webhook.vo.js';
export * from './webhook-payload.vo.js';

// ─── Channel-specific messages ────────────
export * from './email-message.vo.js';
export * from './sms-message.vo.js';
export * from './push-message.vo.js';
export * from './in-app-message.vo.js';
