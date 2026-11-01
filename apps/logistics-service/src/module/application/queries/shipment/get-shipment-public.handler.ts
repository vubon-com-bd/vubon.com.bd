import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentPublicQuery } from './get-shipment-public.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentPublicResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(GetShipmentPublicQuery)
export class GetShipmentPublicHandler implements IQueryHandler<GetShipmentPublicQuery, ShipmentPublicResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentPublicQuery): Promise<ShipmentPublicResponseDTO> {
    return this.service.getPublicById(q.shipmentId);
  }
}
