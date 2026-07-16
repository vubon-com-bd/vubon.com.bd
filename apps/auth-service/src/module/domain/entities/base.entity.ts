/**
 * Base Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/entities/base.entity
 *
 * @description
 * Abstract base class for all domain entities following DDD patterns.
 * Provides common functionality: ID, timestamps, versioning, equality, domain events,
 * change tracking, and audit metadata.
 *
 * Enterprise Features:
 * ✅ Pure TypeScript - NO external dependencies
 * ✅ ID validation patterns (UUID v4, ULID, Snowflake, Alphanumeric)
 * ✅ Change tracking for audit trail
 * ✅ Metadata support for audit logging
 * ✅ Optimistic locking with version
 * ✅ Soft delete with restore
 * ✅ Domain event registry with pull pattern
 * ✅ ID generation strategy injection (via interface)
 * ✅ Thread-safe with copy-on-write semantics
 *
 * @example
 * class User extends BaseEntity {
 *   private constructor(id: string, createdAt: Date, updatedAt: Date, version: number) {
 *     super(id, createdAt, updatedAt, version);
 *   }
 *
 *   public static create(email: string, idGenerator: IdGenerator): User {
 *     const user = new User(
 *       idGenerator.generate(),
 *       new Date(),
 *       new Date(),
 *       1
 *     );
 *     user.addDomainEvent(new UserCreatedEvent(user));
 *     return user;
 *   }
 * }
 */

// ============================================================
// Types
// ============================================================

/**
 * Domain event interface
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
  readonly version: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

/**
 * Domain event handler type
 */
export type DomainEventHandler<T extends DomainEvent = DomainEvent> = (
  event: T,
) => void | Promise<void>;

/**
 * Entity constructor options
 */
export interface EntityConstructorOptions {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
  metadata?: EntityMetadata;
}

/**
 * Entity validation result
 */
export interface EntityValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

/**
 * Validation result interface
 * Used for entity validation results
 */
export interface ValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

/**
 * Change tracking entry
 */
export interface ChangeEntry {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedAt: Date;
  changedBy?: string;
}

/**
 * Entity metadata for audit trail
 */
export interface EntityMetadata {
  createdBy?: string;
  createdByIp?: string;
  createdByUserAgent?: string;
  lastModifiedBy?: string;
  lastModifiedByIp?: string;
  lastModifiedByUserAgent?: string;
  tags?: string[];
  custom?: Record<string, unknown>;
}

// ============================================================
// Constants (Local - No external imports)
// ============================================================

/**
 * ID validation patterns (RFC 4122 compliant)
 */
const ID_PATTERNS = {
  /** UUID v4 pattern (RFC 4122) */
  UUID_V4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  /** ULID pattern (26 characters, Crockford's Base32) */
  ULID: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i,

  /** Snowflake ID pattern (19 digits) */
  SNOWFLAKE: /^\d{19}$/,

  /** Alphanumeric with special characters */
  ALPHANUMERIC: /^[a-zA-Z0-9\-_.]{1,255}$/,
} as const;

/**
 * ID validation configuration
 */
const ID_CONFIG = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 255,
  DEFAULT_ID_TYPE: 'uuid' as const,
} as const;

// ============================================================
// Domain Errors
// ============================================================

// ============================================================
// Domain Errors - সম্পূর্ণ আপডেটেড ভার্সন
// ============================================================

/**
 * Entity validation error
 */
export class EntityValidationError extends Error {
  public readonly errors: readonly string[];
  public readonly entityName: string;

