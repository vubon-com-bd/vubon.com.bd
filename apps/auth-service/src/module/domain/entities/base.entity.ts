/**
 * Base Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/base.entity
 * 
 * @description
 * Abstract base class for all domain entities following DDD patterns.
 * Provides common functionality: ID, timestamps, versioning, equality, domain events.
 * 
 * Enterprise Rules:
 * ✅ NO external dependencies (crypto, frameworks)
 * ✅ Immutable core properties
 * ✅ Domain event registry
 * ✅ Entity equality by ID
 * ✅ Optimistic locking with version
 * ✅ Thread-safe with copy-on-write semantics
 * 
 * IMPORTANT: ID generation strategy is injected via factory pattern,
 * not called directly from domain entity.
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

// ==================== Types ====================

/**
 * Base domain event interface
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
export type DomainEventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>;

/**
 * Entity constructor options
 */
export interface EntityConstructorOptions {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
}

/**
 * Entity validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: readonly string[];
}

// ==================== Domain Errors ====================

/**
 * Entity validation error
 */
export class EntityValidationError extends Error {
  public readonly errors: readonly string[];
  
  constructor(message: string, errors?: readonly string[]) {
    super(message);
    this.name = 'EntityValidationError';
    this.errors = errors || [message];
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

// ==================== Base Entity ====================

/**
 * Abstract base entity class
 */
export abstract class BaseEntity {
  // Private readonly fields (immutable after construction)
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _version: number;
  
  // Domain event registry
  private _domainEvents: DomainEvent[] = [];
  
  // Entity metadata (for change tracking)
  private _isDeleted: boolean = false;

  /**
   * Protected constructor - entities should use factory methods
   */
  protected constructor(options: EntityConstructorOptions) {
    // Validate ID
    if (!options.id || options.id.trim().length === 0) {
      throw new EntityValidationError('Entity ID cannot be empty');
    }
    
    this._id = options.id;
    this._createdAt = options.createdAt ? new Date(options.createdAt) : new Date();
    this._updatedAt = options.updatedAt ? new Date(options.updatedAt) : new Date(this._createdAt);
    this._version = options.version ?? 1;
    
    // Validate version
    if (this._version < 1) {
      throw new EntityValidationError('Version must be at least 1');
    }
    
    // Validate timestamps
    if (this._createdAt > this._updatedAt) {
      throw new EntityValidationError('CreatedAt cannot be after UpdatedAt');
    }
    
    // Validate entity state after construction
    const validation = this.validate();
    if (!validation.isValid) {
      throw new EntityValidationError('Entity validation failed', validation.errors);
    }
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
   * Check if entity is newly created (not yet persisted)
   */
  public get isNew(): boolean {
    return this._version === 1 && !this._isDeleted;
  }

  /**
   * Check if entity has been modified since load
   */
  public get isDirty(): boolean {
    return this._version > 1;
  }

  // ============================================================
  // Protected Helpers
  // ============================================================

  /**
   * Validate entity invariants
   * Must be implemented by concrete entities
   */
  protected abstract validate(): ValidationResult;

  /**
   * Update timestamp and increment version
   * Called automatically when entity changes
   */
  protected touch(): void {
    this._updatedAt = new Date();
    this._version++;
  }

  /**
   * Increment version without changing timestamp
   * Used for version updates from persistence
   */
  protected incrementVersion(): void {
    this._version++;
  }

  /**
   * Mark entity as deleted (soft delete)
   */
  protected markAsDeleted(): void {
    this._isDeleted = true;
    this.touch();
  }

  /**
   * Restore entity from soft delete
   */
  protected restore(): void {
    this._isDeleted = false;
    this.touch();
  }

  /**
   * Ensure entity is not deleted before operation
   * @throws EntityValidationError if entity is deleted
   */
  protected ensureNotDeleted(): void {
    if (this._isDeleted) {
      throw new EntityValidationError(`Cannot perform operation on deleted entity ${this.constructor.name} ${this._id}`);
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
      throw new EntityValidationError('Domain event cannot be null');
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
  // JSON Serialization
  // ============================================================

  /**
   * Convert entity to plain object (for serialization)
   */
  public toJSON(): Record<string, unknown> {
    return {
      id: this._id,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
      version: this._version,
      isDeleted: this._isDeleted,
    };
  }

  /**
   * Convert entity to a plain object for persistence
   * Override in child classes for custom persistence mapping
   */
  public toPersistence(): Record<string, unknown> {
    return this.toJSON();
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `${this.constructor.name}(id=${this._id}, version=${this._version}, deleted=${this._isDeleted})`;
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
      throw new EntityValidationError('Cannot merge entities with different IDs');
    }
    
    this._updatedAt = new Date(other._updatedAt);
    this._version = other._version;
    this._isDeleted = other._isDeleted;
    
    // Merge domain events without duplication
    const existingEventIds = new Set(this._domainEvents.map(e => e.eventId));
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
    return this.generate();
  }
  
  generateSnowflake(): string {
    return this.generate();
  }
  
  generateSequential(): string {
    return `${++this.counter}`;
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
  public readonly metadata?: Readonly<Record<string, unknown>>;
  
  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly version: number,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = generateEventId();
    this.occurredOn = new Date();
    this.metadata = metadata ? Object.freeze({ ...metadata }) : undefined;
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
export function createValidationResult(isValid: boolean, errors?: string[]): ValidationResult {
  return {
    isValid,
    errors: errors || [],
  };
}

/**
 * Combine multiple validation results
 */
export function combineValidationResults(results: readonly ValidationResult[]): ValidationResult {
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

// ============================================================
// Type Exports
// ============================================================

export type { EntityConstructorOptions, ValidationResult };
