import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Report';

export class ReportGeneratedEvent extends BaseDomainEvent<
  'analytics.report.generated',
  { reportId: string; type: string }
> {
  constructor(
    aggregateId: string,
    reportId: string,
    type: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.report.generated',
      aggregateId,
      aggregateType: AGG,
      payload: { reportId, type },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ReportScheduledEvent extends BaseDomainEvent<
  'analytics.report.scheduled',
  { reportId: string; nextRunAt: string }
> {
  constructor(
    aggregateId: string,
    reportId: string,
    nextRunAt: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.report.scheduled',
      aggregateId,
      aggregateType: AGG,
      payload: { reportId, nextRunAt },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
