import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetZoneQuery } from './get-zone.query.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@QueryHandler(GetZoneQuery)
export class GetZoneHandler implements IQueryHandler<GetZoneQuery, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(q: GetZoneQuery): Promise<ZoneResponseDTO> { return this.service.getById(q.zoneId); }
}
