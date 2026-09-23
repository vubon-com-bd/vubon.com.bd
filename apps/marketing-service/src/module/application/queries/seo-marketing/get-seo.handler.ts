import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSeoQuery } from './get-seo.query';
import type { SeoMarketingRepository } from '../../../domain/repositories/seo-marketing.repository.interface';

@QueryHandler(GetSeoQuery)
export class GetSeoHandler
  extends BaseQueryHandler<GetSeoQuery, unknown | null>
  implements IQueryHandler<GetSeoQuery> {
  readonly queryType = 'marketing.seo.get';
  constructor(private readonly repo: SeoMarketingRepository) { super(); }
  async execute(query: GetSeoQuery): Promise<unknown | null> {
    return this.repo.findByPageUrl(query.pageUrl);
  }
}
