/**
 * Password Hasher Types - Enterprise Grade Type Definitions
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/common/password-hasher.types
 * 
 * @description
 * Centralized type definitions for password hashing operations.
 * Single source of truth for all hashing-related types.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Multiple hashing algorithms support (bcrypt, argon2, scrypt, pbkdf2)
 * ✅ Type-safe configuration options
 * ✅ Result types with success/failure states
 * ✅ Performance metrics types
 * ✅ Audit trail types
 * ✅ Bangladesh specific - Compliance types
 * 
 * RULES:
 * ✅ ONLY type declarations - NO functions, NO logic
 * ✅ NO side effects
 * ✅ Framework-free, pure types
 */

// ============================================================
// Hashing Algorithm Types
// ============================================================

/**
 * Supported hashing algorithms
 * Enterprise grade with multiple algorithm support
 */
export type HashingAlgorithm = 
  | 'bcrypt'
  | 'argon2id'
  | 'scrypt'
  | 'pbkdf2';

/**
 * Bcrypt specific configuration options
 */
export interface BcryptOptions {
  /** Salt rounds (10-14 recommended) */
  readonly saltRounds: number;
  
  /** Whether to use async mode */
  readonly async?: boolean;
}

/**
 * Argon2id specific configuration options
 */
export interface Argon2idOptions {
  /** Memory cost in KB (minimum: 32768) */
  readonly memoryCost: number;
  
  /** Time cost (iterations, minimum: 2) */
  readonly timeCost: number;
  
  /** Parallelism (threads, minimum: 1) */
  readonly parallelism: number;
  
  /** Salt length in bytes (recommended: 16) */
  readonly saltLength?: number;
  
  /** Hash length in bytes (recommended: 32) */
  readonly hashLength?: number;
}

/**
 * Scrypt specific configuration options
 */
export interface ScryptOptions {
  /** CPU/memory cost (N) */
  readonly n: number;
  
  /** Block size (r) */
  readonly r: number;
  
  /** Parallelization (p) */
  readonly p: number;
  
  /** Salt length in bytes (recommended: 16) */
  readonly saltLength?: number;
  
  /** Hash length in bytes (recommended: 32) */
  readonly hashLength?: number;
}

/**
 * PBKDF2 specific configuration options
 */
export interface Pbkdf2Options {
  /** Iterations (minimum: 100000) */
  readonly iterations: number;
  
  /** Hash function (sha256 or sha512) */
  readonly digest: 'sha256' | 'sha512';
  
  /** Salt length in bytes (recommended: 16) */
  readonly saltLength?: number;
  
  /** Hash length in bytes (32 for sha256, 64 for sha512) */
  readonly hashLength?: number;
}

// ============================================================
// Unified Hasher Configuration
// ============================================================

/**
 * Unified hashing configuration
 * Supports all algorithms with type-safe options
 */
export interface HasherConfig {
  /** Hashing algorithm to use */
  readonly algorithm: HashingAlgorithm;
  
  /** Algorithm-specific options */
  readonly options: BcryptOptions | Argon2idOptions | ScryptOptions | Pbkdf2Options;
  
  /** Whether to use async mode */
  readonly async?: boolean;
  
  /** Salt generation options */
  readonly saltOptions?: SaltOptions;
}

/**
 * Salt generation options
 */
export interface SaltOptions {
  /** Salt length in bytes */
  readonly length: number;
  
  /** Salt encoding format */
  readonly encoding: 'hex' | 'base64' | 'base64url';
  
  /** Whether to use secure random generator */
  readonly useSecureRandom: boolean;
}

// ============================================================
// Result Types
// ============================================================

/**
 * Generic result type for hashing operations
 */
export interface HashResult<T = string> {
  /** Whether the operation was successful */
  readonly success: boolean;
  
  /** Result data (if successful) */
  readonly data?: T;
  
  /** Error message (if failed) */
  readonly error?: string;
  
  /** Error code for programmatic handling */
  readonly errorCode?: HashErrorCode;
  
  /** Performance metrics for the operation */
  readonly metrics?: HashPerformanceMetrics;
  
  /** Audit metadata for the operation */
  readonly audit?: HashAuditMetadata;
}

/**
 * Hash result specific types
 */
export type HashStringResult = HashResult<string>;
export type HashBufferResult = HashResult<Buffer>;
export type HashVerifyResult = HashResult<boolean>;

/**
 * Hash error codes
 */
export type HashErrorCode =
  | 'INVALID_ALGORITHM'
  | 'INVALID_OPTIONS'
  | 'INVALID_SALT'
  | 'INVALID_PASSWORD'
  | 'INVALID_HASH'
  | 'HASHING_FAILED'
  | 'VERIFICATION_FAILED'
  | 'TIMEOUT'
  | 'MEMORY_ERROR'
  | 'UNSUPPORTED_ALGORITHM'
  | 'CONFIGURATION_ERROR'
  | 'FALLBACK_ACTIVATED'
  | 'PERFORMANCE_THRESHOLD_EXCEEDED';

