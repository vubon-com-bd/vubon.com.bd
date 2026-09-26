import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { AuditSeoQuery } from './audit-seo.query';
import type { SeoMarketingServiceInterface } from '../../services/interfaces/seo-marketing.service.interface';

@QueryHandler(AuditSeoQuery)
export class AuditSeoHandler
  extends BaseQueryHandler<AuditSeoQuery, number>
  implements IQueryHandler<AuditSeoQuery> {
  readonly queryType = 'marketing.seo.audit';
  constructor(private readonly service: SeoMarketingServiceInterface) { super(); }
  async execute(query: AuditSeoQuery): Promise<number> {
    return this.service.audit(query.pageUrl);
  }
}
