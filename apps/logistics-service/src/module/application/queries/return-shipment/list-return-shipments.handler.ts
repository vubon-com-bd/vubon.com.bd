import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnShipmentsQuery } from './list-return-shipments.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentListResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(ListReturnShipmentsQuery)
export class ListReturnShipmentsHandler implements IQueryHandler<ListReturnShipmentsQuery, ReturnShipmentListResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: ListReturnShipmentsQuery): Promise<ReturnShipmentListResponseDTO> { return this.service.list(q.options); }
}
