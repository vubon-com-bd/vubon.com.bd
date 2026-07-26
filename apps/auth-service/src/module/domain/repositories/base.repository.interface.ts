/**
 * Base Repository Interface
 * Defines common CRUD operations for all repositories
 */

import { BaseEntity } from '../entities/base.entity.js';

export interface IBaseRepository<T extends BaseEntity> {
  /**
   * Save an entity (create or update)
   */
  save(entity: T): Promise<T>;

  /**
   * Find an entity by its ID
   */
  findById(id: string): Promise<T | null>;

  /**
   * Delete an entity by its ID
   */
  delete(id: string): Promise<void>;

  /**
   * Check if an entity exists by its ID
   */
  exists(id: string): Promise<boolean>;

  /**
   * Find all entities with optional pagination
   */
  findAll(options?: {
    skip?: number;
    take?: number;
    orderBy?: Record<string, 'asc' | 'desc'>;
  }): Promise<T[]>;

  /**
   * Count total entities
   */
  count(): Promise<number>;
}
