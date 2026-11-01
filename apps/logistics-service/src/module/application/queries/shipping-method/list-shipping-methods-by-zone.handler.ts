import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListShippingMethodsByZoneQuery } from './list-shipping-methods-by-zone.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodListResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(ListShippingMethodsByZoneQuery)
export class ListShippingMethodsByZoneHandler implements IQueryHandler<ListShippingMethodsByZoneQuery, ShippingMethodListResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(q: ListShippingMethodsByZoneQuery): Promise<ShippingMethodListResponseDTO> { return this.service.listByZone(q.zone); }
}
