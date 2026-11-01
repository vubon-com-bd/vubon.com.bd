import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVehicleStatsQuery } from './get-vehicle-stats.query.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleStatsResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@QueryHandler(GetVehicleStatsQuery)
export class GetVehicleStatsHandler implements IQueryHandler<GetVehicleStatsQuery, VehicleStatsResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(): Promise<VehicleStatsResponseDTO> { return this.service.getStats(); }
}
