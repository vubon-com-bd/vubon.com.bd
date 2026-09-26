/**
 * UserEventStore — Contract for persisting user domain events
 * @module auth-service/domain/event-store
 */
import type { UserId } from '@vubon/shared-types/common';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { UserDomainEvent } from '../events/user.events';

export interface UserEventStore {
  append(event: UserDomainEvent): Promise<void>;
  appendMany(events: readonly UserDomainEvent[]): Promise<void>;
  loadStream(aggregateId: UserId): Promise<readonly DomainEvent[]>;
  loadStreamFrom(
    aggregateId: UserId,
    fromVersion: number,
  ): Promise<readonly DomainEvent[]>;
  streamVersion(aggregateId: UserId): Promise<number>;
}
