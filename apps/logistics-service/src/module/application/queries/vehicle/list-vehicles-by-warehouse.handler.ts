import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVehiclesByWarehouseQuery } from './list-vehicles-by-warehouse.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleListResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(ListVehiclesByWarehouseQuery)
export class ListVehiclesByWarehouseHandler implements IQueryHandler<ListVehiclesByWarehouseQuery, VehicleListResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(q: ListVehiclesByWarehouseQuery): Promise<VehicleListResponseDTO> { return this.service.listByWarehouse(q.warehouseId); }
}
