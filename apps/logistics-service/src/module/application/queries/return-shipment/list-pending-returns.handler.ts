import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPendingReturnsQuery } from './list-pending-returns.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentListResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(ListPendingReturnsQuery)
export class ListPendingReturnsHandler implements IQueryHandler<ListPendingReturnsQuery, ReturnShipmentListResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(): Promise<ReturnShipmentListResponseDTO> { return this.service.listPendingApproval(); }
}
