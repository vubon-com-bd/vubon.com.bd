import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnShipmentsByOrderQuery } from './list-return-shipments-by-order.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentListResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(ListReturnShipmentsByOrderQuery)
export class ListReturnShipmentsByOrderHandler implements IQueryHandler<ListReturnShipmentsByOrderQuery, ReturnShipmentListResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: ListReturnShipmentsByOrderQuery): Promise<ReturnShipmentListResponseDTO> { return this.service.listByOrder(q.orderId); }
}
