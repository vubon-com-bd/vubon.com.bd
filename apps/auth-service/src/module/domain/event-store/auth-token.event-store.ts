/**
 * AuthTokenEventStore
 * @module auth-service/domain/event-store
 */
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { AuthTokenDomainEvent } from '../events/auth-token.events';

export interface AuthTokenEventStore {
  append(event: AuthTokenDomainEvent): Promise<void>;
  appendMany(events: readonly AuthTokenDomainEvent[]): Promise<void>;
  loadStream(aggregateId: string): Promise<readonly DomainEvent[]>;
  streamVersion(aggregateId: string): Promise<number>;
}
