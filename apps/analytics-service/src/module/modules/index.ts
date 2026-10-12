/**
 * Analytics Service — Modules Layer Barrel
 * @module analytics-service/modules
 *
 * All feature modules + common + health.
 */
// ─── Common & Root ─────────────────────────────────
export * from './common/index.js';
export * from './health/index.js';
export * from './app.module.js';

// ─── Feature Modules ───────────────────────────────
export * from './event/index.js';
export * from './metric/index.js';
export * from './kpi/index.js';
export * from './dashboard/index.js';
export * from './widget/index.js';
export * from './report/index.js';
export * from './cohort/index.js';
export * from './funnel/index.js';
export * from './session/index.js';
export * from './traffic-source/index.js';
export * from './attribution/index.js';
export * from './user-analytics/index.js';
export * from './product-analytics/index.js';
export * from './order-analytics/index.js';
export * from './vendor-analytics/index.js';
export * from './financial-analytics/index.js';
export * from './real-time-analytics/index.js';
