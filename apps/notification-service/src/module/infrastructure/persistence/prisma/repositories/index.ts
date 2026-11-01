// notification-service/infrastructure/persistence/prisma/repositories/index.ts
// Prisma repositories barrel

// ─── Notification aggregate ──────────────
export * from './notification.prisma.repository.js';
export * from './notification-content.prisma.repository.js';
export * from './notification-recipient.prisma.repository.js';

// ─── Template aggregate ──────────────────
export * from './template.prisma.repository.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.prisma.repository.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.prisma.repository.js';
export * from './broadcast-batch.prisma.repository.js';

// ─── Digest aggregate ────────────────────
export * from './digest.prisma.repository.js';
export * from './digest-item.prisma.repository.js';

// ─── Preference aggregate ────────────────
export * from './preference.prisma.repository.js';

// ─── Device aggregate ────────────────────
export * from './device.prisma.repository.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.prisma.repository.js';
export * from './webhook-delivery.prisma.repository.js';

// ─── Delivery & attempts ─────────────────
export * from './delivery-attempt.prisma.repository.js';
export * from './notification-event.prisma.repository.js';

// ─── Infrastructure-only audit/logs ──────
export * from './rate-limit.prisma.repository.js';
export * from './unsubscribe.prisma.repository.js';
export * from './bounce.prisma.repository.js';
export * from './action-log.prisma.repository.js';
export * from './rule.prisma.repository.js';
export * from './audit-log.prisma.repository.js';
