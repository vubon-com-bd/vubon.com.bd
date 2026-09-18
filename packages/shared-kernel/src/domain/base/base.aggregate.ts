/**
 * Base Aggregate Root
 * @module shared-kernel/domain/base
 *
 * DDD aggregate root — consistency boundary।
 */
import { BaseEntity } from './base.entity';
import type { DomainEvent } from './base.event';

export abstract class AggregateRoot<TId = string> extends BaseEntity<TId> {
  private readonly _domainEvents: DomainEvent[] = [];
  private _version = 0;

  protected constructor(
    id: TId,
    createdAt: BaseEntity<TId>['createdAt'],
    updatedAt: BaseEntity<TId>['updatedAt'],
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
  }

  get version(): number {
    return this._version;
  }

  get domainEvents(): readonly DomainEvent[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  protected clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  protected incrementVersion(): void {
    this._version += 1;
  }

  pullDomainEvents(): readonly DomainEvent[] {
    const events = [...this._domainEvents];
    this.clearDomainEvents();
    return events;
  }
}
