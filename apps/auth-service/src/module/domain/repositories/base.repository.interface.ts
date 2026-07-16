/**
 * Base Repository Interface - Pure Domain Contract (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/repositories/base.repository.interface
 *
 * @description
 * Generic repository interface for domain entity persistence.
 * Defines contracts for CRUD operations, pagination, and querying.
 *
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Supports pagination, transactions, and specifications
 * ✅ Domain events handling contract
 * ✅ Optimistic locking support
 * ✅ Bulk operations with progress tracking
 * ✅ Audit logging support
 * ✅ Cache invalidation hooks
 *
 * IMPORTANT: Implementation resides in infrastructure layer
 * (Prisma, TypeORM, Mongoose, etc.)
 *
 * @example
 * export class UserRepository implements BaseRepository<User> {
 *   async findById(id: string): Promise<User | null> { ... }
 *   async save(user: User): Promise<void> { ... }
 *   async delete(id: string): Promise<void> { ... }
 * }
 */

// ============================================================
// Types (Local - No external imports)
// ============================================================

/**
 * Pagination options for queries
 */
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, unknown>;
}

/**
 * Paginated result
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Cursor pagination options (for large datasets)
 */
export interface CursorPaginationOptions {
  cursor?: string; // Encoded cursor
  limit: number; // Items per page
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Cursor paginated result
 */
export interface CursorPaginatedResult<T> {
  data: T[];
  nextCursor?: string;
  prevCursor?: string;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Query specification (for flexible querying)
 */
export interface Specification<T> {
  toWhereClause(): Record<string, unknown>;
  toQueryString(): string;
  matches(entity: T): boolean;
}

/**
 * Transaction context (for unit of work pattern)
 */
export interface TransactionContext {
  runInTransaction<R>(callback: () => Promise<R>): Promise<R>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getTransactionId(): string;
  isActive(): boolean;
}

/**
 * Domain event interface (local definition)
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
 * Event dispatcher interface
 * For handling domain events after persistence
 */
export interface EventDispatcher {
  dispatch<T extends DomainEvent>(event: T): Promise<void>;
  dispatchMany(events: DomainEvent[]): Promise<void>;
  dispatchFromAggregate(entity: { pullDomainEvents(): DomainEvent[] }): Promise<void>;
}

/**
 * Bulk operation progress tracker
 */
export interface BulkOperationProgress {
  total: number;
  completed: number;
  failed: number;
  skipped: number;
  percentage: number;
  estimatedRemainingMs?: number;
}

/**
 * Bulk operation callback
 */
export type BulkProgressCallback = (progress: BulkOperationProgress) => void;

/**
 * Cache invalidation hook
 */
export interface CacheInvalidationHook {
  onModified(ids: string[]): Promise<void>;
  onDeleted(ids: string[]): Promise<void>;
  onClear(): Promise<void>;
}

// ============================================================
// Query Builder Interface
// ============================================================

/**
 * Query Builder Interface for type-safe queries
 */
export interface QueryBuilder<T> {
  where(condition: Record<string, unknown>): QueryBuilder<T>;
  whereRaw(condition: string, params?: unknown[]): QueryBuilder<T>;
  andWhere(condition: Record<string, unknown>): QueryBuilder<T>;
  orWhere(condition: Record<string, unknown>): QueryBuilder<T>;
  orderBy(field: string, direction: 'asc' | 'desc'): QueryBuilder<T>;
  limit(limit: number): QueryBuilder<T>;
  offset(offset: number): QueryBuilder<T>;
  include(relations: string[]): QueryBuilder<T>;
  select(fields: string[]): QueryBuilder<T>;
  skipCache(): QueryBuilder<T>;
  cacheTtl(seconds: number): QueryBuilder<T>;
  audit(context: Record<string, unknown>): QueryBuilder<T>;
  execute(): Promise<T[]>;
  getOne(): Promise<T | null>;
  getCount(): Promise<number>;
  getPaginated(options: PaginationOptions): Promise<PaginatedResult<T>>;
}

// ============================================================
// Domain Errors
// ============================================================

/**
 * Optimistic Lock Error
 */
export class OptimisticLockError extends Error {
  public readonly entityId: string;
  public readonly expectedVersion: number;
  public readonly actualVersion: number;

  constructor(entityId: string, expectedVersion: number, actualVersion: number) {
    super(
      `Optimistic lock failed for entity ${entityId}. ` +
        `Expected version ${expectedVersion}, but found ${actualVersion}`,
    );
    this.name = 'OptimisticLockError';
    this.entityId = entityId;
    this.expectedVersion = expectedVersion;
    this.actualVersion = actualVersion;
  }
}

/**
 * Entity Not Found Error
 */
export class EntityNotFoundError extends Error {
  public readonly entityType: string;
  public readonly entityId: string;

  constructor(entityType: string, id: string) {
    super(`${entityType} with id ${id} not found`);
    this.name = 'EntityNotFoundError';
    this.entityType = entityType;
    this.entityId = id;
  }
}

/**
 * Concurrency Error (multiple operations)
 */
export class ConcurrencyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConcurrencyError';
  }
}

