import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetShipmentStatsQuery } from './get-shipment-stats.query';

export interface ShipmentStatsView {
  readonly total: number;
  readonly pending: number;
  readonly inTransit: number;
  readonly delivered: number;
}

@QueryHandler(GetShipmentStatsQuery)
export class GetShipmentStatsHandler
  extends BaseQueryHandler<GetShipmentStatsQuery, ShipmentStatsView>
  implements IQueryHandler<GetShipmentStatsQuery>
{
  readonly queryType = 'logistics.shipment.get-stats';

  async execute(_query: GetShipmentStatsQuery): Promise<ShipmentStatsView> {
    return { total: 0, pending: 0, inTransit: 0, delivered: 0 };
  }
}
