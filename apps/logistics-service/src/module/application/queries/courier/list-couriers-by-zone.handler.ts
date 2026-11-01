import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCouriersByZoneQuery } from './list-couriers-by-zone.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierListResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(ListCouriersByZoneQuery)
export class ListCouriersByZoneHandler implements IQueryHandler<ListCouriersByZoneQuery, CourierListResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(q: ListCouriersByZoneQuery): Promise<CourierListResponseDTO> {
    return this.service.listByZone(q.zone);
  }
}
