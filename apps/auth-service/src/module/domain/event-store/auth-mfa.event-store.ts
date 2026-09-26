/**
 * AuthMfaEventStore
 * @module auth-service/domain/event-store
 */
import type { UserId } from '@vubon/shared-types/common';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { AuthMfaDomainEvent } from '../events/auth-mfa.events';

export interface AuthMfaEventStore {
  append(event: AuthMfaDomainEvent): Promise<void>;
  appendMany(events: readonly AuthMfaDomainEvent[]): Promise<void>;
  loadStream(aggregateId: UserId): Promise<readonly DomainEvent[]>;
  streamVersion(aggregateId: UserId): Promise<number>;
}
