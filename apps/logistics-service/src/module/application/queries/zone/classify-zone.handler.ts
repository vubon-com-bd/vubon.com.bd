import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClassifyZoneQuery } from './classify-zone.query.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@QueryHandler(ClassifyZoneQuery)
export class ClassifyZoneHandler implements IQueryHandler<ClassifyZoneQuery, ZoneResponseDTO | null> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(q: ClassifyZoneQuery): Promise<ZoneResponseDTO | null> { return this.service.classify(q.dto); }
}
