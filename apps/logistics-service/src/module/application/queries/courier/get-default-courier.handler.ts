import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDefaultCourierQuery } from './get-default-courier.query.js';
import { COURIER_SERVICE, type ICourierService } from '../../services/interfaces/courier.service.interface.js';
import type { CourierResponseDTO } from '../../dtos/responses/courier/courier-response.dto.js';

@QueryHandler(GetDefaultCourierQuery)
export class GetDefaultCourierHandler implements IQueryHandler<GetDefaultCourierQuery, CourierResponseDTO | null> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(_q: GetDefaultCourierQuery): Promise<CourierResponseDTO | null> { return this.service.getDefault(); }
}
