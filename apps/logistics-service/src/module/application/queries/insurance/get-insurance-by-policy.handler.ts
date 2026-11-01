import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInsuranceByPolicyQuery } from './get-insurance-by-policy.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(GetInsuranceByPolicyQuery)
export class GetInsuranceByPolicyHandler implements IQueryHandler<GetInsuranceByPolicyQuery, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: GetInsuranceByPolicyQuery): Promise<InsuranceResponseDTO> { return this.service.getByPolicyNumber(q.policyNumber); }
}
