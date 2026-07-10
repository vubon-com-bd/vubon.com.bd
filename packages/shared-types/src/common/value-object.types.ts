/**
 * Value Object Types - Enterprise Grade Type Contracts
 * @module shared-types/common/value-object.types
 * 
 * @description
 * Centralized type definitions for all Value Objects across the enterprise.
 * These types ensure consistency across all domain value objects.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Immutable type contracts
 * ✅ Comprehensive metadata support
 * ✅ Snapshot and serialization types
 * ✅ Temporal equality configuration
 * ✅ Validation and error types
 * ✅ Audit trail support
 * ✅ Cache and sync metadata
 * ✅ Environment-aware types
 * ✅ Performance optimization types
 * 
 * @example
 * import type { ValueObjectMetadata, ValueObjectSnapshot } from '@vubon/shared-types';
 */

// ============================================================
// Core Value Object Types
// ============================================================

/**
 * Value Object Comparison Result
 * Used for detailed equality comparison between two value objects
 */
export interface ValueObjectComparison {
  /** Whether the two objects are considered equal */
  readonly equal: boolean;
  /** List of differences if not equal (undefined if equal) */
  readonly differences?: readonly string[];
}

/**
 * Temporal Equality Configuration
 * For time-tolerant comparisons in retry scenarios
 */
export interface TemporalEqualityConfig {
  /** Tolerance in milliseconds for timestamp comparisons */
  toleranceMs?: number;
  /** Component names that should be treated as temporal (e.g., 'createdAt', 'updatedAt') */
  temporalFields?: string[];
  /** Whether to ignore timezone differences */
  ignoreTimezone?: boolean;
}

// ============================================================
// Metadata and Snapshot Types
// ============================================================

/**
 * Value Object Metadata
 * Comprehensive metadata for offline-first synchronization and audit
 */
export interface ValueObjectMetadata {
  /** Version of the value object implementation */
  readonly version: string;
  /** ISO timestamp when this metadata was created */
  readonly timestamp: string;
  /** Name of the class that created this instance */
  readonly className: string;
  /** Synchronization status for offline-first support */
  readonly syncStatus?: 'synced' | 'pending' | 'failed' | 'conflict';
  /** Last sync attempt timestamp */
  readonly lastSyncAttempt?: string;
  /** Number of retry attempts for failed sync */
  readonly retryCount?: number;
  /** Environment where this value object was created */
  readonly environment?: 'development' | 'staging' | 'production' | 'test';
  /** Optional custom metadata for extensibility */
  readonly custom?: Readonly<Record<string, unknown>>;
  /** Audit trail for tracking changes */
  readonly auditTrail?: ReadonlyArray<{
    action: 'create' | 'update' | 'validate' | 'sync';
    timestamp: string;
    actor?: string;
    details?: string;
  }>;
  /** Cache control metadata */
  readonly cache?: {
    /** Whether this value is cached */
    cached: boolean;
    /** Cache TTL in seconds */
    ttlSeconds?: number;
    /** Cache key if applicable */
    cacheKey?: string;
    /** Last cached timestamp */
    cachedAt?: string;
  };
}

/**
 * Value Object Snapshot
 * Complete snapshot of a value object for persistence or transfer
 */
export interface ValueObjectSnapshot {
  /** The actual value data (could be single value or composite) */
  readonly value: unknown;
  /** Metadata for the snapshot */
  readonly metadata: ValueObjectMetadata;
  /** Optional validation state */
  readonly validation?: {
    /** Whether validation passed */
    valid: boolean;
    /** Validation errors if any */
    errors?: readonly string[];
    /** Last validation timestamp */
    validatedAt: string;
  };
}

// ============================================================
// Validation Types
// ============================================================

/**
 * Validation Error Codes
 * Standardized error codes for value object validation
 */
