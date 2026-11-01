import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInsuranceStatsQuery } from './get-insurance-stats.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceStatsResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(GetInsuranceStatsQuery)
export class GetInsuranceStatsHandler implements IQueryHandler<GetInsuranceStatsQuery, InsuranceStatsResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(): Promise<InsuranceStatsResponseDTO> { return this.service.getStats(); }
}
