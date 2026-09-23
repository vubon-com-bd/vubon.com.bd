import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDriversQuery } from './list-drivers.query';
import type { DriverRepository } from '../../../domain/repositories/driver.repository.interface';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

@QueryHandler(ListDriversQuery)
export class ListDriversHandler
  extends BaseQueryHandler<ListDriversQuery, readonly DriverResponseDTO[]>
  implements IQueryHandler<ListDriversQuery>
{
  readonly queryType = 'logistics.driver.list';

  constructor(private readonly repo: DriverRepository) {
    super();
  }

  async execute(query: ListDriversQuery): Promise<readonly DriverResponseDTO[]> {
    const entities = query.availableOnly ? await this.repo.findAvailable() : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as DriverResponseDTO));
  }
}
