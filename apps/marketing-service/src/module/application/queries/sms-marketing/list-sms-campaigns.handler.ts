import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSmsCampaignsQuery } from './list-sms-campaigns.query';
import type { SmsMarketingRepository } from '../../../domain/repositories/sms-marketing.repository.interface';
import { SmsCampaignStatusVO } from '../../../domain/value-objects/primitives/sms-campaign-status.vo';

@QueryHandler(ListSmsCampaignsQuery)
export class ListSmsCampaignsHandler
  extends BaseQueryHandler<ListSmsCampaignsQuery, readonly unknown[]>
  implements IQueryHandler<ListSmsCampaignsQuery> {
  readonly queryType = 'marketing.sms.list';
  constructor(private readonly repo: SmsMarketingRepository) { super(); }
  async execute(query: ListSmsCampaignsQuery): Promise<readonly unknown[]> {
    if (!query.status) return [];
    return this.repo.findByStatus(SmsCampaignStatusVO.create(query.status));
  }
}
