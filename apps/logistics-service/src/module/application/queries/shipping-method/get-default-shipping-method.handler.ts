import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDefaultShippingMethodQuery } from './get-default-shipping-method.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(GetDefaultShippingMethodQuery)
export class GetDefaultShippingMethodHandler implements IQueryHandler<GetDefaultShippingMethodQuery, ShippingMethodResponseDTO | null> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(): Promise<ShippingMethodResponseDTO | null> { return this.service.getDefault(); }
}
