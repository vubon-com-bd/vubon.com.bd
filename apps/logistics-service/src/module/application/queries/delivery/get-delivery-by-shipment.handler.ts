import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryByShipmentQuery } from './get-delivery-by-shipment.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '../../services/interfaces/delivery.service.interface.js';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';
@QueryHandler(GetDeliveryByShipmentQuery)
export class GetDeliveryByShipmentHandler implements IQueryHandler<GetDeliveryByShipmentQuery, DeliveryResponseDTO | null> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: GetDeliveryByShipmentQuery): Promise<DeliveryResponseDTO | null> { return this.service.getByShipmentId(q.shipmentId); }
}
