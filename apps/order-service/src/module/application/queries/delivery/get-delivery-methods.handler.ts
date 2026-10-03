import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryMethodsQuery } from './get-delivery-methods.query.js';
import { DELIVERY_METHOD_SERVICE, type IDeliveryMethodService } from '../../services/interfaces/delivery-method.service.interface.js';
import type { DeliveryMethodResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@QueryHandler(GetDeliveryMethodsQuery)
export class GetDeliveryMethodsHandler implements IQueryHandler<GetDeliveryMethodsQuery, readonly DeliveryMethodResponseDTO[]> {
  constructor(@Inject(DELIVERY_METHOD_SERVICE) private readonly service: IDeliveryMethodService) {}
  async execute(q: GetDeliveryMethodsQuery): Promise<readonly DeliveryMethodResponseDTO[]> {
    return q.onlyActive ? this.service.listActive() : this.service.listAll();
  }
}
