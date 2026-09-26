/**
 * AuthSessionEventStore
 * @module auth-service/domain/event-store
 */
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { AuthSessionDomainEvent } from '../events/auth-session.events';

export interface AuthSessionEventStore {
  append(event: AuthSessionDomainEvent): Promise<void>;
  appendMany(events: readonly AuthSessionDomainEvent[]): Promise<void>;
  loadStream(aggregateId: string): Promise<readonly DomainEvent[]>;
  streamVersion(aggregateId: string): Promise<number>;
}
