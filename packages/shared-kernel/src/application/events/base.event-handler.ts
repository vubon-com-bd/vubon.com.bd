/**
 * Base Application Event Handler
 * @module shared-kernel/application/events
 *
 * Values আসে domain/base/base.event থেকে (type only)।
 */
import type { DomainEvent } from '../../domain/base/base.event';

export abstract class BaseEventHandler<TEvent extends DomainEvent = DomainEvent> {
  abstract readonly eventType: string;
  abstract handle(event: TEvent): Promise<void>;
}
