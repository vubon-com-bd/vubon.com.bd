// notification-service/application/commands/index.ts
// Commands barrel — CQRS write side

// ─── Notification ─────────────────────────
export * from './notification/index.js';

// ─── Channel-specific ────────────────────
export * from './email/index.js';
export * from './sms/index.js';
export * from './push/index.js';
export * from './in-app/index.js';

// ─── Template ────────────────────────────
export * from './template/index.js';

// ─── Schedule ────────────────────────────
export * from './schedule/index.js';

// ─── Broadcast ───────────────────────────
export * from './broadcast/index.js';

// ─── Digest ──────────────────────────────
export * from './digest/index.js';

// ─── Preference ──────────────────────────
export * from './preference/index.js';

// ─── Device ──────────────────────────────
export * from './device/index.js';

// ─── Webhook ─────────────────────────────
export * from './webhook/index.js';

// ─── Provider webhooks ───────────────────
export * from './provider-webhook/index.js';
