import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListAvailableVehiclesQuery } from './list-available-vehicles.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleListResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(ListAvailableVehiclesQuery)
export class ListAvailableVehiclesHandler implements IQueryHandler<ListAvailableVehiclesQuery, VehicleListResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(): Promise<VehicleListResponseDTO> { return this.service.listAvailable(); }
}
