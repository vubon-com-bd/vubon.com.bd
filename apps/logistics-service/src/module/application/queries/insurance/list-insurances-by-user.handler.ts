import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInsurancesByUserQuery } from './list-insurances-by-user.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceListResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(ListInsurancesByUserQuery)
export class ListInsurancesByUserHandler implements IQueryHandler<ListInsurancesByUserQuery, InsuranceListResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: ListInsurancesByUserQuery): Promise<InsuranceListResponseDTO> { return this.service.listByUser(q.userId); }
}
