import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnShipmentStatsQuery } from './get-return-shipment-stats.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentStatsResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(GetReturnShipmentStatsQuery)
export class GetReturnShipmentStatsHandler implements IQueryHandler<GetReturnShipmentStatsQuery, ReturnShipmentStatsResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(): Promise<ReturnShipmentStatsResponseDTO> { return this.service.getStats(); }
}
