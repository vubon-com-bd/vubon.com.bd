import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShipmentByNumberQuery } from './get-shipment-by-number.query.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '@application/services/interfaces/shipment.service.interface';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

@QueryHandler(GetShipmentByNumberQuery)
export class GetShipmentByNumberHandler implements IQueryHandler<GetShipmentByNumberQuery, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(q: GetShipmentByNumberQuery): Promise<ShipmentResponseDTO> {
    return this.service.getByNumber(q.shipmentNumber);
  }
}
