import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetZoneStatsQuery } from './get-zone-stats.query.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneStatsResponseDTO } from '@application/dtos/responses/zone/index.js';

@QueryHandler(GetZoneStatsQuery)
export class GetZoneStatsHandler implements IQueryHandler<GetZoneStatsQuery, ZoneStatsResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(): Promise<ZoneStatsResponseDTO> { return this.service.getStats(); }
}
