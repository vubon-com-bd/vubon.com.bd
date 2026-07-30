/**
 * Base Entity
 * All domain entities extend this class
 */

import { randomUUID } from 'node:crypto';

export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(id?: string) {
    this.id = id || randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Update the updatedAt timestamp
   * Call this method before any update operation
   */
  public touch(): void {
    this.updatedAt = new Date();
  }

  /**
   * Check if two entities are equal (by ID)
   */
  public equals(entity: BaseEntity): boolean {
    return this.id === entity.id;
  }
}
