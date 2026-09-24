import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Dashboard';

export class DashboardCreatedEvent extends BaseDomainEvent<
  'analytics.dashboard.created',
  { dashboardId: string; name: string }
> {
  constructor(
    aggregateId: string,
    dashboardId: string,
    name: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.dashboard.created',
      aggregateId,
      aggregateType: AGG,
      payload: { dashboardId, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class WidgetAddedEvent extends BaseDomainEvent<
  'analytics.widget.added',
  { dashboardId: string; widgetId: string }
> {
  constructor(
    aggregateId: string,
    dashboardId: string,
    widgetId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.widget.added',
      aggregateId,
      aggregateType: AGG,
      payload: { dashboardId, widgetId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
