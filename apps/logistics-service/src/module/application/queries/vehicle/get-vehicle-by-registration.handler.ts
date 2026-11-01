import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVehicleByRegistrationQuery } from './get-vehicle-by-registration.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(GetVehicleByRegistrationQuery)
export class GetVehicleByRegistrationHandler implements IQueryHandler<GetVehicleByRegistrationQuery, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(q: GetVehicleByRegistrationQuery): Promise<VehicleResponseDTO> { return this.service.getByRegistrationNumber(q.registrationNumber); }
}
