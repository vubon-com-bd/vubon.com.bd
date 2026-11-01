import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnShipmentQuery } from './get-return-shipment.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(GetReturnShipmentQuery)
export class GetReturnShipmentHandler implements IQueryHandler<GetReturnShipmentQuery, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: GetReturnShipmentQuery): Promise<ReturnShipmentResponseDTO> { return this.service.getById(q.returnId); }
}
