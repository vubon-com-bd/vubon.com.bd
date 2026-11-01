import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnShipmentsByUserQuery } from './list-return-shipments-by-user.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentListResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(ListReturnShipmentsByUserQuery)
export class ListReturnShipmentsByUserHandler implements IQueryHandler<ListReturnShipmentsByUserQuery, ReturnShipmentListResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: ListReturnShipmentsByUserQuery): Promise<ReturnShipmentListResponseDTO> { return this.service.listByUser(q.userId); }
}
