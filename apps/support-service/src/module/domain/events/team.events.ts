import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'SupportTeam';

export class TeamCreatedEvent extends BaseDomainEvent<
  'support.team.created',
  { teamId: string; name: string }
> {
  constructor(aggregateId: string, name: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.team.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { teamId: aggregateId, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TeamMemberAddedEvent extends BaseDomainEvent<
  'support.team.member.added',
  { teamId: string; agentId: string }
> {
  constructor(aggregateId: string, agentId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.team.member.added',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { teamId: aggregateId, agentId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
