/**
 * Base Entity abstract class
 * All domain entities should extend this class
 * Entities have identity (id) and are mutable
 */
export abstract class BaseEntity {
  public readonly id: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  /**
   * Update the updatedAt timestamp to current time
   * Should be called before any update operation
   */
  touch(): void {
    this.updatedAt = new Date();
  }

  /**
   * Check if two entities are equal by comparing their ids
   * Two entities are equal if they have the same id
   */
  equals(other: this | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof BaseEntity)) {
      return false;
    }

    return this.id === other.id;
  }

  /**
   * Check if the entity is newly created (not yet persisted)
   * Default implementation checks if createdAt equals updatedAt
   * Can be overridden by subclasses
   */
  isNew(): boolean {
    return this.createdAt.getTime() === this.updatedAt.getTime();
  }

  /**
   * Get the entity's identity as a string
   */
  getIdentity(): string {
    return this.id;
  }

  /**
   * Create a shallow copy of the entity with updated timestamps
   * Useful for creating snapshots or for auditing
   */
  snapshot(): this {
    const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    return clone;
  }
}
