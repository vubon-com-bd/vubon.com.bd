import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInsuranceByShipmentQuery } from './get-insurance-by-shipment.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(GetInsuranceByShipmentQuery)
export class GetInsuranceByShipmentHandler implements IQueryHandler<GetInsuranceByShipmentQuery, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: GetInsuranceByShipmentQuery): Promise<InsuranceResponseDTO> { return this.service.getByShipmentId(q.shipmentId); }
}
