// notification-service/domain/value-objects/primitives/index.ts
// Primitive VO barrel — সব primitive value objects export

// ─── Notification Core ─────────────────────
export * from './notification-id.vo.js';
export * from './notification-type.vo.js';
export * from './notification-channel.vo.js';
export * from './notification-status.vo.js';
export * from './notification-priority.vo.js';
export * from './notification-category.vo.js';
export * from './notification-subject.vo.js';
export * from './notification-body.vo.js';
export * from './notification-data.vo.js';

// ─── Delivery ──────────────────────────────
export * from './delivery-status.vo.js';
export * from './delivery-attempt.vo.js';
export * from './delivery-error.vo.js';

// ─── Read Status ───────────────────────────
export * from './read-status.vo.js';
export * from './read-at.vo.js';

// ─── Action ────────────────────────────────
export * from './action-id.vo.js';
export * from './action-type.vo.js';
export * from './action-url.vo.js';

// ─── Template ──────────────────────────────
export * from './template-id.vo.js';
export * from './template-name.vo.js';
export * from './template-content.vo.js';
export * from './template-format.vo.js';
export * from './template-type.vo.js';
export * from './template-variable.vo.js';

// ─── Schedule ──────────────────────────────
export * from './schedule-id.vo.js';
export * from './schedule-status.vo.js';
export * from './schedule-type.vo.js';
export * from './schedule-frequency.vo.js';
export * from './schedule-time.vo.js';

// ─── Broadcast ─────────────────────────────
export * from './broadcast-id.vo.js';
export * from './broadcast-status.vo.js';
export * from './broadcast-type.vo.js';
export * from './broadcast-audience.vo.js';

// ─── Digest ────────────────────────────────
export * from './digest-id.vo.js';
export * from './digest-status.vo.js';
export * from './digest-type.vo.js';
export * from './digest-period.vo.js';

// ─── Preference ────────────────────────────
export * from './preference-id.vo.js';
export * from './preference-type.vo.js';
export * from './preference-option.vo.js';
export * from './preference-value.vo.js';

// ─── Device ────────────────────────────────
export * from './device-id.vo.js';
export * from './device-status.vo.js';
export * from './device-type.vo.js';
export * from './device-token.vo.js';
export * from './device-platform.vo.js';

// ─── Webhook ───────────────────────────────
export * from './webhook-id.vo.js';
export * from './webhook-status.vo.js';
export * from './webhook-type.vo.js';
export * from './webhook-url.vo.js';
export * from './webhook-secret.vo.js';

// ─── Contact & Provider ────────────────────
export * from './email-address.vo.js';
export * from './phone-number.vo.js';
export * from './provider-name.vo.js';
export * from './provider-message-id.vo.js';

// ─── Rate Limit ────────────────────────────
export * from './rate-limit-key.vo.js';

// ─── Cross-Service Reference ───────────────
export * from './user-id.vo.js';
export * from './order-id.vo.js';
export * from './product-id.vo.js';
export * from './vendor-id.vo.js';
export * from './payment-id.vo.js';
