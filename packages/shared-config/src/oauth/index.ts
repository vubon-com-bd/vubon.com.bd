/**
 * OAuth Configuration - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/oauth/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure config exports only
 */

// ============================================================
// OAuth Provider Configurations
// ============================================================
export * from './google.config';
export * from './facebook.config';
export * from './github.config';
export * from './apple.config';
export * from './linkedin.config';
