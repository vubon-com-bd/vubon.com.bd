import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'SupportAgent';

export class AgentAssignedEvent extends BaseDomainEvent<
  'support.agent.assigned',
  { agentId: string; ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.agent.assigned',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { agentId: aggregateId, ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class AgentStatusChangedEvent extends BaseDomainEvent<
  'support.agent.status.changed',
  { agentId: string; status: string }
> {
  constructor(aggregateId: string, status: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.agent.status.changed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { agentId: aggregateId, status },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
