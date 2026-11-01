import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCourierQuery } from './get-courier.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(GetCourierQuery)
export class GetCourierHandler implements IQueryHandler<GetCourierQuery, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(q: GetCourierQuery): Promise<CourierResponseDTO> {
    return this.service.getById(q.courierId);
  }
}
