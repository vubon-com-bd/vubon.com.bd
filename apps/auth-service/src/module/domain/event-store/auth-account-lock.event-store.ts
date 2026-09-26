/**
 * AuthAccountLockEventStore
 * @module auth-service/domain/event-store
 */
import type { UserId } from '@vubon/shared-types/common';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { AuthAccountLockDomainEvent } from '../events/auth-account-lock.events';

export interface AuthAccountLockEventStore {
  append(event: AuthAccountLockDomainEvent): Promise<void>;
  appendMany(events: readonly AuthAccountLockDomainEvent[]): Promise<void>;
  loadStream(aggregateId: UserId): Promise<readonly DomainEvent[]>;
  streamVersion(aggregateId: UserId): Promise<number>;
}
