import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListOperationalCouriersQuery } from './list-operational-couriers.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierListResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(ListOperationalCouriersQuery)
export class ListOperationalCouriersHandler implements IQueryHandler<ListOperationalCouriersQuery, CourierListResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(): Promise<CourierListResponseDTO> {
    return this.service.listOperational();
  }
}
