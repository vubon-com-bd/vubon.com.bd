/**
 * Shared configuration for authentication module
 * Exports environment validation and configuration utilities
 */

// Export environment schema
export {
  EnvSchema,
  DevEnvSchema,
  ProdEnvSchema,
  TestEnvSchema,
  type Env,
} from './env/env.schema.js';

// Export environment validation utilities
export {
  validateEnv,
  getEnv,
  isDevelopment,
  isProduction,
  isTest,
  getEnvVar,
  reloadEnv,
} from './env/env.validation.js';
