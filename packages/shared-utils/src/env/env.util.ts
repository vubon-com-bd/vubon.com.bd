/**
 * Environment types
 */
export type Environment = 'development' | 'staging' | 'production' | 'test' | 'local';

/**
 * Environment detection result
 */
export interface EnvironmentInfo {
  /** Current environment */
  env: Environment;
  /** Whether this is a production environment */
  isProduction: boolean;
  /** Whether this is a development environment */
  isDevelopment: boolean;
  /** Whether this is a staging environment */
  isStaging: boolean;
  /** Whether this is a test environment */
  isTest: boolean;
  /** Whether this is a local environment */
  isLocal: boolean;
  /** Node environment (NODE_ENV) */
  nodeEnv: string;
  /** Application environment (APP_ENV) */
  appEnv?: string;
  /** Deployment environment (DEPLOY_ENV) */
  deployEnv?: string;
}

/**
 * Feature flag configuration
 */
export interface FeatureFlags {
  [key: string]: boolean | FeatureFlagConfig;
}

/**
 * Feature flag configuration with conditions
 */
export interface FeatureFlagConfig {
  /** Whether the feature is enabled */
  enabled: boolean;
  /** Environments where the feature is enabled */
  environments?: Environment[];
  /** Percentage of users to enable for (0-100) */
  rolloutPercentage?: number;
  /** User IDs to enable for (whitelist) */
  userIds?: string[];
}

/**
 * Gets the current environment from environment variables
 *
 * @returns The detected environment
 *
 * @example
 * const env = getEnvironment();
 * // 'development' | 'staging' | 'production' | 'test' | 'local'
 */
export function getEnvironment(): Environment {
  // Check APP_ENV first (application specific)
  const appEnv = process.env.APP_ENV?.toLowerCase();

  if (appEnv === 'production' || appEnv === 'prod') {
    return 'production';
  }

  if (appEnv === 'staging' || appEnv === 'stage') {
    return 'staging';
  }

  if (appEnv === 'test') {
    return 'test';
  }

  if (appEnv === 'development' || appEnv === 'dev') {
    return 'development';
  }

  if (appEnv === 'local') {
    return 'local';
  }

  // Fallback to NODE_ENV
  const nodeEnv = process.env.NODE_ENV?.toLowerCase();

  if (nodeEnv === 'production') {
    return 'production';
  }

  if (nodeEnv === 'test') {
    return 'test';
  }

  if (nodeEnv === 'development') {
    return 'development';
  }

  // Default to local if no environment is set
  return 'local';
}

/**
 * Gets detailed environment information
 *
 * @returns Environment information object
 *
 * @example
 * const info = getEnvironmentInfo();
 * // { env: 'development', isProduction: false, isDevelopment: true, ... }
 */
export function getEnvironmentInfo(): EnvironmentInfo {
  const env = getEnvironment();

  return {
    env,
    isProduction: env === 'production',
    isDevelopment: env === 'development',
    isStaging: env === 'staging',
    isTest: env === 'test',
    isLocal: env === 'local',
    nodeEnv: process.env.NODE_ENV || 'unknown',
    appEnv: process.env.APP_ENV,
    deployEnv: process.env.DEPLOY_ENV,
  };
}

/**
 * Checks if the current environment is production
 *
 * @returns True if in production environment
 *
 * @example
 * if (isProduction()) {
 *   // Production-specific code
 * }
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Checks if the current environment is development
 *
 * @returns True if in development environment
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

/**
 * Checks if the current environment is staging
 *
 * @returns True if in staging environment
 */
export function isStaging(): boolean {
  return getEnvironment() === 'staging';
}

/**
 * Checks if the current environment is test
 *
 * @returns True if in test environment
 */
export function isTest(): boolean {
  return getEnvironment() === 'test';
}

/**
 * Checks if the current environment is local
 *
 * @returns True if in local environment
 */
export function isLocal(): boolean {
  return getEnvironment() === 'local';
}

/**
 * Gets an environment variable with optional default value
 *
 * @param key - The environment variable name
 * @param defaultValue - Default value if variable is not set (default: '')
 * @returns The environment variable value or default
 *
 * @example
 * const apiUrl = getEnvVar('API_URL', 'http://localhost:3000');
 */
export function getEnvVar(key: string, defaultValue: string = ''): string {
  if (!key || typeof key !== 'string') {
    throw new Error('Environment variable key must be a non-empty string');
  }

  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  return value;
}

/**
 * Gets an environment variable as a boolean
 *
 * @param key - The environment variable name
 * @param defaultValue - Default value if variable is not set (default: false)
 * @returns The environment variable value as boolean
 *
 * @example
 * const debug = getEnvVarBoolean('DEBUG', false);
 */
