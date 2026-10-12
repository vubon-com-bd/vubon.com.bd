/**
 * Analytics Service — Infrastructure Layer Barrel
 * @module analytics-service/infrastructure
 *
 * Infrastructure Layer (Level 3):
 * - Prisma persistence (21 repositories)
 * - Cache repositories (4)
 * - OLAP providers (4)
 * - Queues (8) + Workers (12)
 * - External integrations (storage, email, slack, chart)
 * - External service clients (10)
 * - Internal services (5)
 * - Config (7)
 */
// ─── Persistence — Prisma ─────────────────────────
export * from './persistence/prisma/index.js';

// ─── Persistence — Cache ──────────────────────────
export * from './persistence/cache/index.js';

// ─── Persistence — OLAP ───────────────────────────
export * from './persistence/olap/index.js';

// ─── Queues ───────────────────────────────────────
export * from './queues/index.js';

// ─── Workers ──────────────────────────────────────
export * from './workers/index.js';

// ─── External Integrations ────────────────────────
export * from './external/index.js';

// ─── Services (external + internal) ───────────────
export * from './services/index.js';

// ─── Config ───────────────────────────────────────
export * from './config/index.js';
