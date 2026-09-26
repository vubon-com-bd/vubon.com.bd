/**
 * Event Stores — Barrel
 * @module auth-service/domain/event-store
 *
 * These are CONTRACTS only. Implementations live in infrastructure.
 */
export * from './user.event-store';
export * from './auth-session.event-store';
export * from './auth-token.event-store';
export * from './auth-mfa.event-store';
export * from './auth-account-lock.event-store';
export * from './auth-social.event-store';
