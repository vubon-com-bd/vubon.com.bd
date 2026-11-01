// notification-service/infrastructure/persistence/memory/repositories/index.ts
// In-Memory repositories barrel

// ─── Notification aggregate ──────────────
export * from './notification.memory.repository.js';
export * from './notification-content.memory.repository.js';
export * from './notification-recipient.memory.repository.js';
export * from './notification-action.memory.repository.js';
export * from './notification-delivery.memory.repository.js';
export * from './notification-attempt.memory.repository.js';

// ─── Template aggregate ──────────────────
export * from './template.memory.repository.js';
export * from './template-variable.memory.repository.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.memory.repository.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.memory.repository.js';
export * from './broadcast-result.memory.repository.js';

// ─── Digest aggregate ────────────────────
export * from './digest.memory.repository.js';
export * from './digest-item.memory.repository.js';

// ─── Preference aggregate ────────────────
export * from './preference.memory.repository.js';
export * from './preference-matrix.memory.repository.js';

// ─── Device aggregate ────────────────────
export * from './device.memory.repository.js';
export * from './device-token.memory.repository.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.memory.repository.js';
