import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListActiveZonesQuery } from './list-active-zones.query.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneListResponseDTO } from '@application/dtos/responses/zone/index.js';

@QueryHandler(ListActiveZonesQuery)
export class ListActiveZonesHandler implements IQueryHandler<ListActiveZonesQuery, ZoneListResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(): Promise<ZoneListResponseDTO> { return this.service.listActive(); }
}
