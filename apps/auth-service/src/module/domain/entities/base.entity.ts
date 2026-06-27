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
 * ✅ Shared constants from @vubon/shared-constants (ID patterns)
 * ✅ Shared types from @vubon/shared-types (DomainEvent types)
 * ✅ Change tracking for audit trail
 * ✅ Metadata support for audit logging
 * ✅ Optimistic locking with version
 * ✅ Soft delete with restore
 * ✅ Domain event registry with pull pattern
 * ✅ ID generation strategy injection
 * ✅ Thread-safe with copy-on-write semantics
 * 
 * @example
 * class User extends BaseEntity {
 *   private constructor(id: string, createdAt: Date, updatedAt: Date, version: number) {
 *     super(id, createdAt, updatedAt, version);
 *   }
 *   
 *   public static create(email: EmailVO, idGenerator: IdGenerator): User {
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

// ✅ FIXED: Import from shared packages
import { ID_PATTERNS, ID_CONFIG } from '@vubon/shared-constants';
import type { DomainEvent as SharedDomainEvent, AuditMetadata } from '@vubon/shared-types';

// ==================== Types ====================

/**
 * Domain event interface (extends shared type)
 */
export interface DomainEvent extends SharedDomainEvent {
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
export type DomainEventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>;

/**
 * Entity constructor options
 */
export interface EntityConstructorOptions {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
  metadata?: AuditMetadata;
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
// apps/auth-service/src/module/domain/entities/base.entity.ts
// ✅ EntityMetadata ইন্টারফেস আপডেট করুন (প্রায় লাইন 50-60)

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

// ✅ ChangeEntry ইন্টারফেস আপডেট করুন (প্রায় লাইন 440-450)

export interface ChangeEntry {
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedAt: Date;
  changedBy?: string;  // ✅ optional করুন
}

// ==================== Constants ====================

/**
 * ID validation configuration (from shared-constants)
 */
const ID_VALIDATION_CONFIG = {
  // Supported ID types
  SUPPORTED_TYPES: ['uuid', 'ulid', 'snowflake', 'sequential'] as const,
  
  // Default ID type for new entities
  DEFAULT_ID_TYPE: 'uuid' as const,
  
  // Minimum ID length
  MIN_LENGTH: ID_CONFIG?.MIN_LENGTH || 1,
  
  // Maximum ID length
  MAX_LENGTH: ID_CONFIG?.MAX_LENGTH || 255,
} as const;

// ==================== Domain Errors ====================

/**
 * Entity validation error
 */
// ✅ FIXED: ডিফল্ট ভ্যালু ব্যবহার করুন
export class EntityValidationError extends Error {
  public readonly errors: readonly string[];
  public readonly entityName: string;  // ✅ required রাখুন
  
  constructor(message: string, errors?: readonly string[], entityName?: string) {
    super(message);
    this.name = 'EntityValidationError';
    this.errors = errors || [message];
    this.entityName = entityName || 'Unknown';  // ✅ ডিফল্ট ভ্যালু
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Entity not found error
 */
export class EntityNotFoundError extends Error {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} not found`);
    this.name = 'EntityNotFoundError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Entity conflict error (version mismatch)
 */
export class EntityConflictError extends Error {
  constructor(entityName: string, id: string, expectedVersion: number, actualVersion: number) {
    super(`${entityName} ${id} version conflict: expected ${expectedVersion}, got ${actualVersion}`);
    this.name = 'EntityConflictError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Entity already deleted error
 */
export class EntityAlreadyDeletedError extends Error {
  constructor(entityName: string, id: string) {
    super(`${entityName} ${id} is already deleted`);
    this.name = 'EntityAlreadyDeletedError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Invalid ID format error
 */
export class InvalidIdFormatError extends Error {
  constructor(id: string, expectedFormat: string) {
    super(`Invalid ID format: ${id}. Expected ${expectedFormat}`);
    this.name = 'InvalidIdFormatError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// ==================== Base Entity ====================

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
  
  // ✅ NEW: Change tracking for audit trail
  private _changes: Map<string, ChangeEntry> = new Map();
  
  // ✅ NEW: Entity tags for categorization
  private _tags: Set<string> = new Set();

  /**
   * Protected constructor - entities should use factory methods
   */
  protected constructor(options: EntityConstructorOptions) {
    // ✅ Validate ID with shared patterns
    if (!options.id || options.id.trim().length === 0) {
      throw new EntityValidationError('Entity ID cannot be empty', [], this.constructor.name);
    }
    
    // ✅ Validate ID format using shared constants
    if (!this.validateIdFormat(options.id)) {
      throw new InvalidIdFormatError(options.id, 'UUID v4, ULID, Snowflake, or alphanumeric string');
    }
    
    // Validate ID length
    if (options.id.length > ID_VALIDATION_CONFIG.MAX_LENGTH) {
      throw new EntityValidationError(
        `Entity ID too long (max ${ID_VALIDATION_CONFIG.MAX_LENGTH} characters)`,
        [],
        this.constructor.name
      );
    }
    
    this._id = options.id;
    this._createdAt = options.createdAt ? new Date(options.createdAt) : new Date();
    this._updatedAt = options.updatedAt ? new Date(options.updatedAt) : new Date(this._createdAt);
    this._version = options.version ?? 1;
    // ✅ FIXED: স্প্রেড অপারেটর ব্যবহার করে শুধু existing প্রপার্টি assign করুন
this._metadata = {
  ...(options.metadata?.createdBy && { createdBy: options.metadata.createdBy }),
  ...(options.metadata?.createdByIp && { createdByIp: options.metadata.createdByIp }),
  ...(options.metadata?.createdByUserAgent && { createdByUserAgent: options.metadata.createdByUserAgent }),
  ...(options.metadata?.lastModifiedBy && { lastModifiedBy: options.metadata.lastModifiedBy }),
  ...(options.metadata?.lastModifiedByIp && { lastModifiedByIp: options.metadata.lastModifiedByIp }),
  ...(options.metadata?.lastModifiedByUserAgent && { lastModifiedByUserAgent: options.metadata.lastModifiedByUserAgent }),
  ...(options.metadata?.tags && { tags: [...options.metadata.tags] }),
  ...(options.metadata?.custom && { custom: { ...options.metadata.custom } }),
};
    
    // Validate version
    if (this._version < 1) {
      throw new EntityValidationError('Version must be at least 1', [], this.constructor.name);
    }
    
    // Validate timestamps
    if (this._createdAt > this._updatedAt) {
      throw new EntityValidationError('CreatedAt cannot be after UpdatedAt', [], this.constructor.name);
    }
    
    // Validate entity state after construction
    const validation = this.validate();
    if (!validation.isValid) {
      throw new EntityValidationError('Entity validation failed', validation.errors, this.constructor.name);
    }
  }

  // ============================================================
  // ID Validation (Using Shared Constants)
  // ============================================================

  /**
   * Validate ID format using shared constants patterns
   * ✅ Enterprise enhancement
   */
  private validateIdFormat(id: string): boolean {
    // Check UUID v4
    if (ID_PATTERNS?.UUID_V4?.test(id)) return true;
    
    // Check ULID format (10 characters timestamp + 16 random = 26 chars base32)
    if (ID_PATTERNS?.ULID?.test(id)) return true;
    
    // Check Snowflake ID (19 digits, Twitter snowflake format)
    if (ID_PATTERNS?.SNOWFLAKE?.test(id)) return true;
    
    // Check sequential/alphanumeric ID (allowed for backward compatibility)
    if (ID_PATTERNS?.ALPHANUMERIC?.test(id)) return true;
    
    // Fallback: allow alphanumeric with hyphens/underscores (legacy support)
    return /^[a-zA-Z0-9\-_.]{1,255}$/.test(id);
  }

  /**
   * Get the ID type based on format
   */
  public getIdType(): 'uuid' | 'ulid' | 'snowflake' | 'sequential' | 'unknown' {
    if (ID_PATTERNS?.UUID_V4?.test(this._id)) return 'uuid';
    if (ID_PATTERNS?.ULID?.test(this._id)) return 'ulid';
    if (ID_PATTERNS?.SNOWFLAKE?.test(this._id)) return 'snowflake';
    if (/^\d+$/.test(this._id)) return 'sequential';
    return 'unknown';
  }

  // ============================================================
  // Getters
  // ============================================================

  /**
   * Get entity ID
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Get creation timestamp (immutable copy)
   */
  public get createdAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * Get last update timestamp (immutable copy)
   */
  public get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  /**
   * Get version (for optimistic locking)
   */
  public get version(): number {
    return this._version;
  }

  /**
   * Check if entity is deleted (soft delete)
   */
  public get isDeleted(): boolean {
    return this._isDeleted;
  }

  /**
   * Get deletion timestamp
   */
  public get deletedAt(): Date | null {
    return this._deletedAt ? new Date(this._deletedAt) : null;
  }

  /**
   * Check if entity is newly created (not yet persisted)
   */
  public get isNew(): boolean {
    return this._version === 1 && !this._isDeleted;
  }

  /**
   * Check if entity has been modified since load
   */
  public get isDirty(): boolean {
    return this._version > 1 || this._changes.size > 0;
  }

  /**
   * Get entity metadata (readonly copy)
   */
  public get metadata(): Readonly<EntityMetadata> {
    return {
      ...this._metadata,
      tags: this._metadata.tags ? [...this._metadata.tags] : [],
      custom: this._metadata.custom ? { ...this._metadata.custom } : {},
    };
  }

  /**
   * Get all changes (for audit trail)
   */
  public getChanges(): ReadonlyMap<string, ChangeEntry> {
    return new Map(this._changes);
  }

  /**
   * Get entity tags
   */
  public getTags(): readonly string[] {
    return Array.from(this._tags);
  }

  /**
   * Check if entity has specific tag
   */
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
    
    // Update metadata if provided
    if (modifiedBy) {
      this._metadata.lastModifiedBy = modifiedBy;
    }
    if (modifiedByIp) {
      this._metadata.lastModifiedByIp = modifiedByIp;
    }
  }

  /**
   * Increment version without changing timestamp
   * Used for version updates from persistence
   */
  protected incrementVersion(): void {
    this._version++;
  }

  /**
   * Track a field change for audit trail
   */
  protected trackChange<T>(
  field: string,
  oldValue: T,
  newValue: T,
  changedBy?: string
): void {
  if (oldValue === newValue) return;
  
  // changedBy থাকলেই শুধু যোগ করুন
  const change: ChangeEntry = {
    field,
    oldValue: this.deepCopy(oldValue),
    newValue: this.deepCopy(newValue),
    changedAt: new Date(),
    ...(changedBy && { changedBy }),  // ✅ changedBy থাকলেই যোগ হবে
  } as ChangeEntry;
  
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
    this.trackChange('tags', Array.from(this._tags), Array.from(this._tags));
  }

  /**
   * Remove a tag from the entity
   */
  protected removeTag(tag: string): void {
    if (this._tags.delete(tag)) {
      this.trackChange('tags', Array.from(this._tags), Array.from(this._tags));
    }
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
   * @throws EntityValidationError if entity is deleted
   */
  protected ensureNotDeleted(): void {
    if (this._isDeleted) {
      throw new EntityValidationError(
        `Cannot perform operation on deleted entity ${this.constructor.name} ${this._id}`,
        ['Entity is soft-deleted. Use restore() first if needed.'],
        this.constructor.name
      );
    }
  }

  // ============================================================
  // Equality Methods
  // ============================================================

  /**
   * Check if two entities are equal (by ID and type)
   */
  public equals(other: BaseEntity | null | undefined): boolean {
    if (!other) return false;
    if (this === other) return true;
    if (this.constructor !== other.constructor) return false;
    return this._id === other._id;
  }

  /**
   * Check if entity has same identity (by ID only)
   */
  public hasSameIdentity(other: BaseEntity | null | undefined): boolean {
    if (!other) return false;
    return this._id === other._id;
  }

  // ============================================================
  // Domain Event Methods
  // ============================================================

  /**
   * Add a domain event
   */
  protected addDomainEvent(event: DomainEvent): void {
    if (!event) {
      throw new EntityValidationError('Domain event cannot be null', [], this.constructor.name);
    }
    this._domainEvents.push(event);
  }

  /**
   * Add multiple domain events
   */
  protected addDomainEvents(events: readonly DomainEvent[]): void {
    for (const event of events) {
      this.addDomainEvent(event);
    }
  }

  /**
   * Get all domain events (read-only copy)
   */
  public getDomainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents];
  }

  /**
   * Clear all domain events
   */
  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  /**
   * Get and clear domain events (for event dispatcher)
   */
  public pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this.clearDomainEvents();
    return events;
  }

  /**
   * Check if entity has any domain events
   */
  public hasDomainEvents(): boolean {
    return this._domainEvents.length > 0;
  }

  // ============================================================
  // Audit Trail Methods
  // ============================================================

  /**
   * Get audit trail for this entity
   */
  // ✅ FIXED: শুধু existing প্রপার্টি রিটার্ন করুন
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

  // ✅ শুধু existing প্রপার্টি যোগ করুন
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

  /**
   * Convert entity to plain object (for serialization)
   */
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

  /**
   * Convert entity to a plain object for persistence
   * Override in child classes for custom persistence mapping
   */
  public toPersistence(): Record<string, unknown> {
    return {
      ...this.toJSON(),
      changes: this.isDirty ? Array.from(this._changes.values()) : undefined,
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `${this.constructor.name}(id=${this._id}, type=${this.getIdType()}, version=${this._version}, deleted=${this._isDeleted})`;
  }

  // ============================================================
  // Comparison Methods
  // ============================================================

  /**
   * Compare versions for optimistic locking
   * @throws EntityConflictError if versions don't match
   */
  public assertVersion(expectedVersion: number): void {
    if (this._version !== expectedVersion) {
      throw new EntityConflictError(
        this.constructor.name,
        this._id,
        expectedVersion,
        this._version
      );
    }
  }

  /**
   * Merge changes from another entity instance
   * Used for updating entity state after persistence
   */
  protected mergeFrom(other: this): void {
    if (!this.hasSameIdentity(other)) {
      throw new EntityValidationError(
        'Cannot merge entities with different IDs',
        [`Source ID: ${this._id}, Target ID: ${other._id}`],
        this.constructor.name
      );
    }
    
    this._updatedAt = new Date(other._updatedAt);
    this._version = other._version;
    this._isDeleted = other._isDeleted;
    this._deletedAt = other._deletedAt ? new Date(other._deletedAt) : null;
    
    // Merge metadata
    // ✅ FIXED: স্প্রেড অপারেটর + কন্ডিশনাল প্রপার্টি ব্যবহার করুন
this._metadata = {
  ...(this._metadata.createdBy && { createdBy: this._metadata.createdBy }),
  ...(this._metadata.createdByIp && { createdByIp: this._metadata.createdByIp }),
  ...(this._metadata.createdByUserAgent && { createdByUserAgent: this._metadata.createdByUserAgent }),
  ...(this._metadata.lastModifiedBy && { lastModifiedBy: this._metadata.lastModifiedBy }),
  ...(this._metadata.lastModifiedByIp && { lastModifiedByIp: this._metadata.lastModifiedByIp }),
  ...(this._metadata.lastModifiedByUserAgent && { lastModifiedByUserAgent: this._metadata.lastModifiedByUserAgent }),
  ...(other._metadata.createdBy && { createdBy: other._metadata.createdBy }),
  ...(other._metadata.createdByIp && { createdByIp: other._metadata.createdByIp }),
  ...(other._metadata.createdByUserAgent && { createdByUserAgent: other._metadata.createdByUserAgent }),
  ...(other._metadata.lastModifiedBy && { lastModifiedBy: other._metadata.lastModifiedBy }),
  ...(other._metadata.lastModifiedByIp && { lastModifiedByIp: other._metadata.lastModifiedByIp }),
  ...(other._metadata.lastModifiedByUserAgent && { lastModifiedByUserAgent: other._metadata.lastModifiedByUserAgent }),
  ...(other._metadata.tags && { tags: [...other._metadata.tags] }),
  ...(this._metadata.tags && !other._metadata.tags && { tags: [...this._metadata.tags] }),
  ...(other._metadata.custom && { custom: { ...other._metadata.custom } }),
  ...(this._metadata.custom && !other._metadata.custom && { custom: { ...this._metadata.custom } }),
};
    // Merge tags
    this._tags = new Set([...this._tags, ...other._tags]);
    
    // Merge domain events without duplication
    const existingEventIds = new Set(this._domainEvents.map(e => e.eventId));
    for (const event of other._domainEvents) {
      if (!existingEventIds.has(event.eventId)) {
        this._domainEvents.push(event);
      }
    }
    
    // Note: Changes are NOT merged - they are specific to the instance
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
  /**
   * Generate a unique ID (UUID v4 compatible)
   */
  generate(): string;
  
  /**
   * Generate a ULID (sortable unique identifier)
   */
  generateUlid(): string;
  
  /**
   * Generate a Snowflake ID (Twitter snowflake)
   */
  generateSnowflake(): string;
  
  /**
   * Generate a sequential ID
   */
  generateSequential(): string;
  
  /**
   * Generate an ID of specific type
   */
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
    // Generate a ULID-compatible format (timestamp + random)
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
      case 'ulid': return this.generateUlid();
      case 'snowflake': return this.generateSnowflake();
      case 'sequential': return this.generateSequential();
      default: return this.generate();
    }
  }
}

/**
 * ⚠️ WARNING: Crypto-based ID generator removed from domain layer.
 * Crypto operations belong in infrastructure layer.
 * Use IdGenerator interface for injection instead.
 */

// ============================================================
// Abstract Domain Event Implementation
// ============================================================

/**
 * Abstract base domain event
 */
// ✅ FIXED: ডিফল্ট খালি অবজেক্ট ব্যবহার করুন
export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly metadata: Readonly<Record<string, unknown>>;  // ✅ required রাখুন
  
  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly version: number,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = generateEventId();
    this.occurredOn = new Date();
    this.metadata = metadata ? Object.freeze({ ...metadata }) : Object.freeze({});  // ✅ ডিফল্ট খালি অবজেক্ট
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

// Namespace for counter persistence
namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Create a validation result
 */
export function createValidationResult(isValid: boolean, errors?: string[]): EntityValidationResult {
  return {
    isValid,
    errors: errors || [],
  };
}

/**
 * Combine multiple validation results
 */
export function combineValidationResults(results: readonly EntityValidationResult[]): EntityValidationResult {
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
