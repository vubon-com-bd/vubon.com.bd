/**
 * Cache Repositories — Barrel
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
export * from './auth.cache.repository.js';
export * from './session.cache.repository.js';
export * from './token.cache.repository.js';
export * from './mfa.cache.repository.js';
export * from './account-lock.cache.repository.js';
export * from './idempotency.cache.repository.js';

// NEW
export * from './user.cache.repository.js';
export * from './user-profile.cache.repository.js';
export * from './user-preferences.cache.repository.js';
export * from './user-kyc.cache.repository.js';
