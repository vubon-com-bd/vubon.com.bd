/**
 * Cart Service — Infrastructure Layer Barrel
 * @module cart-service/infrastructure
 *
 * Order: config → persistence → queues → workers → external → services → modules
 */

// ─── Config ──────────────────────────────────
export * from './config/index.js';

// ─── Persistence ─────────────────────────────
export * from './persistence/prisma/index.js';
export * from './persistence/cache/index.js';
export * from './persistence/redis/index.js';

// ─── Queues + Workers ────────────────────────
export * from './queues/index.js';
export * from './workers/index.js';

// ─── External Integrations ───────────────────
export * from './external/index.js';

// ─── Services ────────────────────────────────
export * from './services/index.js';

// ─── Modules ─────────────────────────────────
export * from './queues-workers.module.js';
export * from './infrastructure.module.js';
