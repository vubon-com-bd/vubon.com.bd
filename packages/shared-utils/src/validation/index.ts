/**
 * Validation Utilities - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/src/validation/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure utility exports only
 */

// ============================================================
// Email Utilities
// ============================================================
export * from './email.util';

// ============================================================
// Phone Utilities
// ============================================================
export * from './phone.util';

// ============================================================
// Sanitization Utilities
// ============================================================
export * from './sanitize.util';

// ============================================================
// Validator Utilities
// ============================================================
export * from './validator.util';
