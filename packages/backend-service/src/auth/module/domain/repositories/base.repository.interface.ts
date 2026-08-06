import { BaseEntity } from '../entities/base.entity';

/**
 * Pagination options for findAll method
 */
export interface PaginationOptions<TEntity = any> {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Field to sort by (must be a property of the entity) */
  sortBy?: keyof TEntity;
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated result wrapper
 */
export interface PaginatedResult<TEntity> {
  /** Array of entities for the current page */
  items: TEntity[];
  /** Total number of entities available */
  total: number;
  /** Current page number */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Base Repository Interface
 * Defines the contract for all domain repositories following DIP (Dependency Inversion Principle)
 * The application layer depends on this interface, infrastructure layer implements it
 */
export interface IBaseRepository<TEntity extends BaseEntity, TId = string> {
  /**
   * Save (create or update) an entity
   * @param entity - The entity to save
   * @returns The saved entity
   */
  save(entity: TEntity): Promise<TEntity>;

  /**
   * Find an entity by its ID
   * @param id - The unique identifier of the entity
   * @returns The found entity or null if not found
   */
  findById(id: TId): Promise<TEntity | null>;

  /**
   * Delete an entity by its ID
   * @param id - The unique identifier of the entity to delete
   * @returns True if deleted successfully, false if not found
   */
  delete(id: TId): Promise<boolean>;

  /**
   * Find all entities with optional pagination
   * @param options - Pagination options
   * @returns A paginated result containing entities and total count
   */
  findAll(options?: PaginationOptions<TEntity>): Promise<PaginatedResult<TEntity>>;
}
