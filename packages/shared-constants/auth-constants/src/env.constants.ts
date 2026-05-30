/**
 * Environment Configuration - Enterprise Grade
 * @module shared-constants/auth-constants/env.constants
 * 
 * RULES:
 * ✅ ONLY place where process.env is accessed directly
 * ✅ Validation and type safety enforced
 * ✅ Default values for development
 * ✅ No business logic
 */

import { EnvConfig } from './api.constants';

// ============================================================
// Type Definitions
// ============================================================
type NodeEnv = 'development' | 'production' | 'test';

interface RequiredEnvVars {
  NODE_ENV: NodeEnv;
}

interface OptionalEnvVars {
  NEXT_PUBLIC_API_BASE_URL: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_DEBUG: string;
}

// ============================================================
// Validation Functions
// ============================================================
const validateNodeEnv = (value: string | undefined): NodeEnv => {
  if (value === 'development' || value === 'production' || value === 'test') {
    return value;
  }
  console.warn(`⚠️ Invalid NODE_ENV: "${value}", falling back to "development"`);
  return 'development';
};

const validateUrl = (value: string | undefined, defaultValue: string): string => {
  if (!value) return defaultValue;
  try {
    new URL(value);
    return value;
  } catch {
    console.warn(`⚠️ Invalid URL: "${value}", falling back to "${defaultValue}"`);
    return defaultValue;
  }
};

const validateBoolean = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'true';
};

// ============================================================
// Read Environment Variables (ONLY place with process.env)
// ============================================================
const required: RequiredEnvVars = {
  NODE_ENV: validateNodeEnv(process.env.NODE_ENV),
};

const optional: OptionalEnvVars = {
  NEXT_PUBLIC_API_BASE_URL: validateUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    'http://localhost:3000'
  ),
  NEXT_PUBLIC_APP_URL: validateUrl(
    process.env.NEXT_PUBLIC_APP_URL,
    'http://localhost:3001'
  ),
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'vubon.com.bd',
  NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG || 'false',
};

// ============================================================
// Derived Configurations
// ============================================================
const isProduction = required.NODE_ENV === 'production';
const isDevelopment = required.NODE_ENV === 'development';
const isTest = required.NODE_ENV === 'test';
const isDebug = validateBoolean(optional.NEXT_PUBLIC_DEBUG);

// ============================================================
// Export ENV_CONFIG (matches EnvConfig interface from api.constants)
// ============================================================
export const ENV_CONFIG: EnvConfig = {
  NODE_ENV: required.NODE_ENV,
  API_BASE_URL: optional.NEXT_PUBLIC_API_BASE_URL,
  IS_PRODUCTION: isProduction,
  IS_DEVELOPMENT: isDevelopment,
} as const;

// ============================================================
// Extended Config (for app-wide use)
// ============================================================
export const APP_CONFIG = {
  NODE_ENV: required.NODE_ENV,
  APP_URL: optional.NEXT_PUBLIC_APP_URL,
  APP_NAME: optional.NEXT_PUBLIC_APP_NAME,
  IS_PRODUCTION: isProduction,
  IS_DEVELOPMENT: isDevelopment,
  IS_TEST: isTest,
  IS_DEBUG: isDebug,
} as const;

// ============================================================
// Type Exports
// ============================================================
export type AppConfig = typeof APP_CONFIG;

// ============================================================
// Startup Validation (Optional - for production safety)
// ============================================================
if (isProduction && !process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.error('❌ FATAL: NEXT_PUBLIC_API_BASE_URL is required in production');
  // In Next.js, this won't crash the build but will log clearly
}
