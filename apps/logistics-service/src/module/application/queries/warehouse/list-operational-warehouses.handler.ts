import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOperationalWarehousesQuery } from './list-operational-warehouses.query.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseListResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@QueryHandler(ListOperationalWarehousesQuery)
export class ListOperationalWarehousesHandler implements IQueryHandler<ListOperationalWarehousesQuery, WarehouseListResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(): Promise<WarehouseListResponseDTO> { return this.service.listOperational(); }
}
