import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListZonesQuery } from './list-zones.query.js';
import { ZONE_SERVICE, type IZoneService } from '../../services/interfaces/zone.service.interface.js';
import type { ZoneListResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';
@QueryHandler(ListZonesQuery)
export class ListZonesHandler implements IQueryHandler<ListZonesQuery, ZoneListResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(q: ListZonesQuery): Promise<ZoneListResponseDTO> { return this.service.list(q.options); }
}
