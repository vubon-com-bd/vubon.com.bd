import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVehiclesQuery } from './list-vehicles.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleListResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(ListVehiclesQuery)
export class ListVehiclesHandler implements IQueryHandler<ListVehiclesQuery, VehicleListResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(q: ListVehiclesQuery): Promise<VehicleListResponseDTO> { return this.service.list(q.options); }
}
