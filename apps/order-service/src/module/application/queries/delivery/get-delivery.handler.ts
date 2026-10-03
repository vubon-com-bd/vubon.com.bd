import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryQuery } from './get-delivery.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@QueryHandler(GetDeliveryQuery)
export class GetDeliveryHandler implements IQueryHandler<GetDeliveryQuery, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: GetDeliveryQuery): Promise<DeliveryResponseDTO> {
    return this.service.getById(q.deliveryId);
  }
}
