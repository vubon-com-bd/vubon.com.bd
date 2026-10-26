/**
 * Notification Service — Modules Layer
 * @module notification-service/modules
 *
 * Barrel order:
 *   app.module → common → health → features
 */
export * from './app.module.js';
export * from './common/index.js';
export * from './health/index.js';

// ─── Feature modules ────────────────────────
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
export * from './delivery/index.js';
export * from './provider-gateways/index.js';
