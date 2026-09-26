/**
 * Aggregate Root Types
 * @module shared-types/common/base
 *
 * DDD aggregate root — consistency boundary।
 */

import type { DomainEvent } from './domain-event.types';

export interface AggregateRoot<TId = string> {
  readonly id: TId;
  readonly version: number;
  readonly events: readonly DomainEvent[];
}

export interface SnapshotAggregate<TId = string, TSnapshot = unknown> extends AggregateRoot<TId> {
  takeSnapshot(): TSnapshot;
}

export interface AggregateMetadata {
  readonly version: number;
  readonly lastModified: string;
  readonly lastModifiedBy?: string;
}
