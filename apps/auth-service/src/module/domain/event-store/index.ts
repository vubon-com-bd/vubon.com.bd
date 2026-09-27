/**
 * Event Stores — Barrel
 * @module auth-service/domain/event-store
 *
 * These are CONTRACTS only. Implementations live in infrastructure.
 */
export * from './user.event-store.js';
export * from './auth-session.event-store.js';
export * from './auth-token.event-store.js';
export * from './auth-mfa.event-store.js';
export * from './auth-account-lock.event-store.js';
export * from './auth-social.event-store.js';
