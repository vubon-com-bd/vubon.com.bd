/**
 * Events Index - Barrel Export
 * 
 * @module application/events
 * 
 * @description
 * Central export point for all domain and application events.
 * NO business logic, NO event dispatching, ONLY re-exports.
 * 
 * Enterprise Rules:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free exports
 */

// ============================================================
// Auth Events
// ============================================================
export * from './user-registered.event';
export * from './user-logged-in.event';
export * from './user-logged-out.event';
export * from './login-failed.event';

// ============================================================
// Password Events
// ============================================================
export * from './password-changed.event';
export * from './password-reset-requested.event';

// ============================================================
// Verification Events
// ============================================================
export * from './email-verified.event';
export * from './phone-verified.event';
export * from './welcome-email.event';
// ============================================================
// MFA Events
// ============================================================
export * from './mfa-enabled.event';
export * from './mfa-disabled.event';
export * from './mfa-verification-failed.event';
export * from './mfa-setup-initiated.event';
// ============================================================
// Session Events
// ============================================================
export * from './session-expired.event';
export * from './session-revoked.event';

// ============================================================
// Account Security Events
// ============================================================
export * from './account-locked.event';
export * from './account-unlocked.event';
export * from './account-deleted.event';

// ============================================================
// token refresh Events
// ============================================================
export * from './token-refreshed.event';
export * from './token-compromised.event';

// ============================================================
// social Account Linked Events
// ============================================================
export * from './social-account-linked.event';

// ============================================================
// email change request Events
// ============================================================
export * from './email-change-requested.event';

// ============================================================
// phone number change request Events
// ============================================================
export * from './phone-change-requested.event';

// ============================================================
// user update Events
// ============================================================
export * from './user-updated.event';
