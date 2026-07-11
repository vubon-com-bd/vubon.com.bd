/**
 * Database Configuration - Enterprise Grade
 * 
 * @module infrastructure/config/database.config
 * 
 * @description
 * Centralized database configuration using shared-config.
 * Provides type-safe database connection settings with environment support.
 * 
 * Enterprise Features:
 * ✅ Environment-aware configuration (dev/staging/prod)
 * ✅ Connection pool optimization
 * ✅ SSL/TLS configuration
 * ✅ Read replica support
 * ✅ Query logging control
 * ✅ Connection retry settings
 * ✅ Health check configuration
 * ✅ Migration settings
 * 
 * @example
 * import { databaseConfig } from './database.config';
 * 
 * const poolSize = databaseConfig.pool.max;
 */

import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

/**
 * Database SSL configuration
 * ✅ FIXED: Using explicit `| undefined` instead of optional `?:` for exactOptionalPropertyTypes
 */
export interface DatabaseSSLConfig {
  /** Enable SSL/TLS connection */
  enabled: boolean;
  /** Reject unauthorized certificates (production: true) */
  rejectUnauthorized: boolean;
  /** CA certificate path */
  ca: string | undefined;
  /** Client certificate path */
  cert: string | undefined;
  /** Client key path */
  key: string | undefined;
}

/**
 * Database connection pool configuration
 */
export interface DatabasePoolConfig {
  /** Minimum connections in pool */
  min: number;
  /** Maximum connections in pool */
  max: number;
  /** Idle timeout in milliseconds */
  idleTimeoutMs: number;
  /** Connection acquire timeout in milliseconds */
  acquireTimeoutMs: number;
  /** Connection creation timeout in milliseconds */
  createTimeoutMs: number | undefined;
}

/**
 * Database retry configuration
 */
export interface DatabaseRetryConfig {
  /** Maximum retry attempts */
  maxRetries: number;
  /** Initial retry delay in milliseconds */
  initialDelayMs: number;
  /** Maximum retry delay in milliseconds */
  maxDelayMs: number;
  /** Backoff multiplier */
  backoffMultiplier: number;
}

/**
 * Database read replica configuration
 */
export interface DatabaseReadReplicaConfig {
  /** Enable read replica */
  enabled: boolean;
  /** Replica URL */
  url: string;
  /** Read weight (0-1) */
  weight: number;
  /** Health check interval in milliseconds */
  healthCheckIntervalMs: number;
}

/**
 * Complete database configuration
 * ✅ FIXED: readReplica is now optional (`?:`)
 */
export interface DatabaseConfig {
  /** Database URL */
  url: string;
  /** Database type */
  type: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb';
  /** Connection pool configuration */
  pool: DatabasePoolConfig;
  /** SSL configuration */
  ssl: DatabaseSSLConfig;
  /** Retry configuration */
  retry: DatabaseRetryConfig;
  /** Read replica configuration */
  readReplica?: DatabaseReadReplicaConfig | undefined;
  /** Query logging */
  logging: {
    /** Enable query logging */
    enabled: boolean;
    /** Log slow queries (in milliseconds) */
    slowQueryThreshold: number;
    /** Log parameters */
    logParameters: boolean;
  };
  /** Migration configuration */
  migration: {
    /** Auto-apply migrations (development only) */
    autoApply: boolean;
    /** Skip migration generation */
    skipGenerate: boolean;
  };
  /** Health check configuration */
  healthCheck: {
    /** Enable health check */
    enabled: boolean;
    /** Check interval in milliseconds */
    intervalMs: number;
    /** Check timeout in milliseconds */
    timeoutMs: number;
  };
  /** Connection timeout in milliseconds */
  connectionTimeoutMs: number;
  /** Idle timeout in milliseconds */
  idleTimeoutMs: number;
}

// ============================================================
// Environment Detection
// ============================================================

const isProduction = env.NODE_ENV === 'production';
const isDevelopment = env.NODE_ENV === 'development';
// ✅ FIXED: Removed unused isTest variable

// ============================================================
// Configuration Builder
// ============================================================

/**
 * Build database configuration from environment
 */
