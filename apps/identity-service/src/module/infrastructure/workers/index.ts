/**
 * Workers — Barrel
 * @module identity-service/infrastructure/workers
 */
export * from './base.worker.js';
export * from './session-cleanup.worker.js';
export * from './token-cleanup.worker.js';
export * from './account-lock.worker.js';
export * from './login-attempt.worker.js';
export * from './device-sync.worker.js';
export * from './analytics-processor.worker.js';

// NEW
export * from './user-sync.worker.js';
export * from './profile-completion.worker.js';
export * from './kyc-expiry.worker.js';
export * from './activity-cleanup.worker.js';
export * from './notification-dispatcher.worker.js';
