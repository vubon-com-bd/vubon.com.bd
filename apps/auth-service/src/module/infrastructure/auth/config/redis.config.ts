/**
 * Redis Configuration - Enterprise Grade
 *
 * @module infrastructure/config/redis.config
 *
 * @description
 * Centralized Redis configuration using shared-config.
 * Provides type-safe Redis connection settings with environment support.
 *
 * Enterprise Features:
 * ✅ Environment-aware configuration (dev/staging/prod)
 * ✅ Connection pool optimization
 * ✅ Cluster support (production)
 * ✅ Sentinel support (high availability)
 * ✅ TLS/SSL configuration
 * ✅ Retry strategy with exponential backoff
 * ✅ Circuit breaker for Redis failures
 * ✅ Health check configuration
 * ✅ Key prefix management
 * ✅ TTL optimization per use case
 *
 * @example
 * import { redisConfig } from './redis.config';
 *
 * const client = new Redis(redisConfig);
 */

import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

/**
 * Redis TLS configuration
 * ✅ FIXED: Using explicit `| undefined` instead of optional `?:`
 */
export interface RedisTLSConfig {
  /** Enable TLS/SSL */
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
 * Redis cluster configuration
 */
export interface RedisClusterConfig {
  /** Enable cluster mode */
  enabled: boolean;
  /** Cluster nodes (host:port) */
  nodes: string[];
  /** Maximum redirects */
  maxRedirects: number;
  /** Retry delay on cluster failure */
  retryDelayMs: number;
}

/**
 * Redis sentinel configuration
 * ✅ FIXED: password is now `string | undefined`
 */
export interface RedisSentinelConfig {
  /** Enable sentinel mode */
  enabled: boolean;
  /** Sentinel nodes (host:port) */
  nodes: string[];
  /** Master name */
  masterName: string;
  /** Sentinel password (optional) */
  password: string | undefined;
}

/**
 * Redis retry strategy
 */
export interface RedisRetryStrategy {
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
 * Redis circuit breaker configuration
 */
export interface RedisCircuitBreaker {
  /** Enable circuit breaker */
  enabled: boolean;
  /** Failure threshold count */
  failureThreshold: number;
  /** Reset timeout in milliseconds */
  resetTimeoutMs: number;
  /** Half-open max attempts */
  halfOpenMaxAttempts: number;
}

/**
 * Redis health check configuration
 */
export interface RedisHealthCheck {
  /** Enable health check */
  enabled: boolean;
  /** Check interval in milliseconds */
  intervalMs: number;
  /** Check timeout in milliseconds */
  timeoutMs: number;
  /** Ping command timeout */
  pingTimeoutMs: number;
}

/**
 * Redis pool configuration
 */
export interface RedisPoolConfig {
  /** Minimum connections in pool */
  min: number;
  /** Maximum connections in pool */
  max: number;
  /** Idle timeout in milliseconds */
  idleTimeoutMs: number;
  /** Connection acquire timeout in milliseconds */
  acquireTimeoutMs: number;
}

/**
 * Redis TTL configuration (per use case)
 */
export interface RedisTTLConfig {
  /** Session TTL in seconds */
  session: number;
  /** OTP TTL in seconds */
  otp: number;
  /** MFA session TTL in seconds */
  mfa: number;
  /** User cache TTL in seconds */
  userCache: number;
  /** Rate limit TTL in seconds */
  rateLimit: number;
  /** Blacklist TTL in seconds */
  blacklist: number;
  /** API key cache TTL in seconds */
  apiKeyCache: number;
  /** Permission cache TTL in seconds */
  permissionCache: number;
}

/**
 * Complete Redis configuration
 * ✅ FIXED: password is now `string | undefined`
 */
export interface RedisConfig {
  /** Redis host */
  host: string;
  /** Redis port */
  port: number;
  /** Redis password */
  password: string | undefined;
  /** Redis database index */
  db: number;
  /** Key prefix for all keys */
  keyPrefix: string;
  /** Connection timeout in milliseconds */
  connectionTimeoutMs: number;
  /** Command timeout in milliseconds */
  commandTimeoutMs: number;