export function getEnvVarBoolean(key: string, defaultValue: boolean = false): boolean {
  if (!key || typeof key !== 'string') {
    throw new Error('Environment variable key must be a non-empty string');
  }

  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  // Check for truthy values
  const truthyValues = ['true', '1', 'yes', 'on', 'enabled'];
  return truthyValues.includes(value.toLowerCase());
}

/**
 * Gets an environment variable as a number
 *
 * @param key - The environment variable name
 * @param defaultValue - Default value if variable is not set (default: 0)
 * @returns The environment variable value as number
 *
 * @example
 * const port = getEnvVarNumber('PORT', 3000);
 */
export function getEnvVarNumber(key: string, defaultValue: number = 0): number {
  if (!key || typeof key !== 'string') {
    throw new Error('Environment variable key must be a non-empty string');
  }

  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  const num = parseFloat(value);

  if (isNaN(num)) {
    return defaultValue;
  }

  return num;
}

/**
 * Gets an environment variable as an array (split by delimiter)
 *
 * @param key - The environment variable name
 * @param delimiter - The delimiter to split by (default: ',')
 * @param defaultValue - Default value if variable is not set (default: [])
 * @returns The environment variable value as array
 *
 * @example
 * const allowedDomains = getEnvVarArray('ALLOWED_DOMAINS', ',', ['localhost']);
 */
export function getEnvVarArray(
  key: string,
  delimiter: string = ',',
  defaultValue: string[] = []
): string[] {
  if (!key || typeof key !== 'string') {
    throw new Error('Environment variable key must be a non-empty string');
  }

  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  return value
    .split(delimiter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Feature flag configuration store
 */
let featureFlags: FeatureFlags = {};

/**
 * Loads feature flags from environment variables or configuration
 *
 * @param flags - Feature flag configuration object
 *
 * @example
 * loadFeatureFlags({
 *   newDashboard: true,
 *   experimentalFeature: { enabled: true, environments: ['staging', 'development'] }
 * });
 */
export function loadFeatureFlags(flags: FeatureFlags): void {
  if (!flags || typeof flags !== 'object') {
    throw new Error('Feature flags must be a valid object');
  }

  featureFlags = { ...flags };
}

/**
 * Checks if a feature is enabled
 *
 * @param featureName - The feature name to check
 * @param userId - Optional user ID for rollout-based features
 * @returns True if the feature is enabled
 *
 * @example
 * if (isFeatureEnabled('newDashboard')) {
 *   // Show new dashboard
 * }
 */
export function isFeatureEnabled(featureName: string, userId?: string): boolean {
  if (!featureName || typeof featureName !== 'string') {
    throw new Error('Feature name must be a non-empty string');
  }

  const flag = featureFlags[featureName];

  if (flag === undefined) {
    return false;
  }

  // Handle simple boolean flag
  if (typeof flag === 'boolean') {
    return flag;
  }

  // Handle config object
  const config = flag as FeatureFlagConfig;

  // Check if feature is enabled
  if (!config.enabled) {
    return false;
  }

  // Check environment restrictions
  if (config.environments && config.environments.length > 0) {
    const currentEnv = getEnvironment();
    if (!config.environments.includes(currentEnv)) {
      return false;
    }
  }

  // Check user whitelist
  if (config.userIds && config.userIds.length > 0) {
    if (!userId) {
      return false;
    }
    if (!config.userIds.includes(userId)) {
      return false;
    }
  }

  // Check rollout percentage
  if (config.rolloutPercentage !== undefined && config.rolloutPercentage > 0) {
    if (!userId) {
      return false;
    }
    // Use hash of userId to determine if user is in rollout
    const hash = hashString(userId);
    const percentage = (hash % 100) + 1;
    if (percentage > config.rolloutPercentage) {
      return false;
    }
  }

  return true;
}

/**
 * Simple hash function for string
 *
 * @param str - The string to hash
 * @returns A numeric hash
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Gets all feature flags
 *
 * @returns The current feature flags
 */
export function getFeatureFlags(): FeatureFlags {
  return { ...featureFlags };
}

/**
 * Checks if the application is running in a server environment
 *
 * @returns True if running on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Checks if the application is running in a browser environment
 *
 * @returns True if running in the browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Gets the application name from environment variables
 *
 * @param defaultName - Default name if not set
 * @returns The application name
 */
export function getAppName(defaultName: string = 'MyApp'): string {
  return getEnvVar('APP_NAME', defaultName);
}

/**
 * Gets the application version from environment variables
 *
 * @param defaultVersion - Default version if not set
 * @returns The application version
 */
export function getAppVersion(defaultVersion: string = '1.0.0'): string {
  return getEnvVar('APP_VERSION', defaultVersion);
}

/**
 * Gets the API URL from environment variables
 *
 * @param defaultUrl - Default URL if not set
 * @returns The API URL
 */
export function getApiUrl(defaultUrl: string = 'http://localhost:3000'): string {
  return getEnvVar('API_URL', defaultUrl);
}
