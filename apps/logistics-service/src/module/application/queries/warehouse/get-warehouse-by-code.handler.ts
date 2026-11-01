import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetWarehouseByCodeQuery } from './get-warehouse-by-code.query.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@QueryHandler(GetWarehouseByCodeQuery)
export class GetWarehouseByCodeHandler implements IQueryHandler<GetWarehouseByCodeQuery, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(q: GetWarehouseByCodeQuery): Promise<WarehouseResponseDTO> { return this.service.getByCode(q.code); }
}
