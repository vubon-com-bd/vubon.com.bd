/**
 * Event Handler Interface
 * @module shared-kernel/domain/interfaces
 *
 * References domain event (type only)।
 */
import type { DomainEvent } from '../base/base.event';

export interface DomainEventHandler<TEvent extends DomainEvent = DomainEvent> {
  readonly eventType: string;
  handle(event: TEvent): Promise<void>;
}

export interface SyncDomainEventHandler<TEvent extends DomainEvent = DomainEvent> {
  readonly eventType: string;
  handle(event: TEvent): void;
}
