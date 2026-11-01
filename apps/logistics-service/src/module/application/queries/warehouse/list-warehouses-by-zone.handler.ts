import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListWarehousesByZoneQuery } from './list-warehouses-by-zone.query.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseListResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@QueryHandler(ListWarehousesByZoneQuery)
export class ListWarehousesByZoneHandler implements IQueryHandler<ListWarehousesByZoneQuery, WarehouseListResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(q: ListWarehousesByZoneQuery): Promise<WarehouseListResponseDTO> { return this.service.listByZone(q.zone); }
}
