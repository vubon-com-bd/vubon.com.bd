/**
 * Base Entity
 * @module shared-kernel/domain/base
 *
 * Values আসে shared-types/common/base থেকে (type only)।
 *
 * ⚠️ Note: shared-types-এর BaseEntity<TId> implement করা হয়েছে,
 * তাই createdAt/updatedAt string (ISO 8601)।
 */
import type { BaseEntity as BaseEntityType } from '@vubon/shared-types/common';

export abstract class BaseEntity<TId = string> implements BaseEntityType<TId> {
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly deletedAt?: string | null;

  protected constructor(
    public readonly id: TId,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string | null
  ) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  equals(other: BaseEntity<TId>): boolean {
    if (other === null || other === undefined) return false;
    if (!(other instanceof BaseEntity)) return false;
    return this.id === other.id;
  }

  is(id: TId): boolean {
    return this.id === id;
  }

  isDeleted(): boolean {
    return this.deletedAt !== null && this.deletedAt !== undefined;
  }

  toJSON(): Readonly<Record<string, unknown>> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export type EntityIdOf<T extends BaseEntity> = T extends BaseEntity<infer TId> ? TId : never;
