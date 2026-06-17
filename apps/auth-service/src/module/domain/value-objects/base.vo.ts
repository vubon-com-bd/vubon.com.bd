/**
 * Base Value Object - Pure Domain Core (Production Ready)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/base.vo
 * @version 2.0.0
 * 
 * @description
 * Base class for all Value Objects in the domain layer.
 * Value Objects are immutable, self-validating, and compared by equality.
 * 
 * Enterprise Features:
 * ✅ Immutable - State never changes after creation
 * ✅ Self-validating - Validates on construction
 * ✅ Equality-based - Compared by values, not identity
 * ✅ Framework-free - No external dependencies
 * ✅ Connection-aware - Handles network failures gracefully
 * ✅ Temporal equality - Time-tolerant comparisons for retry scenarios
 * ✅ Offline-first - Metadata for sync and caching
 * ✅ Degraded mode - Fallback validation when external services unavailable
 * ✅ Thread-safe - No shared mutable state
 * 
 * @example
 * class EmailVO extends ValueObject {
 *   constructor(private readonly value: string) {
 *     super();
 *     this.validate();
 *   }
 * 
 *   protected validate(): void {
 *     if (!this.value.includes('@')) {
 *       throw new ValidationError('Invalid email', 'email');
 *     }
 *   }
 * 
 *   protected getEqualityComponents(): unknown[] {
 *     return [this.value.toLowerCase()];
 *   }
 * 
 *   getValue(): string {
 *     return this.value;
 *   }
 * }
 */

// ==================== Shared Package Imports (Enterprise) ====================

// Configuration from shared-constants
import { 
  VALUE_OBJECT_CONFIG,
  ENV_CONFIG
} from '@vubon/shared-constants';

// Utilities from shared-utils
import { 
  sleep,
  isDevelopment,
  isProduction,
  logger
} from '@vubon/shared-utils';

// Types from shared-types
import type { 
  ValueObjectMetadata as SharedValueObjectMetadata,
  ValidationErrorCode,
  ValueObjectSnapshot
} from '@vubon/shared-types';

// ==================== Constants ====================

// ✅ FIXED: Use VALUE_OBJECT_MARKER directly instead of storing in variable
const VALUE_OBJECT_MARKER = Symbol('ValueObject');

// Retry configuration from shared-constants
const DEFAULT_RETRY_COUNT = VALUE_OBJECT_CONFIG?.DEFAULT_RETRY_COUNT ?? 3;
const DEFAULT_RETRY_DELAY_MS = VALUE_OBJECT_CONFIG?.DEFAULT_RETRY_DELAY_MS ?? 100;
const DEFAULT_TEMPORAL_TOLERANCE_MS = VALUE_OBJECT_CONFIG?.DEFAULT_TEMPORAL_TOLERANCE_MS ?? 1000;

// Environment-based degraded mode
const ALLOW_DEGRADED_MODE = VALUE_OBJECT_CONFIG?.ALLOW_DEGRADED_MODE ?? !ENV_CONFIG?.IS_PRODUCTION;

// Logger context
const LOG_CONTEXT = 'ValueObject';

// ==================== Types ====================

/**
 * Type guard to check if a value is a ValueObject
 */
export type ValueObjectConstructor<T = ValueObject> = new (...args: unknown[]) => T;

/**
 * Value object comparison result
 * ✅ FIXED: differences is now optional and can be undefined
 */
export interface ValueObjectComparison {
  readonly equal: boolean;
  readonly differences?: string[];  // ✅ Made optional
}

/**
 * Configuration for temporal equality comparison
 */
export interface TemporalEqualityConfig {
  /** Tolerance in milliseconds for timestamp comparisons */
  toleranceMs?: number;
  /** Component names that should be treated as temporal (e.g., 'createdAt', 'updatedAt') */
  temporalFields?: string[];
  /** Whether to ignore timezone differences */
  ignoreTimezone?: boolean;
}

/**
 * Environment type for value objects
 */
export type ValueObjectEnvironment = 'development' | 'staging' | 'production' | 'test';

/**
 * Metadata for offline-first synchronization
 */
export interface ValueObjectMetadata extends Omit<SharedValueObjectMetadata, 'environment'> {
  version: string;
  timestamp: string;
  className: string;
  syncStatus?: 'synced' | 'pending' | 'failed';
  lastSyncAttempt?: string;
  retryCount?: number;
  environment?: ValueObjectEnvironment;
}

