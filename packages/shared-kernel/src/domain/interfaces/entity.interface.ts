/**
 * Entity Interface
 * @module shared-kernel/domain/interfaces
 *
 * References base entity (type only)।
 */
import type { BaseEntity } from '../base/base.entity';

export type EntityShape<TId = string> = BaseEntity<TId>;

export interface EntityMarker<TId = string> {
  readonly id: TId;
  equals(other: EntityMarker<TId>): boolean;
}
