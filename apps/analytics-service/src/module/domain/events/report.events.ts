/**
 * Report Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class ReportGeneratedEvent extends BaseDomainEvent<'analytics.report.generated', {
  readonly reportId: string;
  readonly format: string;
  readonly rowCount: number;
}> {
  constructor(
    reportId: string,
    format: string,
    rowCount: number,
    occurredAt: string
  ) {
    super({
      id: `report-generated-${reportId}-${Date.now()}`,
      type: 'analytics.report.generated',
      aggregateId: reportId,
      aggregateType: 'Report',
      payload: { reportId, format, rowCount },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class ReportScheduledEvent extends BaseDomainEvent<'analytics.report.scheduled', {
  readonly reportId: string;
  readonly frequency: string;
  readonly nextRunAt: string;
}> {
  constructor(
    reportId: string,
    frequency: string,
    nextRunAt: string,
    occurredAt: string
  ) {
    super({
      id: `report-scheduled-${reportId}-${Date.now()}`,
      type: 'analytics.report.scheduled',
      aggregateId: reportId,
      aggregateType: 'Report',
      payload: { reportId, frequency, nextRunAt },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}