  /** TLS configuration */
  tls: RedisTLSConfig;
  /** Cluster configuration */
  cluster: RedisClusterConfig;
  /** Sentinel configuration */
  sentinel: RedisSentinelConfig;
  /** Retry strategy */
  retry: RedisRetryStrategy;
  /** Circuit breaker */
  circuitBreaker: RedisCircuitBreaker;
  /** Health check */
  healthCheck: RedisHealthCheck;
  /** Pool configuration */
  pool: RedisPoolConfig;
  /** TTL configuration */
  ttl: RedisTTLConfig;
}

// ============================================================
// Environment Detection
// ============================================================

const isProduction = env.NODE_ENV === 'production';

// ============================================================
// Configuration Builder
// ============================================================

/**
 * Build Redis configuration from environment
 */
const buildRedisConfig = (): RedisConfig => {
  // Core connection settings
  const host = process.env.REDIS_HOST || 'localhost';
  const port = parseInt(process.env.REDIS_PORT || '6379', 10);
  const password = process.env.REDIS_PASSWORD || undefined;
  const db = parseInt(process.env.REDIS_DB || '0', 10);
  const keyPrefix = process.env.REDIS_KEY_PREFIX || 'auth:';

  // Timeouts
  const connectionTimeoutMs = parseInt(process.env.REDIS_CONNECT_TIMEOUT || '10000', 10);
  const commandTimeoutMs = parseInt(process.env.REDIS_COMMAND_TIMEOUT || '5000', 10);

  // TLS configuration
  const tls: RedisTLSConfig = {
    enabled: process.env.REDIS_TLS === 'true' || isProduction,
    rejectUnauthorized: isProduction,
    ca: process.env.REDIS_TLS_CA || undefined,
    cert: process.env.REDIS_TLS_CERT || undefined,
    key: process.env.REDIS_TLS_KEY || undefined,
  };

  // Cluster configuration
  const cluster: RedisClusterConfig = {
    enabled: process.env.REDIS_CLUSTER_ENABLED === 'true',
    nodes: process.env.REDIS_CLUSTER_NODES?.split(',').map((n) => n.trim()) || [],
    maxRedirects: parseInt(process.env.REDIS_CLUSTER_MAX_REDIRECTS || '3', 10),
    retryDelayMs: parseInt(process.env.REDIS_CLUSTER_RETRY_DELAY_MS || '1000', 10),
  };

  // Sentinel configuration
  const sentinel: RedisSentinelConfig = {
    enabled: process.env.REDIS_SENTINEL_ENABLED === 'true',
    nodes: process.env.REDIS_SENTINEL_NODES?.split(',').map((n) => n.trim()) || [],
    masterName: process.env.REDIS_SENTINEL_MASTER_NAME || 'mymaster',
    password: process.env.REDIS_SENTINEL_PASSWORD || undefined,
  };

  // Retry strategy
  const retry: RedisRetryStrategy = {
    maxRetries: parseInt(process.env.REDIS_MAX_RETRIES || '5', 10),
    initialDelayMs: parseInt(process.env.REDIS_RETRY_INITIAL_DELAY_MS || '100', 10),
    maxDelayMs: parseInt(process.env.REDIS_RETRY_MAX_DELAY_MS || '5000', 10),
    backoffMultiplier: parseInt(process.env.REDIS_RETRY_BACKOFF_MULTIPLIER || '2', 10),
  };

  // Circuit breaker
  const circuitBreaker: RedisCircuitBreaker = {
    enabled: isProduction,
    failureThreshold: parseInt(process.env.REDIS_CIRCUIT_BREAKER_FAILURE_THRESHOLD || '5', 10),
    resetTimeoutMs: parseInt(process.env.REDIS_CIRCUIT_BREAKER_RESET_TIMEOUT_MS || '30000', 10),
    halfOpenMaxAttempts: parseInt(process.env.REDIS_CIRCUIT_BREAKER_HALF_OPEN_MAX_ATTEMPTS || '3', 10),
  };

  // Health check
  const healthCheck: RedisHealthCheck = {
    enabled: true,
    intervalMs: parseInt(process.env.REDIS_HEALTH_CHECK_INTERVAL_MS || '30000', 10),
    timeoutMs: parseInt(process.env.REDIS_HEALTH_CHECK_TIMEOUT_MS || '5000', 10),
    pingTimeoutMs: parseInt(process.env.REDIS_PING_TIMEOUT_MS || '2000', 10),
  };

  // Pool configuration
  const pool: RedisPoolConfig = {
    min: isProduction ? 5 : 2,
    max: isProduction ? 20 : 10,
    idleTimeoutMs: isProduction ? 60000 : 30000,
    acquireTimeoutMs: isProduction ? 30000 : 10000,
  };

  // TTL configuration (from environment or default)
  const ttl: RedisTTLConfig = {
    session: parseInt(process.env.REDIS_SESSION_TTL || '3600', 10),
    otp: parseInt(process.env.REDIS_OTP_TTL || '300', 10),
    mfa: parseInt(process.env.REDIS_MFA_SESSION_TTL || '300', 10),
    userCache: parseInt(process.env.REDIS_USER_CACHE_TTL || '600', 10),
    rateLimit: parseInt(process.env.REDIS_RATE_LIMIT_TTL || '60', 10),
    blacklist: parseInt(process.env.REDIS_BLACKLIST_TTL || '86400', 10),
    apiKeyCache: parseInt(process.env.REDIS_API_KEY_CACHE_TTL || '300', 10),
    permissionCache: parseInt(process.env.REDIS_PERMISSION_CACHE_TTL || '600', 10),
  };

  return {
    host,
    port,
    password,
    db,
    keyPrefix,
    connectionTimeoutMs,
    commandTimeoutMs,
    tls,
    cluster,
    sentinel,
    retry,
    circuitBreaker,
    healthCheck,
    pool,
    ttl,
  };
};

// ============================================================
// Export Configuration
// ============================================================

/**
 * Redis configuration instance
 */
export const redisConfig: RedisConfig = buildRedisConfig();

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get Redis configuration for a specific environment
 */
export const getRedisConfig = (): RedisConfig => {
  return redisConfig;
};

/**
 * Get Redis connection string (for Redis clients)
 */
export const getRedisConnectionString = (): string => {
  const { host, port, password, db } = redisConfig;
  const auth = password ? `:${password}@` : '';
  return `redis://${auth}${host}:${port}/${db}`;
};

/**
 * Check if cluster mode is enabled
 */
export const isClusterEnabled = (): boolean => {
  return redisConfig.cluster.enabled;
};

/**
 * Check if sentinel mode is enabled
 */
export const isSentinelEnabled = (): boolean => {
  return redisConfig.sentinel.enabled;
};

/**
 * Check if TLS is enabled
 */
export const isRedisTLSEnabled = (): boolean => {
  return redisConfig.tls.enabled;
};

/**
 * Get TTL for a specific use case
 */
export const getTTL = (type: keyof RedisTTLConfig): number => {
  return redisConfig.ttl[type] || 3600;
};

/**
 * Get Redis connection options for BullMQ
 * ✅ FIXED: password is now properly typed as `string | undefined`
 */
export const getBullMQConfig = (): {
  host: string;
  port: number;
  password: string | undefined;
  db: number;
  keyPrefix: string;
  tls?: Record<string, unknown>;
  sentinel?: { 
    nodes: { host: string; port: number }[]; 
    masterName: string; 
    password: string | undefined; 
  };
} => {
  const config: {
    host: string;
    port: number;
    password: string | undefined;
    db: number;
    keyPrefix: string;
    tls?: Record<string, unknown>;
    sentinel?: { 
      nodes: { host: string; port: number }[]; 
      masterName: string; 
      password: string | undefined; 
    };
  } = {
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
    db: redisConfig.db,
    keyPrefix: redisConfig.keyPrefix,
  };

  if (redisConfig.tls.enabled) {
    config.tls = {
      rejectUnauthorized: redisConfig.tls.rejectUnauthorized,
      ca: redisConfig.tls.ca,
      cert: redisConfig.tls.cert,
      key: redisConfig.tls.key,
    };
  }

  if (redisConfig.sentinel.enabled) {
    // Ensure host is always string type
    const nodes = redisConfig.sentinel.nodes.map((node) => {
      const [host, port] = node.split(':');
      return { 
        host: host || 'localhost',
        port: parseInt(port || '26379', 10) 
      };
    });
    
    config.sentinel = {
      nodes,
      masterName: redisConfig.sentinel.masterName,
      password: redisConfig.sentinel.password,
    };
  }

  return config;
};

// ============================================================
// Type Exports
// ============================================================

export type { RedisConfig as RedisConfiguration };
