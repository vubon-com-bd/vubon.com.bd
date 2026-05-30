/**
 * Auth Hooks - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/auth/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure auth hooks exports only
 */

// ============================================================
// Authentication Hooks
// ============================================================
export * from './useLogin';
export * from './useRegister';
export * from './useLogout';
export * from './useRefreshToken';

// ============================================================
// Social Auth Hooks
// ============================================================
export * from './useSocialLogin';
export * from './useSocialCallback';
export * from './useLinkSocial';
export * from './useUnlinkSocial';

// ============================================================
// Password Management Hooks
// ============================================================
export * from './useForgotPassword';
export * from './useResetPassword';

// ============================================================
// Verification Hooks
// ============================================================
export * from './useVerifyEmail';
export * from './useResendVerification';