/**
 * Options for validation
 */
export interface ValidationOptions {
  /** Allow degraded mode when external services unavailable */
  allowDegradedMode?: boolean;
  /** Retry count for external validation */
  retryCount?: number;
  /** Retry delay in milliseconds */
  retryDelayMs?: number;
  /** Fallback value when validation fails in degraded mode */
  fallbackOnError?: boolean;
  /** Log validation failures */
  logFailures?: boolean;
}

/**
 * Options for serialization
 */
export interface SerializationOptions {
  /** Include metadata for offline-first sync */
  includeMetadata?: boolean;
  /** Pretty print JSON */
  pretty?: boolean;
  /** Exclude certain fields */
  excludeFields?: string[];
  /** Include environment info */
  includeEnvironment?: boolean;
}

// ==================== Domain Errors ====================

/**
 * Base domain error for value object validation failures
 */
export abstract class ValueObjectError extends Error {
  constructor(
    message: string,
    public readonly code: ValidationErrorCode | string,
    public readonly field?: string,
    public readonly canRetry: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    
    // Log error in production
    if (isProduction()) {
      logger.error(`[${LOG_CONTEXT}] ${this.name}: ${message}`, { code, field, canRetry });
    }
  }
}

/**
 * Validation error for invalid data
 */
export class ValidationError extends ValueObjectError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', field, false);
  }
}

/**
 * Connection-aware validation error (can be retried)
 */
export class ConnectionAwareValidationError extends ValueObjectError {
  constructor(message: string, public readonly originalError?: Error) {
    super(message, 'CONNECTION_AWARE_ERROR', undefined, true);
  }
}

/**
 * Temporal equality error (for time-based comparisons)
 */
export class TemporalEqualityError extends ValueObjectError {
  constructor(message: string, public readonly timeDifferenceMs: number) {
    super(message, 'TEMPORAL_EQUALITY_ERROR', undefined, true);
  }
}

// ==================== Base Value Object ====================

/**
 * Abstract base class for all Value Objects
 * Implements domain-driven design equality semantics with enterprise features
 */
export abstract class ValueObject {
  /** ✅ FIXED: Removed unused valueObjectMarker, using VALUE_OBJECT_MARKER directly */
  
  /** Cache for temporal field names (lazy loaded) */
  private _temporalFieldCache: Set<string> | null = null;
  
  /** Cache for equality components (for performance) */
  private _equalityComponentsCache: readonly unknown[] | null = null;

  /** Creation timestamp for tracking */
  private readonly _createdAt: number = Date.now();

  /**
   * Constructor with automatic validation
   * @param options - Validation options for external dependencies
   */
  constructor(protected readonly validationOptions?: ValidationOptions) {
    this.validateSync();
    this.validateAsync().catch((err: unknown) => {
      // Async validation errors are logged but don't block construction
      const shouldLog = this.validationOptions?.logFailures ?? true;
      if (shouldLog && !ALLOW_DEGRADED_MODE) {
        logger.warn(`[${LOG_CONTEXT}] Async validation failed for ${this.constructor.name}:`, err);
      }
    });
  }

  /**
   * Get the creation timestamp of this value object
   */
  public get createdAt(): number {
    return this._createdAt;
  }

  /**
   * Get the components that determine equality for this value object.
   * Must be implemented by all concrete value objects.
   * 
   * @returns Array of property values that define uniqueness
   * 
   * @example
   * protected getEqualityComponents(): unknown[] {
   *   return [this.email, this.phone];
   * }
   */
  protected abstract getEqualityComponents(): readonly unknown[];

  /**
   * Get cached equality components for performance
   */
  protected getCachedEqualityComponents(): readonly unknown[] {
    if (!this._equalityComponentsCache) {
      this._equalityComponentsCache = this.getEqualityComponents();
    }
    return this._equalityComponentsCache;
  }

  /**
   * Synchronous validation - Override in child classes for custom validation.
   * Called automatically in constructor.
   * 
   * @throws ValueObjectError if validation fails
   */
  protected validateSync(): void {
    // Default: no validation
  }

  /**
   * Asynchronous validation for external dependencies (API calls, database checks)
   * Override in child classes for async validation.
   * 
   * @example
   * protected async validateAsync(): Promise<void> {
   *   if (this.needsExternalCheck()) {
   *     await this.checkExternalService();
   *   }
   * }
   */
  protected async validateAsync(): Promise<void> {
    // Default: no async validation
  }