// ============================================================
// Performance Metrics Types
// ============================================================

/**
 * Performance metrics for hashing operations
 */
export interface HashPerformanceMetrics {
  /** Time taken to hash in milliseconds */
  readonly hashTimeMs: number;
  
  /** Time taken to verify in milliseconds */
  readonly verifyTimeMs?: number;
  
  /** Memory used in bytes (for memory-hard algorithms) */
  readonly memoryUsedBytes?: number;
  
  /** CPU time used in milliseconds */
  readonly cpuTimeMs?: number;
  
  /** Number of iterations (for PBKDF2) */
  readonly iterations?: number;
  
  /** Salt rounds (for bcrypt) */
  readonly saltRounds?: number;
  
  /** Memory cost (for argon2id/scrypt) */
  readonly memoryCost?: number;
  
  /** Timestamp of the operation */
  readonly timestamp: Date;
  
  /** Algorithm used */
  readonly algorithm: HashingAlgorithm;
  
  /** Whether the operation met performance thresholds */
  readonly meetsThreshold: boolean;
}

// ============================================================
// Audit Types
// ============================================================

/**
 * Audit metadata for hashing operations
 * For compliance and security monitoring
 */
export interface HashAuditMetadata {
  /** User ID (if available) */
  readonly userId?: string;
  
  /** Correlation ID for tracing */
  readonly correlationId?: string;
  
  /** Request ID for API tracing */
  readonly requestId?: string;
  
  /** IP address (if available) */
  readonly ipAddress?: string;
  
  /** User agent (if available) */
  readonly userAgent?: string;
  
  /** Session ID (if available) */
  readonly sessionId?: string;
  
  /** District (Bangladesh specific) */
  readonly district?: string;
  
  /** Division (Bangladesh specific) */
  readonly division?: string;
  
  /** Timestamp of the operation */
  readonly timestamp: Date;
  
  /** Operation type */
  readonly operation: 'hash' | 'verify' | 'hash_with_salt';
  
  /** Algorithm used */
  readonly algorithm: HashingAlgorithm;
  
  /** Whether the operation was successful */
  readonly success: boolean;
  
  /** Error code (if failed) */
  readonly errorCode?: HashErrorCode;
  
  /** Performance metrics (if available) */
  readonly performance?: HashPerformanceMetrics;
}

// ============================================================
// Compliance Types (Bangladesh Bank)
// ============================================================

/**
 * Bangladesh Bank compliance requirements for password hashing
 */
export interface BBankComplianceRequirements {
  /** Minimum hash time in milliseconds */
  readonly minHashTimeMs: number;
  
  /** Maximum hash time in milliseconds */
  readonly maxHashTimeMs: number;
  
  /** Minimum salt length in bytes */
  readonly minSaltLength: number;
  
  /** Recommended salt length in bytes */
  readonly recommendedSaltLength: number;
  
  /** Minimum password complexity required */
  readonly minPasswordComplexity: 'weak' | 'medium' | 'strong' | 'very_strong';
  
  /** Password expiry days (Bangladesh Bank guideline) */
  readonly passwordExpiryDays: number;
  
  /** Whether hashing is required for audit logs */
  readonly hashAuditLogs: boolean;
  
  /** Whether to log hashing operations for audit */
  readonly logHashingOperations: boolean;
  
  /** Retention period for hash logs (days) */
  readonly hashLogRetentionDays: number;
  
  /** Whether to use FIPS-approved algorithms */
  readonly useFipsApprovedAlgorithms: boolean;
  
  /** Recommended algorithms for BBank compliance */
  readonly recommendedAlgorithms: readonly HashingAlgorithm[];
}

/**
 * Compliance status result
 */
export interface BBankComplianceStatus {
  /** Whether the configuration is compliant */
  readonly isCompliant: boolean;
  
  /** List of compliance issues (if any) */
  readonly issues: string[];
  
  /** Recommendations to achieve compliance */
  readonly recommendations: string[];
  
  /** Last compliance check timestamp */
  readonly lastCheckedAt: Date;
  
  /** Current configuration summary */
  readonly configSummary: {
    readonly algorithm: HashingAlgorithm;
    readonly hashTimeMs: number;
    readonly saltLength: number;
    readonly passwordExpiryDays: number;
  };
}

// ============================================================
// Fallback Types
// ============================================================

/**
 * Fallback configuration for degraded mode
 * Used when primary hashing is unavailable
 */
export interface HashFallbackConfig {
  /** Whether fallback is enabled */
  readonly enabled: boolean;
  
  /** Fallback algorithm to use */
  readonly fallbackAlgorithm: HashingAlgorithm;
  
