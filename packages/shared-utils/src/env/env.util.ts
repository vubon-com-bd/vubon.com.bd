/**
 * Environment Utilities - Enterprise Grade Environment Detection
 * @module shared-utils/env/env.util
 * 
 * @description
 * Enterprise-grade environment detection and management utilities.
 * Provides consistent environment detection across the entire system.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Multiple environment detection (dev, test, staging, prod)
 * ✅ Feature flag support
 * ✅ Environment variable access with fallbacks
 * ✅ Type-safe environment checks
 * ✅ Performance-optimized boolean caching
 * ✅ Cross-package integration
 * 
 * @example
 * // Basic usage
 * if (isProduction()) {
 *   // Production-only code
 * }
 * 
 * // Feature flags
 * if (isFeatureEnabled('new-checkout-flow')) {
 *   // New feature code
 * }
 */

// ============================================================
// Imports
// ============================================================

// No external imports needed - pure Node.js environment

// ============================================================
// Constants
// ============================================================

/**
 * Environment types
 */
export type Environment = 'development' | 'test' | 'staging' | 'production';

/**
 * Environment variable keys
 */
export const ENV_KEYS = {
  NODE_ENV: 'NODE_ENV',
  APP_ENV: 'APP_ENV',
  DEPLOY_ENV: 'DEPLOY_ENV',
  FEATURES: 'FEATURES',
} as const;

/**
 * Default environment values
 */
const DEFAULT_ENV: Environment = 'development';

// ============================================================
// Core Environment Detection
// ============================================================

/**
 * Get current environment name
 * 
 * @returns Current environment name
 * 
 * @example
 * const env = getEnvironment(); // 'production'
 */
export const getEnvironment = (): Environment => {
  const nodeEnv = process.env[ENV_KEYS.NODE_ENV] as string;
  const appEnv = process.env[ENV_KEYS.APP_ENV] as string;
  const deployEnv = process.env[ENV_KEYS.DEPLOY_ENV] as string;
  
  // Priority: DEPLOY_ENV > APP_ENV > NODE_ENV
  const env = deployEnv || appEnv || nodeEnv || DEFAULT_ENV;
  
  // Normalize to known environment values
  const normalizedEnv = env.toLowerCase().trim();
  
  if (normalizedEnv === 'production' || normalizedEnv === 'prod') {
    return 'production';
  }
  if (normalizedEnv === 'staging' || normalizedEnv === 'stage') {
    return 'staging';
  }
  if (normalizedEnv === 'test' || normalizedEnv === 'testing') {
    return 'test';
  }
  if (normalizedEnv === 'development' || normalizedEnv === 'dev') {
    return 'development';
  }
  
  return DEFAULT_ENV;
};

/**
 * Check if running in development environment
 * 
 * @returns True if in development
 * 
 * @example
 * if (isDevelopment()) {
 *   console.log('Running in development mode');
 * }
 */
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development';
};

/**
 * Check if running in production environment
 * 
 * @returns True if in production
 * 
 * @example
 * if (isProduction()) {
 *   // Production-only code
 * }
 */
export const isProduction = (): boolean => {
  return getEnvironment() === 'production';
};

/**
 * Check if running in test environment
 * 
 * @returns True if in test
 * 
 * @example
 * if (isTest()) {
 *   // Test-only code
 * }
 */
export const isTest = (): boolean => {
  return getEnvironment() === 'test';
};

/**
 * Check if running in staging environment
 * 
 * @returns True if in staging
 * 
 * @example
 * if (isStaging()) {
 *   // Staging-only code
 * }
 */
export const isStaging = (): boolean => {
  return getEnvironment() === 'staging';
};

/**
 * Check if running in production or staging (non-development)
 * 
 * @returns True if in production or staging
 * 
 * @example
 * if (isNonDevelopment()) {
 *   // Code that should run in production/staging only
 * }
 */
export const isNonDevelopment = (): boolean => {
  const env = getEnvironment();
  return env === 'production' || env === 'staging';
};

// ============================================================
// Cached Environment Checks (Performance Optimized)
// ============================================================

// Cache environment checks for performance
let _cachedEnvironment: Environment | null = null;
let _cachedIsDevelopment: boolean | null = null;
let _cachedIsProduction: boolean | null = null;
let _cachedIsTest: boolean | null = null;
let _cachedIsStaging: boolean | null = null;
let _cachedIsNonDevelopment: boolean | null = null;

/**
 * Clear cached environment values (for testing)
 * 
 * @example
 * // In tests
 * clearEnvironmentCache();
 * process.env.NODE_ENV = 'test';
 * // Re-run environment checks
 */
export const clearEnvironmentCache = (): void => {
  _cachedEnvironment = null;
  _cachedIsDevelopment = null;
  _cachedIsProduction = null;
  _cachedIsTest = null;
  _cachedIsStaging = null;
  _cachedIsNonDevelopment = null;
};

/**
 * Get cached environment (lazy-loaded)
 */
export const getCachedEnvironment = (): Environment => {
  if (_cachedEnvironment === null) {
    _cachedEnvironment = getEnvironment();
  }
  return _cachedEnvironment;
};

/**
 * Check if running in development (cached)
 */
export const isDevelopmentCached = (): boolean => {
  if (_cachedIsDevelopment === null) {
    _cachedIsDevelopment = getCachedEnvironment() === 'development';
  }
  return _cachedIsDevelopment;
};