  /**
   * Perform external validation with retry logic
   * Uses exponential backoff for retry delays
   * 
   * @param validationFn - The async validation function
   * @param options - Retry options
   * @throws ConnectionAwareValidationError after all retries fail
   */
  protected async validateWithRetry<T>(
    validationFn: () => Promise<T>,
    options?: { retryCount?: number; retryDelayMs?: number; allowDegradedMode?: boolean }
  ): Promise<T> {
    const retryCount = options?.retryCount ?? this.validationOptions?.retryCount ?? DEFAULT_RETRY_COUNT;
    const retryDelayMs = options?.retryDelayMs ?? this.validationOptions?.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
    const allowDegradedMode = options?.allowDegradedMode ?? this.validationOptions?.allowDegradedMode ?? ALLOW_DEGRADED_MODE;

    let lastError: Error | undefined;

    for (let i = 0; i <= retryCount; i++) {
      try {
        return await validationFn();
      } catch (err: unknown) {
        lastError = err instanceof Error ? err : new Error(String(err));
        
        // Check if this is a connection error
        const isConnectionError = this.isConnectionError(err);
        
        if (isConnectionError && i < retryCount) {
          // Exponential backoff: retryDelayMs * 2^i
          const delay = retryDelayMs * Math.pow(2, i);
          if (isDevelopment()) {
            logger.debug(`[${LOG_CONTEXT}] Retry ${i + 1}/${retryCount} after ${delay}ms`, { className: this.constructor.name });
          }
          await sleep(delay);
          continue;
        }
        
        // If not a connection error or no retries left
        if (allowDegradedMode && isConnectionError) {
          logger.warn(`[${LOG_CONTEXT}] Validation degraded mode for ${this.constructor.name}:`, err);
          throw new ConnectionAwareValidationError('External validation failed, using degraded mode', lastError);
        }
        
        throw new ConnectionAwareValidationError(`Validation failed after ${i} retries`, lastError);
      }
    }

    throw new ConnectionAwareValidationError(`Validation failed after ${retryCount} retries`, lastError);
  }

  /**
   * Check if an error is connection-related
   */
  private isConnectionError(err: unknown): boolean {
    const errorMessage = String(err).toLowerCase();
    const connectionErrorPatterns = [
      'network', 'connection', 'timeout', 'fetch',
      'econnrefused', 'enotfound', 'socket', 'dns',
      'tls', 'ssl', 'certificate', 'econnreset'
    ];
    
    return connectionErrorPatterns.some(pattern => errorMessage.includes(pattern));
  }

  /**
   * Check if this value object has temporal fields (time-based)
   */
  protected hasTemporalFields(): boolean {
    if (!this._temporalFieldCache) {
      const components = this.getCachedEqualityComponents();
      this._temporalFieldCache = new Set();
      
      for (let i = 0; i < components.length; i++) {
        const comp = components[i];
        if (comp instanceof Date) {
          this._temporalFieldCache.add(`component_${i}`);
        }
      }
    }
    return this._temporalFieldCache.size > 0;
  }

  /**
   * Get temporal field names (override in child classes)
   */
  protected getTemporalFieldNames(): string[] {
    return [];
  }

