import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnShipmentsQuery } from './list-return-shipments.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentListResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';
@QueryHandler(ListReturnShipmentsQuery)
export class ListReturnShipmentsHandler implements IQueryHandler<ListReturnShipmentsQuery, ReturnShipmentListResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: ListReturnShipmentsQuery): Promise<ReturnShipmentListResponseDTO> { return this.service.list(q.options); }
}
