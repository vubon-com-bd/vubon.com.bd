import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDefaultCourierQuery } from './get-default-courier.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(GetDefaultCourierQuery)
export class GetDefaultCourierHandler implements IQueryHandler<GetDefaultCourierQuery, CourierResponseDTO | null> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(): Promise<CourierResponseDTO | null> {
    return this.service.getDefault();
  }
}
