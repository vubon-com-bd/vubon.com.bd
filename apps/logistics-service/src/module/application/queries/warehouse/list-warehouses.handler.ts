import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListWarehousesQuery } from './list-warehouses.query.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '../../services/interfaces/warehouse.service.interface.js';
import type { WarehouseListResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';
@QueryHandler(ListWarehousesQuery)
export class ListWarehousesHandler implements IQueryHandler<ListWarehousesQuery, WarehouseListResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(q: ListWarehousesQuery): Promise<WarehouseListResponseDTO> { return this.service.list(q.options); }
}
