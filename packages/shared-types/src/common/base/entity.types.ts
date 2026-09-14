/**
 * Base Entity Types
 * @module shared-types/common/base
 *
 * সব entity-এর foundation।
 */

export interface BaseEntity<TId = string> {
  readonly id: TId;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export interface AuditableEntity<TId = string> extends BaseEntity<TId> {
  readonly createdBy?: string;
  readonly updatedBy?: string;
  readonly deletedBy?: string;
}

export interface VersionedEntity<TId = string> extends BaseEntity<TId> {
  readonly version: number;
}

export interface SoftDeleteEntity<TId = string> extends BaseEntity<TId> {
  readonly deletedAt: string | null;
  readonly isDeleted: boolean;
}

export type EntityStatus = 'active' | 'inactive' | 'pending' | 'deleted';
