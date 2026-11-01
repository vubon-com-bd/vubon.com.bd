/**
 * Event Stores — Barrel
 * @module identity-service/domain/event-store
 */
export * from './auth.event-store.js';
export * from './session.event-store.js';
export * from './token.event-store.js';
export * from './mfa.event-store.js';
export * from './account-lock.event-store.js';
export * from './device.event-store.js';
export * from './verification.event-store.js';

// NEW
export * from './user.event-store.js';
export * from './user-profile.event-store.js';
export * from './user-preferences.event-store.js';
export * from './user-kyc.event-store.js';
