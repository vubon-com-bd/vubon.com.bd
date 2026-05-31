/**
 * Shared Hooks - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure React Query hooks exports only
 */

// ============================================================
// Authentication Hooks
// ============================================================
export * from './auth';

// ============================================================
// User Hooks
// ============================================================
export * from './user';

// ============================================================
// Session Hooks
// ============================================================
export * from './session';

// ============================================================
// MFA Hooks
// ============================================================
export * from './mfa';

// ============================================================
// Device Hooks
// ============================================================
export * from './device';

// ============================================================
// Verification Hooks
// ============================================================
export * from './verification';