const buildDatabaseConfig = (): DatabaseConfig => {
  // Get DATABASE_URL from environment (already validated by shared-config)
  const url = env.DATABASE_URL;

  if (!url) {
    throw new Error('DATABASE_URL is required but not set in environment');
  }

  // Determine database type from URL
  const type = url.startsWith('postgresql') ? 'postgresql' :
               url.startsWith('mysql') ? 'mysql' :
               url.startsWith('mongodb') ? 'mongodb' :
               url.startsWith('sqlite') ? 'sqlite' : 'postgresql';

  // Pool configuration based on environment
  const pool: DatabasePoolConfig = {
    min: isProduction ? 5 : 2,
    max: isProduction ? 20 : 10,
    idleTimeoutMs: isProduction ? 60000 : 30000,
    acquireTimeoutMs: isProduction ? 30000 : 10000,
    createTimeoutMs: isProduction ? 30000 : 10000,
  };

  // SSL configuration
  // ✅ FIXED: Use process.env.DB_SSL directly (not env.DB_SSL)
  const sslEnabled = isProduction || process.env.DB_SSL === 'true';
  
  const ssl: DatabaseSSLConfig = {
    enabled: sslEnabled,
    rejectUnauthorized: isProduction,
    ca: process.env.DB_SSL_CA || undefined,
    cert: process.env.DB_SSL_CERT || undefined,
    key: process.env.DB_SSL_KEY || undefined,
  };

  // Retry configuration
  const retry: DatabaseRetryConfig = {
    maxRetries: isProduction ? 5 : 3,
    initialDelayMs: isProduction ? 1000 : 500,
    maxDelayMs: isProduction ? 30000 : 10000,
    backoffMultiplier: 2,
  };

  // Read replica configuration (if replica URL is provided)
  // ✅ FIXED: Explicitly check and assign undefined if not present
  let readReplica: DatabaseReadReplicaConfig | undefined;
  const replicaUrl = process.env.DATABASE_REPLICA_URL;
  if (replicaUrl) {
    readReplica = {
      enabled: true,
      url: replicaUrl,
      weight: 0.7,
      healthCheckIntervalMs: 60000,
    };
  } else {
    readReplica = undefined;
  }

  // Logging configuration
  const logging = {
    enabled: isDevelopment || process.env.DB_LOGGING_ENABLED === 'true',
    slowQueryThreshold: parseInt(process.env.DB_SLOW_QUERY_THRESHOLD || '100', 10),
    logParameters: isDevelopment,
  };

  // Migration configuration
  const migration = {
    autoApply: isDevelopment || process.env.DB_AUTO_MIGRATE === 'true',
    skipGenerate: isProduction,
  };

  // Health check configuration
  const healthCheck = {
    enabled: true,
    intervalMs: parseInt(process.env.DB_HEALTH_CHECK_INTERVAL || '30000', 10),
    timeoutMs: parseInt(process.env.DB_HEALTH_CHECK_TIMEOUT || '5000', 10),
  };

  // Timeout configurations
  const connectionTimeoutMs = parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000', 10);
  const idleTimeoutMs = parseInt(process.env.DB_IDLE_TIMEOUT || '60000', 10);

  return {
    url,
    type,
    pool,
    ssl,
    retry,
    readReplica,
    logging,
    migration,
    healthCheck,
    connectionTimeoutMs,
    idleTimeoutMs,
  };
};

// ============================================================
// Export Configuration
// ============================================================

/**
 * Database configuration instance
 */
export const databaseConfig: DatabaseConfig = buildDatabaseConfig();

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get database configuration for a specific environment
 */
export const getDatabaseConfig = (): DatabaseConfig => {
  return databaseConfig;
};

/**
 * Check if database connection is configured for SSL
 */
export const isSSLEnabled = (): boolean => {
  return databaseConfig.ssl.enabled;
};

/**
 * Get connection pool configuration
 */
export const getPoolConfig = (): DatabasePoolConfig => {
  return databaseConfig.pool;
};

/**
 * Get retry configuration
 */
export const getRetryConfig = (): DatabaseRetryConfig => {
  return databaseConfig.retry;
};

/**
 * Check if read replica is enabled
 */
export const isReadReplicaEnabled = (): boolean => {
  return !!databaseConfig.readReplica?.enabled;
};

/**
 * Get read replica URL
 */
export const getReadReplicaUrl = (): string | undefined => {
  return databaseConfig.readReplica?.url;
};

// ============================================================
// Type Exports
// ============================================================

export type { DatabaseConfig as DatabaseConfiguration };
