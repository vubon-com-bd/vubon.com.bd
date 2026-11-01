import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDriverStatsQuery } from './get-driver-stats.query.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverStatsResponseDTO } from '@application/dtos/responses/driver/index.js';

@QueryHandler(GetDriverStatsQuery)
export class GetDriverStatsHandler implements IQueryHandler<GetDriverStatsQuery, DriverStatsResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(): Promise<DriverStatsResponseDTO> { return this.service.getStats(); }
}
