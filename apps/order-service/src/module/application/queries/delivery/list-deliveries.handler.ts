/**
 * ListDeliveriesHandler
 * @module order-service/application/queries/delivery
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDeliveriesQuery } from './list-deliveries.query.js';
import {
  DELIVERY_SERVICE,
  type IDeliveryService,
} from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryListResponseDTO } from '../../dtos/responses/delivery-response.dto.js';

@QueryHandler(ListDeliveriesQuery)
export class ListDeliveriesHandler
  implements IQueryHandler<ListDeliveriesQuery, DeliveryListResponseDTO>
{
  constructor(
    @Inject(DELIVERY_SERVICE)
    private readonly service: IDeliveryService,
  ) {}

  async execute(q: ListDeliveriesQuery): Promise<DeliveryListResponseDTO> {
    return this.service.list(q.options);
  }
}