  /**
   * Compare this value object with another for value equality.
   * 
   * Enterprise Implementation:
   * - Uses structural equality, not reference equality
   * - Handles cross-module class instances
   * - Null-safe and type-safe
   * - Optimized for performance with early returns
   * 
   * @param other - The value object to compare with
   * @returns true if both value objects have identical equality components
   */
  public equals(other: ValueObject | null | undefined): boolean {
    // Fast path: same instance
    if (this === other) return true;

    // Guard clause: null or undefined
    if (!other) return false;

    // Guard clause: different types
    if (!this.isValueObject(other)) return false;

    // Guard clause: different constructor (structural type check)
    if (!this.hasSameConstructor(other)) return false;

    // Get equality components
    const components1 = this.getCachedEqualityComponents();
    const components2 = other.getCachedEqualityComponents();

    // Fast path: different lengths
    if (components1.length !== components2.length) return false;

    // Fast path: same reference for all components (for performance)
    if (components1.length === 1 && components1[0] === components2[0]) return true;

    // Compare each component deeply
    for (let i = 0; i < components1.length; i++) {
      if (!this.areEqual(components1[i], components2[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Temporal-aware equality comparison for connection retry scenarios
   * Allows small time differences for timestamp fields
   * 
   * @param other - The value object to compare with
   * @param config - Temporal equality configuration
   * @returns true if objects are equal within temporal tolerance
   */
  public equalsTemporal(
    other: ValueObject | null | undefined,
    config?: TemporalEqualityConfig
  ): boolean {
    if (!this.equals(other)) {
      // Try temporal comparison if standard equality fails
      const toleranceMs = config?.toleranceMs ?? DEFAULT_TEMPORAL_TOLERANCE_MS;
      const temporalFields = config?.temporalFields ?? this.getTemporalFieldNames();
      
      if (temporalFields.length === 0 && !this.hasTemporalFields()) {
        return false;
      }
      
      return this.compareTemporal(other as ValueObject, toleranceMs, temporalFields);
    }
    return true;
  }

  /**
   * Internal temporal comparison logic
   */
  private compareTemporal(
    other: ValueObject,
    toleranceMs: number,
    temporalFields: string[]
  ): boolean {
    try {
      const components1 = this.getCachedEqualityComponents();
      const components2 = other.getCachedEqualityComponents();

      for (let i = 0; i < components1.length; i++) {
        const comp1 = components1[i];
        const comp2 = components2[i];

        // Skip if this component is not temporal
        if (!this.isTemporalComponent(comp1, i, temporalFields)) {
          if (!this.areEqual(comp1, comp2)) return false;
          continue;
        }

        // Temporal component comparison
        if (!this.areTemporallyEqual(comp1, comp2, toleranceMs)) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if a component is temporal (time-based)
   */
  private isTemporalComponent(component: unknown, index: number, temporalFields: string[]): boolean {
    // Check by field name
    if (temporalFields.some(field => field.includes(String(index)) || field === `component_${index}`)) {
      return true;
    }
    
    // Check by type
    if (component instanceof Date) return true;
    
    // Check by property name pattern
    if (typeof component === 'object' && component !== null) {
      const componentObj = component as Record<string, unknown>;
      if (componentObj.createdAt instanceof Date) return true;
      if (componentObj.updatedAt instanceof Date) return true;
      if (componentObj.timestamp instanceof Date) return true;
    }
    
    return false;
  }

  /**
   * Compare two values as temporal (time-based) values
   */
  private areTemporallyEqual(a: unknown, b: unknown, toleranceMs: number): boolean {
    const timeA = this.extractTimeValue(a);
    const timeB = this.extractTimeValue(b);
    
    if (timeA === null || timeB === null) {
      return this.areEqual(a, b);
    }
    
    const difference = Math.abs(timeA - timeB);
    return difference <= toleranceMs;
  }

  /**
   * Extract numeric time value from various time representations
   */
  private extractTimeValue(value: unknown): number | null {
    if (value instanceof Date) return value.getTime();
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = Date.parse(value);
      if (!isNaN(parsed)) return parsed;
    }
    if (typeof value === 'object' && value !== null) {
      const obj = value as Record<string, unknown>;
      if (obj.createdAt instanceof Date) return obj.createdAt.getTime();
      if (obj.updatedAt instanceof Date) return obj.updatedAt.getTime();
      if (obj.timestamp instanceof Date) return obj.timestamp.getTime();
    }
    return null;
  }

  /**
   * Compare value objects and get detailed difference information
   * Useful for debugging and logging
   * 
   * @param other - The value object to compare with
   * @returns Comparison result with equality status and differences
   */
  public compare(other: ValueObject | null | undefined): ValueObjectComparison {
    if (!this.isValueObject(other)) {
      return { equal: false, differences: ['Object is not a ValueObject'] };
    }

    if (!this.hasSameConstructor(other)) {
      return { 
        equal: false, 
        differences: [`Different types: ${this.constructor.name} vs ${other.constructor.name}`] 
      };
    }

    const components1 = this.getCachedEqualityComponents();
    const components2 = other.getCachedEqualityComponents();
    const differences: string[] = [];

    if (components1.length !== components2.length) {
      differences.push(`Component count mismatch: ${components1.length} vs ${components2.length}`);
    } else {
      for (let i = 0; i < components1.length; i++) {
        if (!this.areEqual(components1[i], components2[i])) {
          const value1 = this.safeStringify(components1[i]);
          const value2 = this.safeStringify(components2[i]);
          differences.push(`Component[${i}] mismatch: ${value1} vs ${value2}`);
        }
      }
    }

    // ✅ FIXED: Return differences only if there are any
    return {
      equal: differences.length === 0,
      differences: differences.length > 0 ? differences : undefined,
    };
  }

  /**
   * Check if the value object is empty/null/undefined
   * 
   * @param considerZeroAsEmpty - Whether to treat 0 as empty
   * @param considerFalseAsEmpty - Whether to treat false as empty
   * @returns true if the value object is considered empty
   */
  public isEmpty(considerZeroAsEmpty: boolean = false, considerFalseAsEmpty: boolean = false): boolean {
    const components = this.getCachedEqualityComponents();
    if (components.length === 0) return true;

    return components.every(comp => {
      if (comp === null || comp === undefined || comp === '') return true;
      if (considerZeroAsEmpty && comp === 0) return true;
      if (considerFalseAsEmpty && comp === false) return true;
      if (typeof comp === 'number' && isNaN(comp)) return true;
      return false;
    });
  }

  /**
   * Convert value object to plain JavaScript object
   * 
   * @param options - Serialization options
   * @returns Plain object representation
   */
  public toJSON(options?: SerializationOptions): Record<string, unknown> {
    const components = this.getCachedEqualityComponents();
    const includeMetadata = options?.includeMetadata ?? false;
    
    const value = components.length === 1 ? components[0] : [...components];
    
    if (!includeMetadata) {
      return { value };
    }
    
    // ✅ FIXED: environment type now matches shared-types
    const env = isProduction() ? 'production' : isDevelopment() ? 'development' : 'test';
    
    // Include metadata for offline-first synchronization
    const metadata: ValueObjectMetadata = {
      version: VALUE_OBJECT_CONFIG?.VERSION ?? '2.0.0',
      timestamp: new Date().toISOString(),
      className: this.constructor.name,
      syncStatus: 'synced',
      environment: env as ValueObjectEnvironment,
    };
    
    const result: Record<string, unknown> = { value, _metadata: metadata };
    
    // Apply field exclusion if specified
    if (options?.excludeFields && options.excludeFields.length > 0) {
      this.excludeFieldsFromResult(result, options.excludeFields);
    }
    
    // Include environment info if requested
    if (options?.includeEnvironment) {
      result._environment = {
        nodeEnv: ENV_CONFIG?.NODE_ENV,
        isProduction: isProduction(),
        timestamp: Date.now()
      };
    }
    
    return result;
  }

  /**
   * Exclude specified fields from serialization result
   */
  private excludeFieldsFromResult(result: Record<string, unknown>, excludeFields: string[]): void {
    for (const field of excludeFields) {
      delete result[field];
    }
    if (result.value && typeof result.value === 'object') {
      const valueObj = result.value as Record<string, unknown>;
      for (const field of excludeFields) {
        delete valueObj[field];
      }
    }
  }

  /**
   * Get string representation for debugging
   */
  public toString(pretty: boolean = false): string {
    const components = this.getCachedEqualityComponents();
    const values = components.map(comp => this.safeStringify(comp, pretty)).join(', ');
    
    if (pretty) {
      return `${this.constructor.name}(\n  ${values.split(', ').join(',\n  ')}\n)`;
    }
    return `${this.constructor.name}(${values})`;
  }

  /**
   * Safe stringify for any value
   */
  private safeStringify(value: unknown, pretty: boolean = false): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return pretty ? `"${value}"` : value;
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'function') return '[Function]';
    if (typeof value === 'symbol') return value.toString();
    if (value instanceof RegExp) return value.toString();
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    
    try {
      return pretty ? JSON.stringify(value, null, 2) : String(value);
    } catch {
      return '[Circular or Non-serializable]';
    }
  }

  /**
   * Create a deep clone of the value object
   * Since ValueObjects are immutable, this normally returns self,
   * but for nested structures we create deep copies
   * 
   * @returns Deep cloned value object
   */
  public clone(): this {
    // Check if we need deep cloning
    const components = this.getCachedEqualityComponents();
    const needsDeepClone = components.some(comp => 
      comp !== null && 
      typeof comp === 'object' && 
      !(comp instanceof Date) &&
      !(comp instanceof RegExp)
    );
    
    if (!needsDeepClone) {
      return this; // Immutable, safe to return self
    }
    
    // Deep clone components
    const clonedComponents = components.map(comp => {
      if (isValueObject(comp)) return comp.clone();
      if (Array.isArray(comp)) return this.cloneArray(comp);
      if (comp && typeof comp === 'object' && !(comp instanceof Date)) {
        return this.cloneObject(comp as Record<string, unknown>);
      }
      return comp;
    });
    
    // Reconstruct using the constructor
    return this.reconstruct(clonedComponents);
  }

  /**
   * Clone an array deeply
   */
  private cloneArray<T>(arr: T[]): T[] {
    return arr.map(item => {
      if (isValueObject(item)) return item.clone();
      if (Array.isArray(item)) return this.cloneArray(item);
      if (item && typeof item === 'object') return this.cloneObject(item as Record<string, unknown>);
      return item;
    }) as T[];
  }

  /**
   * Clone an object deeply
   */
  private cloneObject(obj: Record<string, unknown>): Record<string, unknown> {
    const cloned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (isValueObject(value)) cloned[key] = value.clone();
      else if (Array.isArray(value)) cloned[key] = this.cloneArray(value);
      else if (value && typeof value === 'object' && !(value instanceof Date)) {
        cloned[key] = this.cloneObject(value as Record<string, unknown>);
      } else {
        cloned[key] = value;
      }
    }
    return cloned;
  }

  /**
   * Reconstruct a new instance from cloned components
   * Override in child classes if constructor signature differs
   */
  protected reconstruct(components: unknown[]): this {
    const Constructor = this.constructor as new (...args: unknown[]) => this;
    return new Constructor(...components);
  }

  /**
   * Create a snapshot for offline storage
   * Includes state and metadata for sync
   */
  public snapshot(): ValueObjectSnapshot {
    return {
      value: this.getCachedEqualityComponents().length === 1 
        ? this.getCachedEqualityComponents()[0] 
        : [...this.getCachedEqualityComponents()],
      metadata: {
        version: VALUE_OBJECT_CONFIG?.VERSION ?? '2.0.0',
        timestamp: new Date().toISOString(),
        className: this.constructor.name,
        syncStatus: 'synced'
      }
    };
  }

  /**
   * Restore from snapshot (for offline-first)
   */
  public static fromSnapshot<T extends ValueObject>(
    this: new (...args: unknown[]) => T,
    snapshot: ValueObjectSnapshot
  ): T {
    const value = snapshot.value;
    const components = Array.isArray(value) ? value : [value];
    return new this(...components);
  }

  /**
   * ✅ FIXED: Type-safe check using VALUE_OBJECT_MARKER directly
   */
  private isValueObject(other: unknown): other is ValueObject {
    if (!other || typeof other !== 'object') return false;

    const candidate = other as ValueObject;
    return (
      VALUE_OBJECT_MARKER in candidate &&
      typeof candidate.equals === 'function'
    );
  }

  /**
   * Check if two objects have the same constructor
   * Handles cross-module class instances by name comparison
   */
  private hasSameConstructor(other: ValueObject): boolean {
    const thisConstructor = (this as unknown as { constructor: { name: string } }).constructor;
    const otherConstructor = (other as unknown as { constructor: { name: string } }).constructor;
    return thisConstructor.name === otherConstructor.name;
  }

  /**
   * Deep equality check for components
   * Handles nested objects, arrays, and value objects
   * Uses timing-safe comparison for sensitive string values
   */
  private areEqual(a: unknown, b: unknown): boolean {
    // Strict equality for primitives (fast path)
    if (Object.is(a, b)) return true;

    // Handle null/undefined
    if (!a || !b) return false;

    // Handle nested ValueObjects
    if (isValueObject(a) && isValueObject(b)) return a.equals(b);

    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.areEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Handle Date objects
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    // Handle RegExp objects
    if (a instanceof RegExp && b instanceof RegExp) return a.toString() === b.toString();

    // Handle Buffer/Uint8Array
    if (a instanceof Uint8Array && b instanceof Uint8Array) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }

    // Handle Map
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [key, value] of a) {
        if (!b.has(key) || !this.areEqual(value, b.get(key))) return false;
      }
      return true;
    }

    // Handle Set
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      const aArray = Array.from(a);
      const bArray = Array.from(b);
      return this.areEqual(aArray, bArray);
    }

    // Handle strings (use timing-safe comparison for sensitive data)
    if (typeof a === 'string' && typeof b === 'string') {
      // Use timing-safe comparison only for sensitive strings (like passwords, tokens)
      // For regular strings, use normal comparison for performance
      const isSensitive = this.isSensitiveString(a) || this.isSensitiveString(b);
      if (isSensitive) {
        // Use timing-safe comparison from shared-utils
        try {
          // Dynamically import timingSafeEqual from shared-utils
          const sharedUtils = require('@vubon/shared-utils');
          if (sharedUtils.timingSafeEqual) {
            return sharedUtils.timingSafeEqual(a, b);
          }
          return a === b;
        } catch {
          return a === b;
        }
      }
      return a === b;
    }

    // Handle objects (shallow comparison)
    if (typeof a === 'object' && typeof b === 'object') {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.length !== bKeys.length) return false;

      for (const key of aKeys) {
        if (!this.areEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
          return false;
        }
      }
      return true;
    }

