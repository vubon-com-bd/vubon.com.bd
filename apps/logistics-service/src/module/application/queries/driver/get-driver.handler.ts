import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDriverQuery } from './get-driver.query';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.interface';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

@QueryHandler(GetDriverQuery)
export class GetDriverHandler
  extends BaseQueryHandler<GetDriverQuery, DriverResponseDTO | null>
  implements IQueryHandler<GetDriverQuery>
{
  readonly queryType = 'logistics.driver.get';

  constructor(private readonly repo: DriverRepository) {
    super();
  }

  async execute(query: GetDriverQuery): Promise<DriverResponseDTO | null> {
    const entity = await this.repo.findById(DriverIdVO.create(query.driverId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as DriverResponseDTO;
  }
}