export type ValidationErrorCode = 
  // Core validation errors
  | 'VALIDATION_ERROR'
  | 'INVALID_FORMAT'
  | 'MISSING_REQUIRED_FIELD'
  | 'INVALID_LENGTH'
  | 'INVALID_PATTERN'
  | 'INVALID_TYPE'
  | 'INVALID_RANGE'
  | 'INVALID_ENUM_VALUE'
  
  // Connection-aware errors
  | 'CONNECTION_AWARE_ERROR'
  | 'EXTERNAL_VALIDATION_FAILED'
  | 'SERVICE_UNAVAILABLE'
  | 'TIMEOUT_ERROR'
  | 'RETRY_EXHAUSTED'
  
  // Temporal errors
  | 'TEMPORAL_EQUALITY_ERROR'
  | 'TIMEZONE_MISMATCH'
  | 'DATE_OUT_OF_RANGE'
  | 'TIMESTAMP_INVALID'
  
  // Security and privacy errors
  | 'SENSITIVE_DATA_EXPOSED'
  | 'ENCRYPTION_ERROR'
  | 'DECRYPTION_ERROR'
  | 'HASH_MISMATCH'
  
  // Domain-specific validation errors
  | 'EMAIL_INVALID'
  | 'PHONE_INVALID'
  | 'PASSWORD_WEAK'
  | 'ID_INVALID'
  | 'URL_INVALID'
  | 'IP_INVALID';

/**
 * Validation Result
 * Detailed validation result with error information
 */
