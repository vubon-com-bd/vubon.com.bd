/**
 * Interfaces Guards — Barrel
 * @module identity-service/interfaces/guards
 */
export * from './jwt-auth.guard.js';
export * from './mfa.guard.js';
export * from './biometric.guard.js';
export * from './verified.guard.js';
export * from './device.guard.js';
export * from './account-lock.guard.js';

// NEW
export * from './own-profile.guard.js';
export * from './verified-user.guard.js';
export * from './kyc-verified.guard.js';
