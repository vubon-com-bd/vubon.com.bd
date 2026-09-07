import { ENVIRONMENT } from '@vubon/shared-constants';
import { LOG_LEVEL } from '@vubon/shared-constants';

export interface AppConfig {
  env: keyof typeof ENVIRONMENT;
  logLevel: keyof typeof LOG_LEVEL;
  apiUrl: string;
  apiTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export type ConfigKey = keyof AppConfig;
