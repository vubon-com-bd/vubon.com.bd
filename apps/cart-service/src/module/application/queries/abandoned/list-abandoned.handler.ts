import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAbandonedQuery } from './list-abandoned.query';
import type { AbandonedCartRepository } from '../../../domain/repositories/abandoned-cart.repository.interface';

@QueryHandler(ListAbandonedQuery)
export class ListAbandonedHandler
  extends BaseQueryHandler<ListAbandonedQuery, readonly unknown[]>
  implements IQueryHandler<ListAbandonedQuery>
{
  readonly queryType = 'abandoned.list';

  constructor(
    @Inject('AbandonedCartRepository')
    private readonly repo: AbandonedCartRepository,
  ) { super(); }

  async execute(query: ListAbandonedQuery): Promise<readonly unknown[]> {
    const all = await this.repo.findAll();
    const start = (query.page - 1) * query.limit;
    return all.slice(start, start + query.limit);
  }
}
