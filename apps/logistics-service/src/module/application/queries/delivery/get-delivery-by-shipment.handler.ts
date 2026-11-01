import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryByShipmentQuery } from './get-delivery-by-shipment.query.js';
import { DELIVERY_SERVICE, type IDeliveryService } from '@application/services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery/index.js';

@QueryHandler(GetDeliveryByShipmentQuery)
export class GetDeliveryByShipmentHandler implements IQueryHandler<GetDeliveryByShipmentQuery, DeliveryResponseDTO> {
  constructor(@Inject(DELIVERY_SERVICE) private readonly service: IDeliveryService) {}
  async execute(q: GetDeliveryByShipmentQuery): Promise<DeliveryResponseDTO> {
    return this.service.getByShipmentId(q.shipmentId);
  }
}
