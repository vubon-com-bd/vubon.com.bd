import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShippingMethodStatsQuery } from './get-shipping-method-stats.query.js';
import { SHIPPING_METHOD_SERVICE, type IShippingMethodService } from '@application/services/interfaces/shipping-method.service.interface';
import type { ShippingMethodStatsResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

@QueryHandler(GetShippingMethodStatsQuery)
export class GetShippingMethodStatsHandler implements IQueryHandler<GetShippingMethodStatsQuery, ShippingMethodStatsResponseDTO> {
  constructor(@Inject(SHIPPING_METHOD_SERVICE) private readonly service: IShippingMethodService) {}
  async execute(): Promise<ShippingMethodStatsResponseDTO> { return this.service.getStats(); }
}
