// domain/value-objects/primitives/index.ts — Primitive VOs barrel export

// ═══ Notification Core ═══
export * from './notification-id.vo.js';
export * from './notification-type.vo.js';
export * from './notification-channel.vo.js';
export * from './notification-status.vo.js';
export * from './notification-priority.vo.js';
export * from './notification-category.vo.js';
export * from './notification-title.vo.js';
export * from './notification-body.vo.js';
export * from './notification-data.vo.js';

// ═══ Action ═══
export * from './notification-action.vo.js';
export * from './notification-action-type.vo.js';
export * from './action-url.vo.js';

// ═══ Delivery ═══
export * from './delivery-status.vo.js';
export * from './delivery-failure-reason.vo.js';
export * from './read-status.vo.js';

// ═══ Template ═══
export * from './template-id.vo.js';
export * from './template-type.vo.js';
export * from './template-status.vo.js';
export * from './template-category.vo.js';
export * from './template-name.vo.js';
export * from './template-locale.vo.js';
export * from './template-variable-name.vo.js';

// ═══ Schedule ═══
export * from './schedule-id.vo.js';
export * from './schedule-type.vo.js';
export * from './schedule-status.vo.js';
export * from './schedule-recurrence.vo.js';

// ═══ Broadcast ═══
export * from './broadcast-id.vo.js';
export * from './broadcast-type.vo.js';
export * from './broadcast-status.vo.js';
export * from './broadcast-target.vo.js';

// ═══ Digest ═══
export * from './digest-id.vo.js';
export * from './digest-frequency.vo.js';
export * from './digest-type.vo.js';
export * from './digest-status.vo.js';

// ═══ Preference ═══
export * from './preference-id.vo.js';
export * from './preference-type.vo.js';
export * from './preference-frequency.vo.js';

// ═══ Device ═══
export * from './device-id.vo.js';
export * from './device-type.vo.js';
export * from './device-status.vo.js';
export * from './device-token.vo.js';

// ═══ Webhook ═══
export * from './webhook-id.vo.js';
export * from './webhook-method.vo.js';
export * from './webhook-status.vo.js';
export * from './webhook-event.vo.js';
export * from './webhook-url.vo.js';
export * from './webhook-secret.vo.js';

// ═══ Cross-Service References ═══
export * from './user-id.vo.js';
export * from './order-id.vo.js';
export * from './product-id.vo.js';
export * from './vendor-id.vo.js';
export * from './payment-id.vo.js';

// ═══ Contact ═══
export * from './email-address.vo.js';
export * from './phone-number.vo.js';

// ═══ Providers ═══
export * from './email-provider.vo.js';
export * from './sms-provider.vo.js';
export * from './push-provider.vo.js';
export * from './push-platform.vo.js';
export * from './in-app-type.vo.js';
