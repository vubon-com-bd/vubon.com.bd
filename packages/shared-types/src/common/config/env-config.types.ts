/**
 * Environment Config Types
 * @module shared-types/common/config
 *
 * Values আসে shared-constants/common/environment.constants থেকে।
 */

import type { ENVIRONMENT, ENV_KEY } from '@vubon/shared-constants/common';

export type EnvironmentValue = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];

export type EnvKey = (typeof ENV_KEY)[keyof typeof ENV_KEY];

export interface EnvConfig {
  readonly NODE_ENV: EnvironmentValue;
  readonly PORT: number;
  readonly DATABASE_URL: string;
  readonly REDIS_URL?: string;
  readonly JWT_SECRET: string;
  readonly JWT_EXPIRES_IN: string;
  readonly API_BASE_URL: string;
  readonly LOG_LEVEL?: string;
}

export interface EnvConfigPartial {
  readonly NODE_ENV?: EnvironmentValue;
  readonly PORT?: number;
  readonly DATABASE_URL?: string;
  readonly REDIS_URL?: string;
  readonly JWT_SECRET?: string;
  readonly JWT_EXPIRES_IN?: string;
  readonly API_BASE_URL?: string;
  readonly LOG_LEVEL?: string;
}

export interface EnvironmentInfo {
  readonly value: EnvironmentValue;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;
  readonly isStaging: boolean;
}