/**
 * Duplicate Entity Error
 */
export class DuplicateEntityError extends Error {
  public readonly entityType: string;
  public readonly field: string;
  public readonly value: string;

  constructor(entityType: string, field: string, value: string) {
    super(`${entityType} with ${field} '${value}' already exists`);
    this.name = 'DuplicateEntityError';
    this.entityType = entityType;
    this.field = field;
    this.value = value;
  }
}

/**
 * Bulk Operation Error
 */
export class BulkOperationError extends Error {
  public readonly failedItems: Array<{ id: string; error: string }>;
  public readonly successfulCount: number;
  public readonly failedCount: number;

  constructor(
    message: string,
    failedItems: Array<{ id: string; error: string }>,
    successfulCount: number,
  ) {
    super(message);
    this.name = 'BulkOperationError';
    this.failedItems = failedItems;
    this.successfulCount = successfulCount;
    this.failedCount = failedItems.length;
  }
}

// ============================================================
// Base Repository Interface
// ============================================================

/**
 * Base Repository Interface
 *
 * Generic contract for entity persistence operations
 *
 * @template T - Entity type
 */
export interface BaseRepository<T> {
  // ========== Basic CRUD Operations ==========

  /**
   * Find entity by ID
   * @param id - Entity unique identifier
   * @returns Entity or null if not found
   */
  findById(id: string): Promise<T | null>;

  /**
   * Find entity by ID with version check (optimistic locking)
   * @param id - Entity unique identifier
   * @param expectedVersion - Expected version for optimistic locking
   * @returns Entity or null if not found or version mismatch
   */
  findByIdWithVersion(id: string, expectedVersion: number): Promise<T | null>;

  /**
   * Find multiple entities by IDs
   * @param ids - Array of entity IDs
   * @returns Array of found entities (order preserved, null for not found)
   */
  findByIds(ids: string[]): Promise<(T | null)[]>;

  /**
   * Find all entities with pagination
   * @param options - Pagination options
   * @returns Paginated results
   */
  findAll(options: PaginationOptions): Promise<PaginatedResult<T>>;

  /**
   * Find all entities with cursor pagination (for large datasets)
   * @param options - Cursor pagination options
   * @returns Cursor paginated results
   */
  findAllCursor(options: CursorPaginationOptions): Promise<CursorPaginatedResult<T>>;

  /**
   * Find entities matching specification
   * @param specification - Query specification
   * @param options - Pagination options
   * @returns Paginated results
   */
  findBySpecification(
    specification: Specification<T>,
    options: PaginationOptions,
  ): Promise<PaginatedResult<T>>;

  // ========== Save Operations ==========

  /**
   * Save entity (insert or update)
   * @param entity - Domain entity to persist
   * @returns void
   */
  save(entity: T): Promise<void>;

  /**
   * Save multiple entities (batch)
   * @param entities - Array of entities to persist
   * @returns void
   */
  saveMany(entities: T[]): Promise<void>;

  /**
   * Insert entity (only insert, throws if exists)
   * @param entity - Domain entity to insert
   * @returns void
   * @throws {DuplicateEntityError} If entity already exists
   */
  insert(entity: T): Promise<void>;

  /**
   * Update entity (only update, throws if not exists)
   * @param entity - Domain entity to update
   * @returns void
   * @throws {EntityNotFoundError} If entity not found
   */
  update(entity: T): Promise<void>;

  /**
   * Update entity with optimistic locking
   * @param entity - Domain entity with updated version
   * @returns void
   * @throws {OptimisticLockError} If version mismatch
   */
  updateWithVersion(entity: T): Promise<void>;

  /**
   * Upsert entity (insert or update)
   * @param entity - Domain entity to upsert
   * @returns void
   */
  upsert(entity: T): Promise<void>;

  // ========== Delete Operations ==========

  /**
   * Delete entity by ID
   * @param id - Entity unique identifier
   * @returns void
   */
  delete(id: string): Promise<void>;

  /**
   * Delete multiple entities by IDs
   * @param ids - Array of entity IDs
   * @returns Number of deleted entities
   */
  deleteMany(ids: string[]): Promise<number>;

  /**
   * Soft delete entity (set deleted flag)
   * @param id - Entity unique identifier
   * @returns void
   */
  softDelete(id: string): Promise<void>;

  /**
   * Restore soft-deleted entity
   * @param id - Entity unique identifier
   * @returns void
   */
  restore(id: string): Promise<void>;

  // ========== Existence & Count Operations ==========

  /**
   * Check if entity exists by ID
   * @param id - Entity unique identifier
   * @returns true if entity exists
   */
  exists(id: string): Promise<boolean>;

  /**
   * Check if entity exists matching specification
   * @param specification - Query specification
   * @returns true if matching entity exists
   */
  existsBySpecification(specification: Specification<T>): Promise<boolean>;

