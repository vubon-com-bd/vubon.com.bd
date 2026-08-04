/**
 * Shared configuration module entry point
 * Exports all configuration utilities
 */

// Export configuration schemas and utilities will be added here
export const VERSION = '1.0.0';

/**
 * Environment variable configuration
 */
export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  API_URL: string;
}

/**
 * Default configuration
 */
export const defaultConfig: Partial<EnvConfig> = {
  NODE_ENV: 'development',
  PORT: 3000,
  API_URL: 'http://localhost:3000',
};
