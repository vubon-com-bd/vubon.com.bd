/**
 * Domain Events — Barrel
 * @module identity-service/domain/events
 */
export * from './event.helpers.js';
export * from './auth.events.js';
export * from './session.events.js';
export * from './token.events.js';
export * from './mfa.events.js';
export * from './login-attempt.events.js';
export * from './account-lock.events.js';
export * from './device.events.js';
export * from './verification.events.js';
export * from './social.events.js';
export * from './role-permission.events.js';
export * from './user.events.js';
export * from './user-kyc.events.js';
export * from './biometric.events.js';

// NEW
export * from './user-profile.events.js';
export * from './user-settings.events.js';
export * from './user-preferences.events.js';
export * from './user-address.events.js';
export * from './user-contact.events.js';
export * from './user-activity.events.js';
