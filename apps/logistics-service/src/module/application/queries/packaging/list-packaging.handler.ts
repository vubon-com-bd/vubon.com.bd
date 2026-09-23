import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPackagingQuery } from './list-packaging.query';
import type { PackagingRepository } from '../../../domain/repositories/packaging.repository.interface';
import type { PackagingEntity } from '../../../domain/entities/packaging.entity';

@QueryHandler(ListPackagingQuery)
export class ListPackagingHandler
  extends BaseQueryHandler<ListPackagingQuery, readonly PackagingEntity[]>
  implements IQueryHandler<ListPackagingQuery>
{
  readonly queryType = 'logistics.packaging.list';

  constructor(private readonly repo: PackagingRepository) {
    super();
  }

  async execute(query: ListPackagingQuery): Promise<readonly PackagingEntity[]> {
    return query.packagingType ? this.repo.findByType(query.packagingType) : this.repo.findAvailable();
  }
}