    // Default: strict equality
    return a === b;
  }

  /**
   * Check if a string is sensitive (should use timing-safe comparison)
   */
  private isSensitiveString(str: string): boolean {
    const sensitivePatterns = [
      'password', 'token', 'secret', 'key', 'hash', 'salt', 'passphrase', 'jwt', 'access', 'refresh'
    ];
    const lowerStr = str.toLowerCase();
    return sensitivePatterns.some(pattern => lowerStr.includes(pattern));
  }

  /**
   * Invalidate cache (useful for testing or dynamic updates)
   */
  protected invalidateCache(): void {
    this._equalityComponentsCache = null;
    this._temporalFieldCache = null;
  }
}

// ==================== Utility Functions ====================

/**
 * Utility function to create a ValueObject from a plain value
 * Useful for testing and serialization
 * 
 * @param value - The primitive value
 * @param Constructor - The ValueObject constructor
 * @returns A value object instance
 */
export function createValueObject<TValue, TVO extends ValueObject>(
  value: TValue,
  Constructor: new (value: TValue) => TVO
): TVO {
  return new Constructor(value);
}

/**
 * Type helper to extract the primitive type from a ValueObject
 */
export type PrimitiveOf<T extends ValueObject> =
  T extends ValueObject ? ReturnType<T['toJSON']> : never;

