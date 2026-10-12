/**
 * Dashboard Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class DashboardCreatedEvent extends BaseDomainEvent<'analytics.dashboard.created', {
  readonly dashboardId: string;
  readonly dashboardName: string;
  readonly ownerId: string;
}> {
  constructor(
    dashboardId: string,
    dashboardName: string,
    ownerId: string,
    occurredAt: string
  ) {
    super({
      id: `dashboard-created-${dashboardId}-${Date.now()}`,
      type: 'analytics.dashboard.created',
      aggregateId: dashboardId,
      aggregateType: 'Dashboard',
      payload: { dashboardId, dashboardName, ownerId },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class WidgetAddedEvent extends BaseDomainEvent<'analytics.dashboard.widget_added', {
  readonly dashboardId: string;
  readonly widgetId: string;
}> {
  constructor(
    dashboardId: string,
    widgetId: string,
    occurredAt: string
  ) {
    super({
      id: `widget-added-${widgetId}-${Date.now()}`,
      type: 'analytics.dashboard.widget_added',
      aggregateId: dashboardId,
      aggregateType: 'Dashboard',
      payload: { dashboardId, widgetId },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
