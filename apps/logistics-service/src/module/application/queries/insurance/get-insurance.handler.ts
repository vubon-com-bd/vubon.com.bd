import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInsuranceQuery } from './get-insurance.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(GetInsuranceQuery)
export class GetInsuranceHandler implements IQueryHandler<GetInsuranceQuery, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: GetInsuranceQuery): Promise<InsuranceResponseDTO> { return this.service.getById(q.insuranceId); }
}
