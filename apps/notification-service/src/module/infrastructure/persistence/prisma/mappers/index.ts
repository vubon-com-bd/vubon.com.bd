// notification-service/infrastructure/persistence/prisma/mappers/index.ts
// Prisma mappers barrel — Domain Entity ↔ Prisma Row

// ─── Notification aggregate ──────────────
export * from './notification.prisma.mapper.js';
export * from './notification-content.prisma.mapper.js';
export * from './notification-recipient.prisma.mapper.js';

// ─── Template aggregate ──────────────────
export * from './template.prisma.mapper.js';

// ─── Schedule aggregate ──────────────────
export * from './schedule.prisma.mapper.js';

// ─── Broadcast aggregate ─────────────────
export * from './broadcast.prisma.mapper.js';
export * from './broadcast-batch.prisma.mapper.js';

// ─── Digest aggregate ────────────────────
export * from './digest.prisma.mapper.js';
export * from './digest-item.prisma.mapper.js';

// ─── Preference aggregate ────────────────
export * from './preference.prisma.mapper.js';

// ─── Device aggregate ────────────────────
export * from './device.prisma.mapper.js';

// ─── Webhook aggregate ───────────────────
export * from './webhook.prisma.mapper.js';
export * from './webhook-delivery.prisma.mapper.js';

// ─── Delivery & events ───────────────────
export * from './delivery-attempt.prisma.mapper.js';
export * from './notification-event.prisma.mapper.js';

// ─── Audit / rate-limit / unsubscribe / bounce ─
export * from './rate-limit.prisma.mapper.js';
export * from './unsubscribe.prisma.mapper.js';
export * from './bounce.prisma.mapper.js';
export * from './action-log.prisma.mapper.js';

// ─── Rules & audit ───────────────────────
export * from './rule.prisma.mapper.js';
export * from './audit-log.prisma.mapper.js';
