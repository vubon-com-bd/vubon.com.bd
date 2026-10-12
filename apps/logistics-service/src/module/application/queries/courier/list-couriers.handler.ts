import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCouriersQuery } from './list-couriers.query.js';
import { COURIER_SERVICE, type ICourierService } from '../../services/interfaces/courier.service.interface.js';
import type { CourierListResponseDTO } from '../../dtos/responses/courier/courier-response.dto.js';

@QueryHandler(ListCouriersQuery)
export class ListCouriersHandler implements IQueryHandler<ListCouriersQuery, CourierListResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(q: ListCouriersQuery): Promise<CourierListResponseDTO> { return this.service.list(q.options); }
}
