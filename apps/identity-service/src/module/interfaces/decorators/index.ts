/**
 * Interfaces Decorators — Barrel
 * @module identity-service/interfaces/decorators
 */
export * from './current-user.decorator.js';
export * from './public.decorator.js';
export * from './roles.decorator.js';
export * from './permissions.decorator.js';
export * from './mfa-required.decorator.js';
export * from './biometric-required.decorator.js';
export * from './verified-required.decorator.js';
export * from './rate-limit.decorator.js';
export * from './idempotency-key.decorator.js';

// NEW
export * from './own-profile.decorator.js';
export * from './verified-user.decorator.js';
export * from './kyc-verified.decorator.js';
