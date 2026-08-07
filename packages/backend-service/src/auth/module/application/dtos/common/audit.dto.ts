// packages/backend-service/src/auth/module/application/dtos/common/audit.dto.ts

/**
 * Audit DTO
 * Base DTO for all entities that require audit trail
 * Extend this class to add audit fields to your DTOs
 */
export abstract class AuditDto {
  /**
   * Timestamp when the record was created
   */
  readonly createdAt: Date;

  /**
   * Timestamp when the record was last updated
   */
  readonly updatedAt: Date;

  /**
   * ID of the user who created the record
   */
  readonly createdBy?: string;

  /**
   * ID of the user who last updated the record
   */
  readonly updatedBy?: string;

  constructor(createdAt: Date, updatedAt: Date, createdBy?: string, updatedBy?: string) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  /**
   * Checks if the record was created by a specific user
   */
  isCreatedBy(userId: string): boolean {
    if (!this.createdBy) {
      return false;
    }
    return this.createdBy === userId;
  }

  /**
   * Checks if the record was updated by a specific user
   */
  isUpdatedBy(userId: string): boolean {
    if (!this.updatedBy) {
      return false;
    }
    return this.updatedBy === userId;
  }

  /**
   * Checks if the record is new (createdAt equals updatedAt)
   */
  isNew(): boolean {
    return this.createdAt.getTime() === this.updatedAt.getTime();
  }

  /**
   * Gets the age of the record in milliseconds
   */
  getAge(): number {
    return Date.now() - this.createdAt.getTime();
  }

  /**
   * Gets the time since last update in milliseconds
   */
  getTimeSinceUpdate(): number {
    return Date.now() - this.updatedAt.getTime();
  }

  /**
   * Creates a clone with updated timestamps
   */
  withUpdatedAt(updatedAt: Date, updatedBy?: string): this {
    const Constructor = this.constructor as new (
      createdAt: Date,
      updatedAt: Date,
      createdBy?: string,
      updatedBy?: string
    ) => this;

    return new Constructor(this.createdAt, updatedAt, this.createdBy, updatedBy || this.updatedBy);
  }

  /**
   * Creates a clone with updated timestamps and updater
   */
  touch(updatedBy?: string): this {
    return this.withUpdatedAt(new Date(), updatedBy);
  }

  /**
   * Converts the audit fields to a plain object
   */
  toAuditLog(): {
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
  } {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
    };
  }
}

/**
 * Audit DTO with soft delete support
 * Extends AuditDto with soft delete fields
 */
export abstract class SoftDeleteAuditDto extends AuditDto {
  /**
   * Timestamp when the record was deleted
   * Null if not deleted
   */
  readonly deletedAt?: Date;

  /**
   * ID of the user who deleted the record
   */
  readonly deletedBy?: string;

  constructor(
    createdAt: Date,
    updatedAt: Date,
    createdBy?: string,
    updatedBy?: string,
    deletedAt?: Date,
    deletedBy?: string
  ) {
    super(createdAt, updatedAt, createdBy, updatedBy);
    this.deletedAt = deletedAt;
    this.deletedBy = deletedBy;
  }

  /**
   * Checks if the record is deleted
   */
  isDeleted(): boolean {
    return !!this.deletedAt;
  }

  /**
   * Checks if the record was deleted by a specific user
   */
  isDeletedBy(userId: string): boolean {
    if (!this.deletedBy) {
      return false;
    }
    return this.deletedBy === userId;
  }

  /**
   * Creates a clone with deletion timestamp
   */
  withDeletedAt(deletedAt: Date, deletedBy?: string): this {
    const Constructor = this.constructor as new (
      createdAt: Date,
      updatedAt: Date,
      createdBy?: string,
      updatedBy?: string,
      deletedAt?: Date,
      deletedBy?: string
    ) => this;

    return new Constructor(
      this.createdAt,
      this.updatedAt,
      this.createdBy,
      this.updatedBy,
      deletedAt,
      deletedBy || this.deletedBy
    );
  }

  /**
   * Marks the record as deleted
   */
  delete(deletedBy?: string): this {
    return this.withDeletedAt(new Date(), deletedBy);
  }

  /**
   * Restores the record (removes deletedAt)
   */
  restore(): this {
    const Constructor = this.constructor as new (
      createdAt: Date,
      updatedAt: Date,
      createdBy?: string,
      updatedBy?: string,
      deletedAt?: Date,
      deletedBy?: string
    ) => this;

    return new Constructor(
      this.createdAt,
      this.updatedAt,
      this.createdBy,
      this.updatedBy,
      undefined,
      undefined
    );
  }

  /**
   * Converts the audit fields to a plain object
   */
  toAuditLog(): {
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
  } {
    return {
      ...super.toAuditLog(),
      deletedAt: this.deletedAt,
      deletedBy: this.deletedBy,
    };
  }
}

/**
 * Type for audit fields
 */
export type AuditFields = {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
};
