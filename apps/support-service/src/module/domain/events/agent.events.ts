/**
 * Support Agent Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../value-objects/primitives/agent-status.vo';
import { TeamIdVO } from '../value-objects/primitives/team-id.vo';

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

export interface AgentAssignedPayload {
  readonly ticketId?: string;
  readonly teamId?: string;
}

export class AgentAssignedEvent extends BaseDomainEvent<
  'support.agent.assigned',
  AgentAssignedPayload
> {
  constructor(
    id: AgentIdVO,
    occurredAt: number,
    ticketId?: string,
    teamId?: string,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-agent', version, occurredAt),
      type: 'support.agent.assigned',
      payload: { ticketId, teamId },
    });
  }
}

export interface AgentStatusChangedPayload {
  readonly from: string;
  readonly to: string;
}

export class AgentStatusChangedEvent extends BaseDomainEvent<
  'support.agent.status_changed',
  AgentStatusChangedPayload
> {
  constructor(
    id: AgentIdVO,
    from: AgentStatusVO,
    to: AgentStatusVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-agent', version, occurredAt),
      type: 'support.agent.status_changed',
      payload: { from: from.value, to: to.value },
    });
  }
}

export interface AgentJoinedTeamPayload {
  readonly teamId: string;
}

export class AgentJoinedTeamEvent extends BaseDomainEvent<
  'support.agent.joined_team',
  AgentJoinedTeamPayload
> {
  constructor(
    id: AgentIdVO,
    teamId: TeamIdVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-agent', version, occurredAt),
      type: 'support.agent.joined_team',
      payload: { teamId: teamId.value },
    });
  }
}
