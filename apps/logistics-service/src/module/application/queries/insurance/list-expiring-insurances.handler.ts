import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListExpiringInsurancesQuery } from './list-expiring-insurances.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceListResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(ListExpiringInsurancesQuery)
export class ListExpiringInsurancesHandler implements IQueryHandler<ListExpiringInsurancesQuery, InsuranceListResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: ListExpiringInsurancesQuery): Promise<InsuranceListResponseDTO> { return this.service.listExpiringWithinDays(q.days); }
}
