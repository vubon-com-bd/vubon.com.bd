/**
 * Support Team Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../value-objects/primitives/team-name.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

interface MetaFields {
  readonly id: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

const meta = (
  aggregateId: string,
  aggregateType: string,
  version: number,
  occurredAt: number,
): MetaFields => ({
  id: `${aggregateId}-${version}-${occurredAt}`,
  aggregateId,
  aggregateType,
  occurredAt: toTimestamp(occurredAt),
  version,
});

export interface TeamCreatedPayload {
  readonly name: string;
  readonly type: string;
}

export class TeamCreatedEvent extends BaseDomainEvent<
  'support.team.created',
  TeamCreatedPayload
> {
  constructor(
    id: TeamIdVO,
    name: TeamNameVO,
    type: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-team', version, occurredAt),
      type: 'support.team.created',
      payload: { name: name.value, type },
    });
  }
}

export interface TeamMemberAddedPayload {
  readonly agentId: string;
}

export class TeamMemberAddedEvent extends BaseDomainEvent<
  'support.team.member_added',
  TeamMemberAddedPayload
> {
  constructor(
    id: TeamIdVO,
    agentId: AgentIdVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-team', version, occurredAt),
      type: 'support.team.member_added',
      payload: { agentId: agentId.value },
    });
  }
}