  /** Fallback salt rounds (for bcrypt) */
  readonly fallbackRounds?: number;
  
  /** Fallback memory cost (for argon2id/scrypt) */
  readonly fallbackMemoryCost?: number;
  
  /** Fallback time cost (for argon2id) */
  readonly fallbackTimeCost?: number;
  
  /** Trigger threshold for fallback (error rate) */
  readonly triggerErrorRate: number;
  
  /** Minimum uptime before fallback triggers (seconds) */
  readonly minUptimeBeforeFallback: number;
  
  /** Whether to log fallback events */
  readonly logFallbackEvents: boolean;
  
  /** Whether to emit fallback events */
  readonly emitFallbackEvents: boolean;
}

/**
 * Fallback status result
 */
export interface HashFallbackStatus {
  /** Whether fallback is currently active */
  readonly isActive: boolean;
  
  /** Current algorithm being used */
  readonly currentAlgorithm: HashingAlgorithm;
  
  /** Primary algorithm configured */
  readonly primaryAlgorithm: HashingAlgorithm;
  
  /** Reason for fallback activation (if active) */
  readonly reason?: string;
  
  /** When fallback was activated (if active) */
  readonly activatedAt?: Date;
  
  /** Error rate that triggered fallback */
  readonly errorRate: number;
}

// ============================================================
// Environment Configuration Types
// ============================================================

/**
 * Environment-specific hashing configuration
 */
export interface HashingEnvironmentConfig {
  /** Hashing algorithm to use in this environment */
  readonly algorithm: HashingAlgorithm;
  
  /** Bcrypt salt rounds (if using bcrypt) */
  readonly bcryptRounds?: number;
  
  /** Argon2id memory cost (if using argon2id) */
  readonly argon2MemoryCost?: number;
  
  /** Argon2id time cost (if using argon2id) */
  readonly argon2TimeCost?: number;
  
  /** Scrypt N parameter (if using scrypt) */
  readonly scryptN?: number;
  
  /** Scrypt r parameter (if using scrypt) */
  readonly scryptR?: number;
  
  /** Scrypt p parameter (if using scrypt) */
  readonly scryptP?: number;
  
  /** PBKDF2 iterations (if using pbkdf2) */
  readonly pbkdf2Iterations?: number;
  
  /** PBKDF2 digest (if using pbkdf2) */
  readonly pbkdf2Digest?: 'sha256' | 'sha512';
  
  /** Salt length in bytes */
  readonly saltLength?: number;
}

/**
 * Environment-specific configuration map
 */
export interface HashingEnvironmentConfigMap {
  readonly development: HashingEnvironmentConfig;
  readonly test: HashingEnvironmentConfig;
  readonly staging: HashingEnvironmentConfig;
  readonly production: HashingEnvironmentConfig;
}

// ============================================================
// Hasher Service Interface Types
// ============================================================

/**
 * Password hasher service interface
 * Defines the contract for hashing operations
 */
export interface IPasswordHasher {
  /**
   * Hash a password
   * @param password - Plain text password
   * @param options - Hashing options (optional)
   * @returns Hash result
   */
  hash(
    password: string,
    options?: Partial<HasherConfig>
  ): Promise<HashStringResult>;
  
  /**
   * Verify a password against a hash
   * @param password - Plain text password
   * @param hash - Stored hash to verify against
   * @param options - Hashing options (optional)
   * @returns Verification result
   */
  verify(
    password: string,
    hash: string,
    options?: Partial<HasherConfig>
  ): Promise<HashVerifyResult>;
  
  /**
   * Generate a salt for hashing
   * @param options - Salt options (optional)
   * @returns Salt string
   */
  generateSalt(options?: Partial<SaltOptions>): Promise<string>;
  
  /**
   * Check if a hash needs rehashing (upgrade)
   * @param hash - Stored hash to check
   * @param currentConfig - Current hashing configuration
   * @returns Whether rehashing is needed
   */
  needsRehash(
    hash: string,
    currentConfig: HasherConfig
  ): Promise<boolean>;
  
  /**
   * Get the current hashing configuration
   * @returns Current hasher configuration
   */
  getConfig(): HasherConfig;
  
  /**
   * Update the hashing configuration
   * @param config - New configuration
   * @returns Updated configuration
   */
  updateConfig(config: Partial<HasherConfig>): Promise<HasherConfig>;
  
  /**
   * Get performance metrics
   * @param reset - Whether to reset metrics after retrieval
   * @returns Performance metrics
   */
  getPerformanceMetrics(reset?: boolean): Promise<HashPerformanceMetrics[]>;
  
  /**
   * Reset performance metrics
   * @returns void
   */
  resetPerformanceMetrics(): Promise<void>;
  
