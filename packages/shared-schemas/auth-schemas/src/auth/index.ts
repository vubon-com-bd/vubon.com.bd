/**
 * Auth Schemas - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth-schemas/auth/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 */

// ============================================================
// User & Authentication Schemas
// ============================================================
export * from './user.schema';
export * from './login.schema';
export * from './register.schema';

// ============================================================
// Security & MFA Schemas
// ============================================================
export * from './mfa.schema';
export * from './verification.schema';
export * from './password-reset.schema';

// ============================================================
// Social Auth Schemas
// ============================================================
export * from './social.schema';
