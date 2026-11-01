/**
 * Entity Types
 * @module shared-kernel/domain/types
 *
 * Values আসে shared-types/common/primitives থেকে (type only)।
 */
import type { Timestamp, Branded } from '@vubon/shared-types/common';

export type EntityId<TName extends string> = Branded<string, TName>;

export interface EntitySnapshot<TId = string> {
  readonly id: TId;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface EntityChange<TField = string> {
  readonly field: TField;
  readonly previous: unknown;
  readonly current: unknown;
  readonly changedAt: Timestamp;
}

export interface EntityMetadata {
  readonly createdBy?: string;
  readonly updatedBy?: string;
  readonly deletedBy?: string;
}
