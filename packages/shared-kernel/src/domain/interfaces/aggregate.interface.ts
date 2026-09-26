/**
 * Aggregate Interface
 * @module shared-kernel/domain/interfaces
 *
 * References base aggregate root (type only)।
 */
import type { AggregateRoot } from '../base/base.aggregate';
import type { DomainEvent } from '../base/base.event';

export interface AggregateMarker<TId = string> {
  readonly id: TId;
  readonly version: number;
}

export type AggregateShape<TId = string> = AggregateRoot<TId>;

export interface AggregateWithEvents<TId = string> {
  readonly id: TId;
  readonly version: number;
  pullDomainEvents(): readonly DomainEvent[];
}