  /**
   * Count total entities
   * @returns Total count
   */
  count(): Promise<number>;

  /**
   * Count entities matching specification
   * @param specification - Query specification
   * @returns Count of matching entities
   */
  countBySpecification(specification: Specification<T>): Promise<number>;

  // ========== Domain Events Operations ==========

  /**
   * Save entity and dispatch domain events
   * @param entity - Domain entity to persist
   * @param eventDispatcher - Event dispatcher for domain events
   * @returns void
   */
  saveAndDispatchEvents(entity: T, eventDispatcher?: EventDispatcher): Promise<void>;

  /**
   * Save multiple entities and dispatch events
   * @param entities - Array of entities to persist
   * @param eventDispatcher - Event dispatcher for domain events
   * @returns void
   */
  saveManyAndDispatchEvents(entities: T[], eventDispatcher?: EventDispatcher): Promise<void>;

  // ========== Transaction Operations ==========

  /**
   * Execute operations within a transaction
   * @param callback - Function to execute within transaction
   * @returns Result of callback
   */
  runInTransaction<R>(callback: () => Promise<R>): Promise<R>;

  /**
   * Get transaction context for manual control
   * @returns Transaction context
   */
  getTransactionContext(): TransactionContext;

  // ========== Query Builder ==========

  /**
   * Create a typed query builder
   * @returns Query builder instance
   */
  createQueryBuilder(): QueryBuilder<T>;

  // ========== Bulk Operations ==========

  /**
   * Bulk insert entities (optimized for large datasets)
   * @param entities - Array of entities to insert
   * @param options - Bulk options (batchSize, skipDuplicates, etc.)
   * @returns Number of inserted entities
   */
  bulkInsert(
    entities: T[],
    options?: { batchSize?: number; skipDuplicates?: boolean },
  ): Promise<number>;

  /**
   * Bulk update entities
   * @param entities - Array of entities to update
   * @param options - Bulk options
   * @returns Number of updated entities
   */
  bulkUpdate(entities: T[], options?: { batchSize?: number }): Promise<number>;

  /**
   * Bulk upsert entities
   * @param entities - Array of entities to upsert
   * @param options - Bulk options
   * @returns { inserted: number; updated: number }
   */
  bulkUpsert(
    entities: T[],
    options?: { batchSize?: number },
  ): Promise<{ inserted: number; updated: number }>;

  /**
   * Bulk delete by specification
   * @param specification - Query specification for deletion
   * @returns Number of deleted entities
   */
  bulkDelete(specification: Specification<T>): Promise<number>;

  /**
   * Bulk operation with progress tracking
   * @param entities - Array of entities
   * @param operation - Operation to perform on each entity
   * @param onProgress - Progress callback
   * @returns Operation results
   */
  bulkOperationWithProgress(
    entities: T[],
    operation: (entity: T) => Promise<void>,
    onProgress?: BulkProgressCallback,
  ): Promise<{ successful: number; failed: Array<{ entity: T; error: string }> }>;

  // ========== Cache Management ==========

  /**
   * Register cache invalidation hook
   * @param hook - Cache invalidation hook
   */
  registerCacheHook(hook: CacheInvalidationHook): void;

  /**
   * Clear all cache for this repository
   */
  clearCache(): Promise<void>;

  /**
   * Invalidate cache for specific entities
   * @param ids - Entity IDs to invalidate
   */
  invalidateCache(ids: string[]): Promise<void>;

  // ========== Audit & Logging ==========

  /**
   * Enable audit logging for this repository
   * @param enabled - Whether audit logging is enabled
   */
  setAuditLogging(enabled: boolean): void;

  /**
   * Get audit trail for an entity
   * @param id - Entity ID or filter criteria
   * @returns Audit trail entries
   */
  getAuditTrail(id: string | Record<string, unknown>): Promise<
    Array<{
      timestamp: Date;
      action: 'create' | 'update' | 'delete' | 'soft_delete' | 'restore';
      changes?: Record<string, { old: unknown; new: unknown }>;
      performedBy?: string;
      ipAddress?: string;
      entityId?: string;
      entityType?: string;
    }>
  >;
}

// ============================================================
// Repository Options
// ============================================================

/**
 * Repository options for configuration
 */
export interface RepositoryOptions {
  enableSoftDelete?: boolean;
  enableOptimisticLocking?: boolean;
  defaultPageSize?: number;
  maxPageSize?: number;
  enableCaching?: boolean;
  cacheTtlSeconds?: number;
  enableAuditLogging?: boolean;
  bulkBatchSize?: number;
  enableReadReplica?: boolean;
  readReplicaUrl?: string;
  connectionTimeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
  enableCompression?: boolean;
}

/**
 * Repository health status
 */
export interface RepositoryHealthStatus {
  isConnected: boolean;
  lastPingAt?: Date;
  error?: string;
  latencyMs?: number;
  poolSize?: number;
  activeConnections?: number;
}
