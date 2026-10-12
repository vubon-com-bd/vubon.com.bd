import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetWarehouseQuery } from './get-warehouse.query.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '../../services/interfaces/warehouse.service.interface.js';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';
@QueryHandler(GetWarehouseQuery)
export class GetWarehouseHandler implements IQueryHandler<GetWarehouseQuery, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(q: GetWarehouseQuery): Promise<WarehouseResponseDTO> { return this.service.getById(q.warehouseId); }
}
