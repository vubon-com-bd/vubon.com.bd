import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnByRmaQuery } from './get-return-by-rma.query.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';
@QueryHandler(GetReturnByRmaQuery)
export class GetReturnByRmaHandler implements IQueryHandler<GetReturnByRmaQuery, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(q: GetReturnByRmaQuery): Promise<ReturnShipmentResponseDTO> { return this.service.getByRma(q.rmaNumber); }
}
