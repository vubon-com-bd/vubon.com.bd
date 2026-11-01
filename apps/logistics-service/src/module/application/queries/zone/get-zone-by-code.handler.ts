import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetZoneByCodeQuery } from './get-zone-by-code.query.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@QueryHandler(GetZoneByCodeQuery)
export class GetZoneByCodeHandler implements IQueryHandler<GetZoneByCodeQuery, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(q: GetZoneByCodeQuery): Promise<ZoneResponseDTO> { return this.service.getByCode(q.code); }
}
