import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';

/**
 * Application configuration interface
 */
export interface AppConfig {
  env: keyof typeof ENVIRONMENT;
  logLevel: keyof typeof LOG_LEVEL;
  apiUrl: string;
  apiTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}

/**
 * Configuration key type
 */
export type ConfigKey = keyof AppConfig;
