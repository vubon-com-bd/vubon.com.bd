import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListZonesByParentQuery } from './list-zones-by-parent.query.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneListResponseDTO } from '@application/dtos/responses/zone/index.js';

@QueryHandler(ListZonesByParentQuery)
export class ListZonesByParentHandler implements IQueryHandler<ListZonesByParentQuery, ZoneListResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(q: ListZonesByParentQuery): Promise<ZoneListResponseDTO> { return this.service.listByParent(q.parentId); }
}
