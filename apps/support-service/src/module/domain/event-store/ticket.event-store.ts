/**
 * TicketEventStore — Event sourcing store for ticket aggregate
 * @module support-service/domain/event-store
 *
 * Registry: extends BaseEventStore
 * Rules: append-only, stream per aggregate id
 * Note: aggregateId is always string at persistence boundary (VO → .value)
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type {
  DomainEvent,
  EventEnvelope,
} from '@vubon/shared-kernel/domain/base/base.event';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface TicketEventStore extends BaseEventStore {
  getEvents(ticketId: TicketIdVO): Promise<readonly DomainEvent[]>;
  saveEvents(
    ticketId: TicketIdVO,
    events: readonly DomainEvent[],
    expectedVersion?: number,
  ): Promise<void>;
  getVersionForTicket(ticketId: TicketIdVO): Promise<number>;
  existsForTicket(ticketId: TicketIdVO): Promise<boolean>;
  loadStreamForTicket(
    ticketId: TicketIdVO,
    fromVersion?: number,
  ): Promise<readonly EventEnvelope[]>;
}
