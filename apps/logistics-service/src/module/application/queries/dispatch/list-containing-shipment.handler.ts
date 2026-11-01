import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListContainingShipmentDispatchQuery } from './list-containing-shipment.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchListResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(ListContainingShipmentDispatchQuery)
export class ListContainingShipmentDispatchHandler implements IQueryHandler<ListContainingShipmentDispatchQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListContainingShipmentDispatchQuery): Promise<DispatchListResponseDTO> { return this.service.listContainingShipment(q.shipmentId); }
}
