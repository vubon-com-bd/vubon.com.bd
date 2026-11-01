import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCourierByCodeQuery } from './get-courier-by-code.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(GetCourierByCodeQuery)
export class GetCourierByCodeHandler implements IQueryHandler<GetCourierByCodeQuery, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(q: GetCourierByCodeQuery): Promise<CourierResponseDTO> {
    return this.service.getByCode(q.code);
  }
}
