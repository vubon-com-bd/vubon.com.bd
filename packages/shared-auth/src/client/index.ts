/**
 * Client - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/index
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure auth client exports only
 */

// ============================================================
// Auth Client
// ============================================================
export * from './auth.client';

// ============================================================
// Token Storage
// ============================================================
export * from './token-storage';

// ============================================================
// Token Refresh Manager
// ============================================================
export * from './token-refresh';

// ============================================================
// Session Manager
// ============================================================
export * from './session-manager';

// ============================================================
// Device Fingerprint Client
// ============================================================
export * from './device-fingerprint.client';

// ============================================================
// MFA Client (Multi-Factor Authentication)
// ============================================================
export * from './mfa.client';

// ============================================================
// Account Lock Client
// ============================================================
export * from './account-lock.client';

// ============================================================
// Verification Client (Email/Phone)
// ============================================================
export * from './verification.client';

// ============================================================
// Social Auth Client
// ============================================================
export * from './social.client';
