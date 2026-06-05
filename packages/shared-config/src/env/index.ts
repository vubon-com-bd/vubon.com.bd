/**
 * Environment Configuration - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/env/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure config exports only
 */

// ============================================================
// Environment Schema
// ============================================================
export * from './env.schema';

// ============================================================
// Environment Validation
// ============================================================
export {
  env,
  validateEnv,
  safeValidateEnv,
  isProduction,
  isDevelopment,
  isTest,
  isStaging,
  getEnv,
  isOAuthConfigured,
  getConfiguredOAuthProviders,
  isFeatureEnabled,
  getCorsOrigins,
  isMaintenanceMode,
  isDebugMode,
} from './env.validation';

// ============================================================
// Type Exports (from validation)
// ============================================================
export type { ValidatedEnv } from './env.validation';
