import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListUsableShippingMethodsQuery } from './list-usable-shipping-methods.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodListResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(ListUsableShippingMethodsQuery)
export class ListUsableShippingMethodsHandler implements IQueryHandler<ListUsableShippingMethodsQuery, ShippingMethodListResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(): Promise<ShippingMethodListResponseDTO> { return this.service.listUsable(); }
}