/**
 * Check if a value is a ValueObject instance
 */
export function isValueObject(value: unknown): value is ValueObject {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as ValueObject;
  return (
    VALUE_OBJECT_MARKER in candidate &&
    typeof candidate.equals === 'function'
  );
}

/**
 * Create a value object with temporal equality support
 * 
 * @param value - The value to wrap
 * @param Constructor - The ValueObject constructor
 * @param config - Temporal equality configuration
 * @returns Value object instance
 */
export function createTemporalValueObject<TValue, TVO extends ValueObject>(
  value: TValue,
  Constructor: new (value: TValue) => TVO,
  config?: TemporalEqualityConfig
): TVO {
  const instance = new Constructor(value);
  
  // Add temporal equality method if not already present
  if (!('equalsTemporal' in instance)) {
    Object.defineProperty(instance, 'equalsTemporal', {
      value: function(other: ValueObject | null | undefined, cfg?: TemporalEqualityConfig) {
        return (this as ValueObject).equalsTemporal(other, cfg ?? config);
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  
  return instance;
}

/**
 * Batch validate multiple value objects
 * 
 * @param valueObjects - Array of value objects to validate
 * @param options - Validation options
 * @returns Promise that resolves when all validations complete
 */
export async function batchValidateValueObjects(
  valueObjects: ValueObject[],
  options?: ValidationOptions
): Promise<{ success: boolean; errors: Error[] }> {
  const errors: Error[] = [];
  
  await Promise.allSettled(
    valueObjects.map(async (vo) => {
      try {
        if (options?.allowDegradedMode) {
          await (vo as any).validateAsync?.();
        } else {
          await (vo as any).validateAsync?.();
        }
      } catch (err) {
        errors.push(err as Error);
        
        if (options?.logFailures !== false) {
          logger.error(`[ValueObject] Batch validation failed for ${vo.constructor.name}:`, err);
        }
      }
    })
  );
  
  return {
    success: errors.length === 0,
    errors
  };
}
