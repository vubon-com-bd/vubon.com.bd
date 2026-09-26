/**
 * AuthSocialEventStore
 * @module auth-service/domain/event-store
 */
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { AuthSocialDomainEvent } from '../events/auth-social.events';

export interface AuthSocialEventStore {
  append(event: AuthSocialDomainEvent): Promise<void>;
  appendMany(events: readonly AuthSocialDomainEvent[]): Promise<void>;
  loadStream(aggregateId: string): Promise<readonly DomainEvent[]>;
  streamVersion(aggregateId: string): Promise<number>;
}
