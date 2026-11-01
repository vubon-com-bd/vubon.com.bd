import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInsurancesQuery } from './list-insurances.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceListResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(ListInsurancesQuery)
export class ListInsurancesHandler implements IQueryHandler<ListInsurancesQuery, InsuranceListResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: ListInsurancesQuery): Promise<InsuranceListResponseDTO> { return this.service.list(q.options); }
}