/**
 * Check if running in production (cached)
 */
export const isProductionCached = (): boolean => {
  if (_cachedIsProduction === null) {
    _cachedIsProduction = getCachedEnvironment() === 'production';
  }
  return _cachedIsProduction;
};

/**
 * Check if running in test (cached)
 */
export const isTestCached = (): boolean => {
  if (_cachedIsTest === null) {
    _cachedIsTest = getCachedEnvironment() === 'test';
  }
  return _cachedIsTest;
};

/**
 * Check if running in staging (cached)
 */
export const isStagingCached = (): boolean => {
  if (_cachedIsStaging === null) {
    _cachedIsStaging = getCachedEnvironment() === 'staging';
  }
  return _cachedIsStaging;
};

/**
 * Check if running in non-development (cached)
 */
export const isNonDevelopmentCached = (): boolean => {
  if (_cachedIsNonDevelopment === null) {
    const env = getCachedEnvironment();
    _cachedIsNonDevelopment = env === 'production' || env === 'staging';
  }
  return _cachedIsNonDevelopment;
};

// ============================================================
// Environment Variables
// ============================================================

/**
 * Get environment variable with fallback
 * 
 * @param key - Environment variable key
 * @param fallback - Fallback value
 * @returns Environment variable value or fallback
 * 
 * @example
 * const apiUrl = getEnvVar('API_URL', 'http://localhost:3000');
 */
export const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = process.env[key];
  return value !== undefined ? value : fallback;
};

/**
 * Get environment variable as boolean
 * 
 * @param key - Environment variable key
 * @param fallback - Fallback boolean value
 * @returns Parsed boolean value
 * 
 * @example
 * const enableFeature = getEnvVarBoolean('ENABLE_NEW_FEATURE', false);
 */
export const getEnvVarBoolean = (key: string, fallback: boolean = false): boolean => {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true' || value === '1' || value === 'yes';
};

/**
 * Get environment variable as number
 * 
 * @param key - Environment variable key
 * @param fallback - Fallback number value
 * @returns Parsed number value
 * 
 * @example
 * const port = getEnvVarNumber('PORT', 3000);
 */
export const getEnvVarNumber = (key: string, fallback: number = 0): number => {
  const value = process.env[key];
  if (value === undefined) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Get environment variable as array
 * 
 * @param key - Environment variable key
 * @param separator - Separator character (default: ',')
 * @param fallback - Fallback array
 * @returns Parsed array value
 * 
 * @example
 * const origins = getEnvVarArray('CORS_ORIGINS', ',', ['http://localhost:3000']);
 */
export const getEnvVarArray = (key: string, separator: string = ',', fallback: string[] = []): string[] => {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value.split(separator).map(item => item.trim()).filter(item => item.length > 0);
};

// ============================================================
// Feature Flags
// ============================================================

/**
 * Feature flag store
 */
let _featureFlags: Map<string, boolean> | null = null;

/**
 * Load feature flags from environment
 * Format: FEATURES=new-checkout,beta-ui,analytics-v2
 */
const loadFeatureFlags = (): Map<string, boolean> => {
  if (_featureFlags !== null) {
    return _featureFlags;
  }
  
  const features = getEnvVar(ENV_KEYS.FEATURES, '');
  const flags = new Map<string, boolean>();
  
  if (features) {
    const featureList = features.split(',').map(f => f.trim());
    for (const feature of featureList) {
      if (feature.startsWith('!')) {
        flags.set(feature.substring(1), false);
      } else if (feature) {
        flags.set(feature, true);
      }
    }
  }
  
  _featureFlags = flags;
  return _featureFlags;
};

/**
 * Check if a feature flag is enabled
 * 
 * @param feature - Feature name
 * @param defaultEnabled - Default value if not configured
 * @returns True if feature is enabled
 * 
 * @example
 * if (isFeatureEnabled('new-checkout-flow')) {
 *   // Use new checkout flow
 * }
 */
export const isFeatureEnabled = (feature: string, defaultEnabled: boolean = false): boolean => {
  const flags = loadFeatureFlags();
  return flags.has(feature) ? flags.get(feature)! : defaultEnabled;
};

/**
 * Set feature flag (for testing)
 * 
 * @param feature - Feature name
 * @param enabled - Whether enabled
 * 
 * @example
 * // In tests
 * setFeatureFlag('test-feature', true);
 */
export const setFeatureFlag = (feature: string, enabled: boolean): void => {
  const flags = loadFeatureFlags();
  flags.set(feature, enabled);
};

/**
 * Clear feature flags cache (for testing)
 */
export const clearFeatureFlags = (): void => {
  _featureFlags = null;
};

// ============================================================
// Type Exports
// ============================================================

// All functions are exported at the top level
// No additional exports needed

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Multiple environment detection (dev, test, staging, prod)
// 2. ✅ Feature flag support with environment variables
// 3. ✅ Cached environment checks for performance
// 4. ✅ Type-safe environment checks
// 5. ✅ Environment variable access with fallbacks
// 6. ✅ Boolean and number parsing
// 7. ✅ Array parsing for lists (e.g., CORS origins)
// 8. ✅ Cache clearing for testing
// 9. ✅ Cross-package compatibility
// 10. ✅ Performance optimization with caching
// 
// ============================================================
