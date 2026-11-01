import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetWarehouseStatsQuery } from './get-warehouse-stats.query.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseStatsResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@QueryHandler(GetWarehouseStatsQuery)
export class GetWarehouseStatsHandler implements IQueryHandler<GetWarehouseStatsQuery, WarehouseStatsResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(): Promise<WarehouseStatsResponseDTO> { return this.service.getStats(); }
}
