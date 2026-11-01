import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVehiclesByDriverQuery } from './list-vehicles-by-driver.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleListResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(ListVehiclesByDriverQuery)
export class ListVehiclesByDriverHandler implements IQueryHandler<ListVehiclesByDriverQuery, VehicleListResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(q: ListVehiclesByDriverQuery): Promise<VehicleListResponseDTO> { return this.service.listByDriver(q.driverId); }
}
