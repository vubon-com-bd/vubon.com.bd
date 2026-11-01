import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShippingMethodByCodeQuery } from './get-shipping-method-by-code.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(GetShippingMethodByCodeQuery)
export class GetShippingMethodByCodeHandler implements IQueryHandler<GetShippingMethodByCodeQuery, ShippingMethodResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(q: GetShippingMethodByCodeQuery): Promise<ShippingMethodResponseDTO> { return this.service.getByCode(q.code); }
}
