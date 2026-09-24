import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Complaint';

export class ComplaintReceivedEvent extends BaseDomainEvent<
  'support.complaint.received',
  { complaintId: string; userId: string; severity: string }
> {
  constructor(aggregateId: string, userId: string, severity: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.complaint.received',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { complaintId: aggregateId, userId, severity },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ComplaintResolvedEvent extends BaseDomainEvent<
  'support.complaint.resolved',
  { complaintId: string }
> {
  constructor(aggregateId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.complaint.resolved',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { complaintId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
