import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShippingMethodsQuery } from './list-shipping-methods.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '../../services/interfaces/shipping-method.service.interface.js';
import type { ShippingMethodListResponseDTO } from '../../dtos/responses/shipping-method/shipping-method-response.dto.js';
@QueryHandler(ListShippingMethodsQuery)
export class ListShippingMethodsHandler implements IQueryHandler<ListShippingMethodsQuery, ShippingMethodListResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(q: ListShippingMethodsQuery): Promise<ShippingMethodListResponseDTO> { return this.service.list(q.options); }
}
