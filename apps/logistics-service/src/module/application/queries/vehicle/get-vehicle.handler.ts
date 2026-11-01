import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVehicleQuery } from './get-vehicle.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(GetVehicleQuery)
export class GetVehicleHandler implements IQueryHandler<GetVehicleQuery, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(q: GetVehicleQuery): Promise<VehicleResponseDTO> { return this.service.getById(q.vehicleId); }
}
