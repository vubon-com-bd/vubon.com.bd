/**
 * Database Configuration
 * Loads database connection settings from environment
 */

import { getEnv } from '@vubon/auth-shared-config';

export interface DatabaseConfig {
  url: string;
  ssl?: boolean;
  poolSize?: number;
  connectionTimeout?: number;
}

export function getDatabaseConfig(): DatabaseConfig {
  const env = getEnv();

  return {
    url: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production',
    poolSize: 10,
    connectionTimeout: 30000,
  };
}
