import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShippingMethodQuery } from './get-shipping-method.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';
@QueryHandler(GetShippingMethodQuery)
export class GetShippingMethodHandler implements IQueryHandler<GetShippingMethodQuery, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(q: GetShippingMethodQuery): Promise<ShippingMethodResponseDTO> { return this.service.getById(q.methodId); }
}
