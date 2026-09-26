import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetInsuranceQuery } from './get-insurance.query';
import type { InsuranceRepository } from '../../../domain/repositories/insurance.repository.interface';
import { InsuranceIdVO } from '../../../domain/value-objects/primitives/insurance-id.vo';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

@QueryHandler(GetInsuranceQuery)
export class GetInsuranceHandler
  extends BaseQueryHandler<GetInsuranceQuery, InsuranceResponseDTO | null>
  implements IQueryHandler<GetInsuranceQuery>
{
  readonly queryType = 'logistics.insurance.get';

  constructor(private readonly repo: InsuranceRepository) {
    super();
  }

  async execute(query: GetInsuranceQuery): Promise<InsuranceResponseDTO | null> {
    const entity = await this.repo.findById(InsuranceIdVO.create(query.insuranceId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as InsuranceResponseDTO;
  }
}
