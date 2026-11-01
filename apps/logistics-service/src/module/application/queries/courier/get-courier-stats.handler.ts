import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCourierStatsQuery } from './get-courier-stats.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierStatsResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(GetCourierStatsQuery)
export class GetCourierStatsHandler implements IQueryHandler<GetCourierStatsQuery, CourierStatsResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(): Promise<CourierStatsResponseDTO> {
    return this.service.getStats();
  }
}
