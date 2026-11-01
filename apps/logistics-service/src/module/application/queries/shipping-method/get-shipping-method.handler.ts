import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShippingMethodQuery } from './get-shipping-method.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(GetShippingMethodQuery)
export class GetShippingMethodHandler implements IQueryHandler<GetShippingMethodQuery, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(q: GetShippingMethodQuery): Promise<ShippingMethodResponseDTO> { return this.service.getById(q.methodId); }
}
