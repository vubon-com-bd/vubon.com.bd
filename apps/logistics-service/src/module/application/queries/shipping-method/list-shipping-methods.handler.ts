import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShippingMethodsQuery } from './list-shipping-methods.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodListResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(ListShippingMethodsQuery)
export class ListShippingMethodsHandler implements IQueryHandler<ListShippingMethodsQuery, ShippingMethodListResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(q: ListShippingMethodsQuery): Promise<ShippingMethodListResponseDTO> { return this.service.list(q.options); }
}
