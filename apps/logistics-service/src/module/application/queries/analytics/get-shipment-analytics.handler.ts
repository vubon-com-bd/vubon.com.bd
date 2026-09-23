import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetShipmentAnalyticsQuery } from './get-shipment-analytics.query';

export interface ShipmentAnalyticsView {
  readonly totalShipments: number;
  readonly deliveredCount: number;
  readonly failedCount: number;
  readonly avgDeliveryTimeHours: number;
}

@QueryHandler(GetShipmentAnalyticsQuery)
export class GetShipmentAnalyticsHandler
  extends BaseQueryHandler<GetShipmentAnalyticsQuery, ShipmentAnalyticsView>
  implements IQueryHandler<GetShipmentAnalyticsQuery>
{
  readonly queryType = 'logistics.analytics.shipment';

  async execute(_query: GetShipmentAnalyticsQuery): Promise<ShipmentAnalyticsView> {
    return { totalShipments: 0, deliveredCount: 0, failedCount: 0, avgDeliveryTimeHours: 0 };
  }
}
