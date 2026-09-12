import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';

/**
 * Environment value type
 */
export type EnvironmentValue = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

/**
 * Log level value type
 */
export type LogLevelValue = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

/**
 * Application configuration interface
 */
export interface AppConfig {
  env: EnvironmentValue;
  logLevel: LogLevelValue;
  apiUrl: string;
  apiTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}

/**
 * Configuration key type
 */
export type ConfigKey = keyof AppConfig;
