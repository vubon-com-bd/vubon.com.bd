import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCourierPublicQuery } from './get-courier-public.query.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierPublicResponseDTO } from '@application/dtos/responses/courier/index.js';

@QueryHandler(GetCourierPublicQuery)
export class GetCourierPublicHandler implements IQueryHandler<GetCourierPublicQuery, CourierPublicResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(q: GetCourierPublicQuery): Promise<CourierPublicResponseDTO> {
    return this.service.getPublicById(q.courierId);
  }
}
