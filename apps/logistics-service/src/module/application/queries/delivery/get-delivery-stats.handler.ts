import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryStatsQuery } from './get-delivery-stats.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryStatsResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(GetDeliveryStatsQuery)
export class GetDeliveryStatsHandler implements IQueryHandler<GetDeliveryStatsQuery, DeliveryStatsResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: GetDeliveryStatsQuery): Promise<DeliveryStatsResponseDTO> {
    return this.service.getStats(q.driverId, q.fromDate, q.toDate);
  }
}