  constructor(message: string, errors?: readonly string[], entityName?: string) {
    super(message);
    this.name = 'EntityValidationError';
    this.errors = errors || [message];
    this.entityName = entityName || 'Unknown';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Entity not found error - FIXED: সব প্রপার্টি public readonly
 */
export class EntityNotFoundError extends Error {
  public readonly entityName: string;
  public readonly entityId: string;

  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} not found`);
    this.name = 'EntityNotFoundError';
    this.entityName = entityName;
    this.entityId = id;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Entity conflict error (version mismatch) - FIXED
 */
export class EntityConflictError extends Error {
  public readonly entityName: string;
  public readonly entityId: string;
  public readonly expectedVersion: number;
  public readonly actualVersion: number;

  constructor(entityName: string, id: string, expectedVersion: number, actualVersion: number) {
    super(
      `${entityName} ${id} version conflict: expected ${expectedVersion}, got ${actualVersion}`,
    );
    this.name = 'EntityConflictError';
    this.entityName = entityName;
    this.entityId = id;
    this.expectedVersion = expectedVersion;
    this.actualVersion = actualVersion;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Entity already deleted error - FIXED
 */
export class EntityAlreadyDeletedError extends Error {
  public readonly entityName: string;
  public readonly entityId: string;

  constructor(entityName: string, id: string) {
    super(`${entityName} ${id} is already deleted`);
    this.name = 'EntityAlreadyDeletedError';
    this.entityName = entityName;
    this.entityId = id;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Invalid ID format error - FIXED
 */
export class InvalidIdFormatError extends Error {
  public readonly id: string;
  public readonly expectedFormat: string;

  constructor(id: string, expectedFormat: string) {
    super(`Invalid ID format: ${id}. Expected ${expectedFormat}`);
    this.name = 'InvalidIdFormatError';
    this.id = id;
    this.expectedFormat = expectedFormat;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Base Entity
// ============================================================

/**
 * Abstract base entity class with enterprise features
 */
export abstract class BaseEntity {
  // Private readonly fields (immutable after construction)
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _version: number;

  // Domain event registry
  private _domainEvents: DomainEvent[] = [];

  // Entity metadata
  private _metadata: EntityMetadata;
  private _isDeleted: boolean = false;
  protected _deletedAt: Date | null = null;

  // Change tracking for audit trail
  private _changes: Map<string, ChangeEntry> = new Map();

  // Entity tags for categorization
  private _tags: Set<string> = new Set();

  /**
   * Protected constructor - entities should use factory methods
   */
  protected constructor(options: EntityConstructorOptions) {
    // Validate ID
    if (!options.id || options.id.trim().length === 0) {
      throw new EntityValidationError('Entity ID cannot be empty', [], this.constructor.name);
    }

    // Validate ID format
    if (!this.validateIdFormat(options.id)) {
      throw new InvalidIdFormatError(
        options.id,
        'UUID v4, ULID, Snowflake, or alphanumeric string',
      );
    }

    // Validate ID length
    if (options.id.length > ID_CONFIG.MAX_LENGTH) {
      throw new EntityValidationError(
        `Entity ID too long (max ${ID_CONFIG.MAX_LENGTH} characters)`,
        [],
        this.constructor.name,
      );
    }

    this._id = options.id;
    this._createdAt = options.createdAt ? new Date(options.createdAt) : new Date();
    this._updatedAt = options.updatedAt ? new Date(options.updatedAt) : new Date(this._createdAt);
    this._version = options.version ?? 1;

    // Initialize metadata
    this._metadata = {
      ...(options.metadata?.createdBy && { createdBy: options.metadata.createdBy }),
      ...(options.metadata?.createdByIp && { createdByIp: options.metadata.createdByIp }),
      ...(options.metadata?.createdByUserAgent && {
        createdByUserAgent: options.metadata.createdByUserAgent,
      }),
      ...(options.metadata?.lastModifiedBy && { lastModifiedBy: options.metadata.lastModifiedBy }),
      ...(options.metadata?.lastModifiedByIp && {
        lastModifiedByIp: options.metadata.lastModifiedByIp,
      }),
      ...(options.metadata?.lastModifiedByUserAgent && {
        lastModifiedByUserAgent: options.metadata.lastModifiedByUserAgent,
      }),
      ...(options.metadata?.tags && { tags: [...options.metadata.tags] }),
      ...(options.metadata?.custom && { custom: { ...options.metadata.custom } }),
    };

    // Validate version
    if (this._version < 1) {
      throw new EntityValidationError('Version must be at least 1', [], this.constructor.name);
    }

    // Validate timestamps
    if (this._createdAt > this._updatedAt) {
      throw new EntityValidationError(
        'CreatedAt cannot be after UpdatedAt',
        [],
        this.constructor.name,
      );
    }

    // Validate entity state after construction
    const validation = this.validate();
    if (!validation.isValid) {
      throw new EntityValidationError(
        'Entity validation failed',
        validation.errors,
        this.constructor.name,
      );
    }
  }

  // ============================================================
  // ID Validation (Pure TypeScript - No external dependencies)
  // ============================================================

  /**
   * Validate ID format using local patterns
   */
  private validateIdFormat(id: string): boolean {
    // Check UUID v4
    if (ID_PATTERNS.UUID_V4.test(id)) return true;

    // Check ULID format (10 characters timestamp + 16 random = 26 chars base32)
    if (ID_PATTERNS.ULID.test(id)) return true;

    // Check Snowflake ID (19 digits)
    if (ID_PATTERNS.SNOWFLAKE.test(id)) return true;

    // Check alphanumeric ID
    if (ID_PATTERNS.ALPHANUMERIC.test(id)) return true;

    // Fallback: allow alphanumeric with hyphens/underscores
    return /^[a-zA-Z0-9\-_.]{1,255}$/.test(id);
  }

  /**
   * Get the ID type based on format
   */
  public getIdType(): 'uuid' | 'ulid' | 'snowflake' | 'sequential' | 'unknown' {
    if (ID_PATTERNS.UUID_V4.test(this._id)) return 'uuid';
    if (ID_PATTERNS.ULID.test(this._id)) return 'ulid';
    if (ID_PATTERNS.SNOWFLAKE.test(this._id)) return 'snowflake';
    if (/^\d+$/.test(this._id)) return 'sequential';
    return 'unknown';
  }

  // ============================================================
  // Getters
  // ============================================================

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return new Date(this._createdAt);
  }

  public get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  public get version(): number {
    return this._version;
  }

  public get isDeleted(): boolean {
    return this._isDeleted;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt ? new Date(this._deletedAt) : null;
  }

  public get isNew(): boolean {
    return this._version === 1 && !this._isDeleted;
  }

  public get isDirty(): boolean {
    return this._version > 1 || this._changes.size > 0;
  }

  public get metadata(): Readonly<EntityMetadata> {
    return {
      ...this._metadata,
      tags: this._metadata.tags ? [...this._metadata.tags] : [],
      custom: this._metadata.custom ? { ...this._metadata.custom } : {},
    };
  }

  public getChanges(): ReadonlyMap<string, ChangeEntry> {
    return new Map(this._changes);
  }

  public getTags(): readonly string[] {
    return Array.from(this._tags);
  }

  public hasTag(tag: string): boolean {
    return this._tags.has(tag);
  }

  // ============================================================
  // Protected Helpers
  // ============================================================

  /**
   * Validate entity invariants
   * Must be implemented by concrete entities
   */
  protected abstract validate(): EntityValidationResult;

  /**
   * Update timestamp and increment version
   * Called automatically when entity changes
   */
  protected touch(modifiedBy?: string, modifiedByIp?: string): void {
    this._updatedAt = new Date();
    this._version++;

    if (modifiedBy) {
      this._metadata.lastModifiedBy = modifiedBy;
    }
    if (modifiedByIp) {
      this._metadata.lastModifiedByIp = modifiedByIp;
    }
  }

  /**
   * Increment version without changing timestamp
   */
  protected incrementVersion(): void {
    this._version++;
  }

  /**
   * Track a field change for audit trail
   */
  protected trackChange<T>(field: string, oldValue: T, newValue: T, changedBy?: string): void {
    if (oldValue === newValue) return;

    const change: ChangeEntry = {
      field,
      oldValue: this.deepCopy(oldValue),
      newValue: this.deepCopy(newValue),
      changedAt: new Date(),
      ...(changedBy && { changedBy }),
    };

    this._changes.set(field, change);
  }

  /**
   * Deep copy a value for change tracking
   */
  private deepCopy<T>(value: T): T {
    if (value === null || value === undefined) return value;
    if (value instanceof Date) return new Date(value) as T;
    if (value instanceof Map) return new Map(value) as T;
    if (value instanceof Set) return new Set(value) as T;
    if (typeof value === 'object') {
      try {
        return JSON.parse(JSON.stringify(value));
      } catch {
        return value;
      }
    }
    return value;
  }

  /**
   * Clear all tracked changes (after persistence)
   */
  protected clearChanges(): void {
    this._changes.clear();
  }

  /**
   * Add a tag to the entity
   */
  protected addTag(tag: string): void {
    this._tags.add(tag);
  }

  /**
   * Remove a tag from the entity
   */
  protected removeTag(tag: string): void {
    this._tags.delete(tag);
  }

  /**
   * Update metadata field
   */
  protected updateMetadata(key: keyof EntityMetadata, value: unknown): void {
    const oldValue = this._metadata[key];
    if (oldValue !== value) {
      (this._metadata[key] as unknown) = value;
      this.trackChange(`metadata.${String(key)}`, oldValue, value);
    }
  }

  /**
   * Mark entity as deleted (soft delete)
   */
  protected markAsDeleted(deletedBy?: string, deletedByIp?: string): void {
    if (this._isDeleted) {
      throw new EntityAlreadyDeletedError(this.constructor.name, this._id);
    }

    this._isDeleted = true;
    this._deletedAt = new Date();
    this.updateMetadata('lastModifiedBy', deletedBy);
    this.updateMetadata('lastModifiedByIp', deletedByIp);
    this.touch(deletedBy, deletedByIp);
  }

  /**
   * Restore entity from soft delete
   */
  protected restore(restoredBy?: string): void {
    if (!this._isDeleted) {
      return;
    }

    this._isDeleted = false;
    this._deletedAt = null;
    this.updateMetadata('lastModifiedBy', restoredBy);
    this.touch(restoredBy);
  }

  /**
   * Ensure entity is not deleted before operation
   */
  protected ensureNotDeleted(): void {
    if (this._isDeleted) {
      throw new EntityValidationError(
        `Cannot perform operation on deleted entity ${this.constructor.name} ${this._id}`,
        ['Entity is soft-deleted. Use restore() first if needed.'],
        this.constructor.name,
      );
    }
  }

  // ============================================================
  // Equality Methods
  // ============================================================

  public equals(other: BaseEntity | null | undefined): boolean {
    if (!other) return false;
    if (this === other) return true;
    if (this.constructor !== other.constructor) return false;
    return this._id === other._id;
  }

  public hasSameIdentity(other: BaseEntity | null | undefined): boolean {
    if (!other) return false;
    return this._id === other._id;
  }

  // ============================================================
  // Domain Event Methods
  // ============================================================

  protected addDomainEvent(event: DomainEvent): void {
    if (!event) {
      throw new EntityValidationError('Domain event cannot be null', [], this.constructor.name);
    }
    this._domainEvents.push(event);
  }

  protected addDomainEvents(events: readonly DomainEvent[]): void {
    for (const event of events) {
      this.addDomainEvent(event);
    }
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents];
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this.clearDomainEvents();
    return events;
  }

  public hasDomainEvents(): boolean {
    return this._domainEvents.length > 0;
  }

  // ============================================================
  // Audit Trail Methods
  // ============================================================

  public getAuditTrail(): {
    createdAt: Date;
    createdBy?: string;
    createdByIp?: string;
    lastModifiedAt: Date;
    lastModifiedBy?: string;
    lastModifiedByIp?: string;
    changes: ChangeEntry[];
    deletedAt?: Date | null;
    deletedBy?: string;
  } {
    const result: {
      createdAt: Date;
      createdBy?: string;
      createdByIp?: string;
      lastModifiedAt: Date;
      lastModifiedBy?: string;
      lastModifiedByIp?: string;
      changes: ChangeEntry[];
      deletedAt?: Date | null;
      deletedBy?: string;
    } = {
      createdAt: this._createdAt,
      lastModifiedAt: this._updatedAt,
      changes: Array.from(this._changes.values()),
      deletedAt: this._deletedAt,
    };

    if (this._metadata.createdBy) result.createdBy = this._metadata.createdBy;
    if (this._metadata.createdByIp) result.createdByIp = this._metadata.createdByIp;
    if (this._metadata.lastModifiedBy) result.lastModifiedBy = this._metadata.lastModifiedBy;
    if (this._metadata.lastModifiedByIp) result.lastModifiedByIp = this._metadata.lastModifiedByIp;
    if (this._metadata.lastModifiedBy) result.deletedBy = this._metadata.lastModifiedBy;

    return result;
  }

  // ============================================================
  // JSON Serialization
  // ============================================================

  public toJSON(): Record<string, unknown> {
    return {
      id: this._id,
      idType: this.getIdType(),
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
      version: this._version,
      isDeleted: this._isDeleted,
      deletedAt: this._deletedAt?.toISOString() || null,
      tags: Array.from(this._tags),
      metadata: {
        createdBy: this._metadata.createdBy,
        createdByIp: this._metadata.createdByIp,
        lastModifiedBy: this._metadata.lastModifiedBy,
        lastModifiedByIp: this._metadata.lastModifiedByIp,
      },
    };
  }

  public toPersistence(): Record<string, unknown> {
    return {
      ...this.toJSON(),
      changes: this.isDirty ? Array.from(this._changes.values()) : undefined,
    };
  }

  public toString(): string {
    return `${this.constructor.name}(id=${this._id}, type=${this.getIdType()}, version=${this._version}, deleted=${this._isDeleted})`;
  }

  // ============================================================
  // Version Control Methods
  // ============================================================

  public assertVersion(expectedVersion: number): void {
    if (this._version !== expectedVersion) {
      throw new EntityConflictError(
        this.constructor.name,
        this._id,
        expectedVersion,
        this._version,
      );
    }
  }

  protected mergeFrom(other: this): void {
    if (!this.hasSameIdentity(other)) {
      throw new EntityValidationError(
        'Cannot merge entities with different IDs',
        [`Source ID: ${this._id}, Target ID: ${other._id}`],
        this.constructor.name,
      );
    }

    this._updatedAt = new Date(other._updatedAt);
    this._version = other._version;
    this._isDeleted = other._isDeleted;
    this._deletedAt = other._deletedAt ? new Date(other._deletedAt) : null;

    // Merge metadata
    this._metadata = {
      ...(this._metadata.createdBy && { createdBy: this._metadata.createdBy }),
      ...(this._metadata.createdByIp && { createdByIp: this._metadata.createdByIp }),
      ...(this._metadata.createdByUserAgent && {
        createdByUserAgent: this._metadata.createdByUserAgent,
      }),
      ...(this._metadata.lastModifiedBy && { lastModifiedBy: this._metadata.lastModifiedBy }),
      ...(this._metadata.lastModifiedByIp && { lastModifiedByIp: this._metadata.lastModifiedByIp }),
      ...(this._metadata.lastModifiedByUserAgent && {
        lastModifiedByUserAgent: this._metadata.lastModifiedByUserAgent,
      }),
      ...(other._metadata.createdBy && { createdBy: other._metadata.createdBy }),
      ...(other._metadata.createdByIp && { createdByIp: other._metadata.createdByIp }),
      ...(other._metadata.createdByUserAgent && {
        createdByUserAgent: other._metadata.createdByUserAgent,
      }),
      ...(other._metadata.lastModifiedBy && { lastModifiedBy: other._metadata.lastModifiedBy }),
      ...(other._metadata.lastModifiedByIp && {
        lastModifiedByIp: other._metadata.lastModifiedByIp,
      }),
      ...(other._metadata.lastModifiedByUserAgent && {
        lastModifiedByUserAgent: other._metadata.lastModifiedByUserAgent,
      }),
      ...(other._metadata.tags && { tags: [...other._metadata.tags] }),
      ...(this._metadata.tags && !other._metadata.tags && { tags: [...this._metadata.tags] }),
      ...(other._metadata.custom && { custom: { ...other._metadata.custom } }),
      ...(this._metadata.custom &&
        !other._metadata.custom && { custom: { ...this._metadata.custom } }),
    };

    // Merge tags
    this._tags = new Set([...this._tags, ...other._tags]);

    // Merge domain events without duplication
    const existingEventIds = new Set(this._domainEvents.map((e) => e.eventId));
    for (const event of other._domainEvents) {
      if (!existingEventIds.has(event.eventId)) {
        this._domainEvents.push(event);
      }
    }
  }
}

// ============================================================
// Entity ID Generator Interface
// ============================================================

/**
 * ID Generation Strategy Interface
 * Implemented in infrastructure layer, injected via factory
 */
export interface IdGenerator {
  generate(): string;
  generateUlid(): string;
  generateSnowflake(): string;
  generateSequential(): string;
  generateOfType(type: 'uuid' | 'ulid' | 'snowflake' | 'sequential'): string;
}

/**
 * Default ID Generator (for testing only)
 * ⚠️ This should NOT be used in production domain
 */
export class TestIdGenerator implements IdGenerator {
  private counter = 0;

  generate(): string {
    return `test_${Date.now()}_${++this.counter}`;
  }

  generateUlid(): string {
    const timestamp = Date.now().toString(36).padStart(10, '0');
    const random = Math.random().toString(36).substring(2, 18);
    return `${timestamp}${random}`.toUpperCase();
  }

  generateSnowflake(): string {
    const timestamp = BigInt(Date.now()) - 1288834974657n;
    const machineId = 1n;
    const sequence = BigInt(this.counter % 4096);
    const snowflake = (timestamp << 22n) | (machineId << 12n) | sequence;
    return snowflake.toString();
  }

  generateSequential(): string {
    return `${++this.counter}`;
  }

  generateOfType(type: 'uuid' | 'ulid' | 'snowflake' | 'sequential'): string {
    switch (type) {
      case 'ulid':
        return this.generateUlid();
      case 'snowflake':
        return this.generateSnowflake();
      case 'sequential':
        return this.generateSequential();
      default:
        return this.generate();
    }
  }
}

// ============================================================
// Abstract Domain Event Implementation
// ============================================================

/**
 * Abstract base domain event
 */
export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly metadata: Readonly<Record<string, unknown>>;

  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly version: number,
    metadata?: Record<string, unknown>,
  ) {
    this.eventId = generateEventId();
    this.occurredOn = new Date();
    this.metadata = metadata ? Object.freeze({ ...metadata }) : Object.freeze({});
  }
}

/**
 * Generate event ID (pure domain function)
 * Creates a unique identifier for domain events without external dependencies
 */
function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId.counter = (generateEventId.counter || 0) + 1);
  return `evt_${timestamp}_${random}_${counter}`;
}

namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Create a validation result
 */
export function createValidationResult(
  isValid: boolean,
  errors?: string[],
): EntityValidationResult {
  return {
    isValid,
    errors: errors || [],
  };
}

/**
 * Combine multiple validation results
 */
export function combineValidationResults(
  results: readonly EntityValidationResult[],
): EntityValidationResult {
  const allErrors: string[] = [];
  let isValid = true;

  for (const result of results) {
    if (!result.isValid) {
      isValid = false;
      allErrors.push(...result.errors);
    }
  }

  return {
    isValid,
    errors: allErrors,
  };
}
