import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDriversByWarehouseQuery } from './list-drivers-by-warehouse.query.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverListResponseDTO } from '@application/dtos/responses/driver/index.js';

@QueryHandler(ListDriversByWarehouseQuery)
export class ListDriversByWarehouseHandler implements IQueryHandler<ListDriversByWarehouseQuery, DriverListResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(q: ListDriversByWarehouseQuery): Promise<DriverListResponseDTO> { return this.service.listByWarehouse(q.warehouseId); }
}
