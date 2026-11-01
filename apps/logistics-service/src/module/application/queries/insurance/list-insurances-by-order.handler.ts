import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInsurancesByOrderQuery } from './list-insurances-by-order.query.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceListResponseDTO } from '@application/dtos/responses/insurance/index.js';

@QueryHandler(ListInsurancesByOrderQuery)
export class ListInsurancesByOrderHandler implements IQueryHandler<ListInsurancesByOrderQuery, InsuranceListResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(q: ListInsurancesByOrderQuery): Promise<InsuranceListResponseDTO> { return this.service.listByOrder(q.orderId); }
}
