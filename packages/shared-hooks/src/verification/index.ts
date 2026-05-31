/**
 * Verification Hooks - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/verification/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure verification hooks exports only
 */

// ============================================================
// Email Verification Hooks
// ============================================================
export * from './useEmailVerification';

// ============================================================
// Phone Verification Hooks
// ============================================================
export * from './usePhoneVerification';

// ============================================================
// Password Reset Hooks
// ============================================================
export * from './usePasswordReset';