  /**
   * Get compliance status (Bangladesh Bank)
   * @returns Compliance status
   */
  getComplianceStatus(): Promise<BBankComplianceStatus>;
  
  /**
   * Get fallback status
   * @returns Fallback status
   */
  getFallbackStatus(): Promise<HashFallbackStatus>;
  
  /**
   * Health check for hasher service
   * @returns Health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    algorithm: HashingAlgorithm;
    averageHashTimeMs: number;
    averageVerifyTimeMs: number;
    errorRate: number;
    fallbackActive: boolean;
    lastError?: string;
  }>;
}

// ============================================================
// Password Policy Types
// ============================================================

/**
 * Password policy configuration
 * Defines password requirements for the system
 */
export interface PasswordPolicy {
  /** Minimum password length */
  readonly minLength: number;
  
  /** Maximum password length */
  readonly maxLength: number;
  
  /** Require uppercase letters */
  readonly requireUppercase: boolean;
  
  /** Require lowercase letters */
  readonly requireLowercase: boolean;
  
  /** Require numbers */
  readonly requireNumbers: boolean;
  
  /** Require special characters */
  readonly requireSpecial: boolean;
  
  /** Allowed special characters */
  readonly specialChars: string;
  
  /** Disallow common passwords */
  readonly disallowCommon: boolean;
  
  /** Disallow user info in password */
  readonly disallowUserInfo: boolean;
  
  /** Maximum repeated characters */
  readonly maxRepeatedChars: number;
  
  /** Maximum sequential characters */
  readonly maxSequentialChars: number;
  
  /** Password expiry days (0 = never) */
  readonly expiryDays: number;
  
  /** Prevent password reuse count (0 = no limit) */
  readonly preventReuseCount: number;
}

// ============================================================
// Audit Event Types
// ============================================================

/**
 * Hashing audit event types
 * Used for event sourcing and monitoring
 * ✅ FIXED: Error 4033 - 'type' property removed, using string literal union directly
 */
export type HashAuditEventType =
  | 'hash.created'
  | 'hash.verified'
  | 'hash.verification_failed'
  | 'hash.config_updated'
  | 'hash.fallback_activated'
  | 'hash.fallback_deactivated'
  | 'hash.performance_threshold_exceeded'
  | 'hash.error'
  | 'hash.compliance_check';

/**
 * Hashing audit event interface
 */
export interface HashAuditEvent {
  /** Event type */
  readonly type: HashAuditEventType;
  
  /** Event timestamp */
  readonly timestamp: Date;
  
  /** Audit metadata */
  readonly audit: HashAuditMetadata;
  
  /** Additional event data */
  readonly data?: Record<string, unknown>;
  
  /** Correlation ID */
  readonly correlationId?: string;
}

// ============================================================
// Type Exports
// ============================================================

// ✅ FIXED: Error 2484 - Duplicate export removed, single export declaration
export type {
  BcryptOptions as BcryptOptionsType,
  Argon2idOptions as Argon2idOptionsType,
  ScryptOptions as ScryptOptionsType,
  Pbkdf2Options as Pbkdf2OptionsType,
  HasherConfig as HasherConfigType,
  SaltOptions as SaltOptionsType,
  HashResult as HashResultType,
  HashStringResult as HashStringResultType,
  HashBufferResult as HashBufferResultType,
  HashVerifyResult as HashVerifyResultType,
  HashPerformanceMetrics as HashPerformanceMetricsType,
  HashAuditMetadata as HashAuditMetadataType,
  BBankComplianceRequirements as BBankComplianceRequirementsType,
  BBankComplianceStatus as BBankComplianceStatusType,
  HashFallbackConfig as HashFallbackConfigType,
  HashFallbackStatus as HashFallbackStatusType,
  HashingEnvironmentConfig as HashingEnvironmentConfigType,
  HashingEnvironmentConfigMap as HashingEnvironmentConfigMapType,
  IPasswordHasher as IPasswordHasherType,
  PasswordPolicy as PasswordPolicyType,
  HashAuditEvent as HashAuditEventTypes,
  HashAuditEventType as HashAuditEventTypeAlias,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Multiple hashing algorithms support (bcrypt, argon2id, scrypt, pbkdf2)
// 2. ✅ Type-safe configuration options for each algorithm
// 3. ✅ Result types with success/failure states
// 4. ✅ Performance metrics types
// 5. ✅ Audit trail types
// 6. ✅ Bangladesh Bank compliance types
// 7. ✅ Fallback configuration types
// 8. ✅ Environment-specific configuration types
// 9. ✅ Hasher service interface types
// 10. ✅ Password policy types
// 11. ✅ Audit event types
// 
// Bangladesh Specific:
// - Bangladesh Bank compliance types
// - District/Division tracking
// - Compliance status types
// - Password expiry types
// - Audit retention types
// 
// ============================================================
