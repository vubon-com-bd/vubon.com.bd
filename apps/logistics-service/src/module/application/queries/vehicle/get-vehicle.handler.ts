import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVehicleQuery } from './get-vehicle.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '../../services/interfaces/vehicle.service.interface.js';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';
@QueryHandler(GetVehicleQuery)
export class GetVehicleHandler implements IQueryHandler<GetVehicleQuery, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(q: GetVehicleQuery): Promise<VehicleResponseDTO> { return this.service.getById(q.vehicleId); }
}
