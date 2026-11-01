import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListClaimableInsurancesQuery } from './list-claimable-insurances.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceListResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(ListClaimableInsurancesQuery)
export class ListClaimableInsurancesHandler implements IQueryHandler<ListClaimableInsurancesQuery, InsuranceListResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(): Promise<InsuranceListResponseDTO> { return this.service.listClaimable(); }
}
