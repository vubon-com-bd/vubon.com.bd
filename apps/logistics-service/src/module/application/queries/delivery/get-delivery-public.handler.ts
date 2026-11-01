import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryPublicQuery } from './get-delivery-public.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryPublicResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(GetDeliveryPublicQuery)
export class GetDeliveryPublicHandler implements IQueryHandler<GetDeliveryPublicQuery, DeliveryPublicResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: GetDeliveryPublicQuery): Promise<DeliveryPublicResponseDTO> {
    return this.service.getPublicById(q.deliveryId);
  }
}
