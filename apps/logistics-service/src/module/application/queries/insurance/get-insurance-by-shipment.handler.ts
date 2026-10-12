import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInsuranceByShipmentQuery } from './get-insurance-by-shipment.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';
@QueryHandler(GetInsuranceByShipmentQuery)
export class GetInsuranceByShipmentHandler implements IQueryHandler<GetInsuranceByShipmentQuery, InsuranceResponseDTO | null> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: GetInsuranceByShipmentQuery): Promise<InsuranceResponseDTO | null> { return this.service.getByShipmentId(q.shipmentId); }
}
