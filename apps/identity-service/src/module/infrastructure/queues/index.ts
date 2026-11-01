/**
 * Queues — Barrel
 * @module identity-service/infrastructure/queues
 */
export * from './queue.constants.js';
export * from './session.queue.js';
export * from './token.queue.js';
export * from './notification.queue.js';
export * from './analytics.queue.js';
export * from './auth.queue.js';

// NEW
export * from './user.queue.js';
export * from './profile.queue.js';
export * from './kyc.queue.js';

// Explicitly re-export to avoid duplicate AnalyticsEventPayload
export type { AnalyticsEventPayload } from './analytics.queue.js';
