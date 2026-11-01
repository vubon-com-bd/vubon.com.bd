import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnShipmentByRmaQuery } from './get-return-shipment-by-rma.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@QueryHandler(GetReturnShipmentByRmaQuery)
export class GetReturnShipmentByRmaHandler implements IQueryHandler<GetReturnShipmentByRmaQuery, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: GetReturnShipmentByRmaQuery): Promise<ReturnShipmentResponseDTO> { return this.service.getByRma(q.rmaNumber); }
}