export interface ValidationResult {
  /** Whether validation passed */
  readonly isValid: boolean;
  /** List of error messages */
  readonly errors: readonly string[];
  /** Error codes for programmatic handling */
  readonly errorCodes?: readonly ValidationErrorCode[];
  /** Suggestions for fixing validation errors */
  readonly suggestions?: readonly string[];
  /** Additional metadata about validation context */
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ============================================================
// Serialization Types
// ============================================================

/**
 * Serialization Options
 * Configuration for serializing value objects
 */
export interface ValueObjectSerializationOptions {
  /** Include metadata in serialized output */
  includeMetadata?: boolean;
  /** Pretty print JSON output */
  pretty?: boolean;
  /** Fields to exclude from serialization */
  excludeFields?: string[];
  /** Include environment information */
  includeEnvironment?: boolean;
  /** Include validation state */
  includeValidation?: boolean;
  /** Custom serializer for specific fields */
  customSerializers?: Record<string, (value: unknown) => unknown>;
}

/**
 * Deserialization Options
 * Configuration for deserializing value objects
 */
export interface ValueObjectDeserializationOptions {
  /** Validate after deserialization */
  validateAfter?: boolean;
  /** Strict type checking */
  strictTypes?: boolean;
  /** Default values for missing fields */
  defaults?: Record<string, unknown>;
  /** Custom deserializer for specific fields */
  customDeserializers?: Record<string, (value: unknown) => unknown>;
}

// ============================================================
// Performance and Optimization Types
// ============================================================

/**
 * Equality Cache Configuration
 * For optimizing repeated equality comparisons
 */
export interface EqualityCacheConfig {
  /** Enable caching */
  enabled: boolean;
  /** Maximum cache size */
  maxSize?: number;
  /** TTL for cache entries in seconds */
  ttlSeconds?: number;
}

/**
 * Performance Metrics
 * For monitoring value object operations
 */
export interface ValueObjectPerformanceMetrics {
  /** Average time for equality check in milliseconds */
  equalityCheckAvgMs: number;
  /** Average time for validation in milliseconds */
  validationAvgMs: number;
  /** Average time for serialization in milliseconds */
  serializationAvgMs: number;
  /** Number of equality cache hits */
  cacheHits: number;
  /** Number of equality cache misses */
  cacheMisses: number;
}

// ============================================================
// Domain-Specific Value Object Types
// ============================================================

/**
 * Email Value Object Type
 * Standardized email type for consistency
 */
export interface EmailValueObject {
  /** The actual email address value */
  readonly value: string;
  /** Normalized email address (lowercase, trimmed) */
  readonly normalized: string;
  /** Local part (before @) */
  readonly localPart: string;
  /** Domain part (after @) */
  readonly domain: string;
  /** Email provider (gmail, outlook, etc.) */
  readonly provider?: 'google' | 'microsoft' | 'apple' | 'yahoo' | 'protonmail' | 'other';
  /** Whether the email is a disposable address */
  readonly isDisposable: boolean;
  /** Whether the email is from a common provider */
  readonly isCommon: boolean;
  /** Whether the email is from an educational domain */
  readonly isEducational: boolean;
}

/**
 * Phone Value Object Type
 * Standardized phone type with Bangladesh support
 */
export interface PhoneValueObject {
  /** The actual phone number value */
  readonly value: string;
  /** E.164 format */
  readonly e164: string;
  /** National format */
  readonly nationalFormat: string;
  /** Country code */
  readonly countryCode: string;
  /** Whether the phone is from Bangladesh */
  readonly isBangladesh: boolean;
  /** Mobile operator (Bangladesh) */
  readonly operator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  /** Whether the phone supports MFS (bKash/Nagad/Rocket) */
  readonly supportsMFS: boolean;
}

/**
 * Device ID Value Object Type
 * Standardized device ID with platform support
 */
export interface DeviceIdValueObject {
  /** The actual device ID value */
  readonly value: string;
  /** Normalized device ID */
  readonly normalized: string;
  /** Device platform */
  readonly platform: 'web' | 'android' | 'ios' | 'mobile_web' | 'desktop' | 'tablet' | 'unknown';
  /** Whether the device ID is from a retry attempt */
  readonly isFromRetry: boolean;
  /** Retry attempt number if applicable */
  readonly retryAttempt?: number;
  /** Whether the device is persistent (non-ephemeral) */
  readonly isPersistent: boolean;
}

// ============================================================
// Utility Types
// ============================================================

/**
 * Constructor Type
 * For generic value object creation patterns
 */
export type ValueObjectConstructor<T> = new (...args: unknown[]) => T;

/**
 * Predicate Type
 * For type guards and filters
 */
export type ValueObjectPredicate<T> = (value: T) => boolean;

/**
 * Transformer Type
 * For mapping value objects
 */
export type ValueObjectTransformer<T, R> = (value: T) => R;

/**
 * Factory Type
 * For creating value objects
 */
export type ValueObjectFactory<T> = (...args: unknown[]) => T;

// ============================================================
// Error Types
// ============================================================

/**
 * Value Object Error
 * Base error type for all value object errors
 */
export interface ValueObjectError {
  /** Error message */
  message: string;
  /** Error code */
  code: ValidationErrorCode;
  /** Optional field name causing the error */
  field?: string;
  /** Whether the operation can be retried */
  canRetry: boolean;
  /** Additional error context */
  context?: Readonly<Record<string, unknown>>;
  /** Original error if wrapped */
  originalError?: Error;
}

/**
 * Value Object Error Factory
 * For creating consistent value object errors
 */
export interface ValueObjectErrorFactory {
  createValidationError(message: string, field?: string): ValueObjectError;
  createConnectionError(message: string, originalError?: Error): ValueObjectError;
  createTemporalError(message: string, timeDifferenceMs: number): ValueObjectError;
  createInvalidFormatError(message: string, field?: string): ValueObjectError;
}


// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// This file provides enterprise-grade type definitions for all
// value objects across the system. Features include:
// 
// 1. ✅ Complete type safety with readonly modifiers
// 2. ✅ Comprehensive metadata and audit support
// 3. ✅ Temporal equality for retry scenarios
// 4. ✅ Validation error codes and handling
// 5. ✅ Serialization/deserialization contracts
// 6. ✅ Performance optimization types
// 7. ✅ Domain-specific value object types
// 8. ✅ Factory and constructor patterns
// 9. ✅ Error handling types
// 10. ✅ Bangladesh-specific types (phone, device)
// 
// ============================================================
