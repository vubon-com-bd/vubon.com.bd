import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSmsCampaignQuery } from './get-sms-campaign.query';
import type { SmsMarketingRepository } from '../../../domain/repositories/sms-marketing.repository.interface';
import { SmsMarketingIdVO } from '../../../domain/value-objects/primitives/sms-marketing-id.vo';

@QueryHandler(GetSmsCampaignQuery)
export class GetSmsCampaignHandler
  extends BaseQueryHandler<GetSmsCampaignQuery, unknown | null>
  implements IQueryHandler<GetSmsCampaignQuery> {
  readonly queryType = 'marketing.sms.get';
  constructor(private readonly repo: SmsMarketingRepository) { super(); }
  async execute(query: GetSmsCampaignQuery): Promise<unknown | null> {
    return this.repo.findById(SmsMarketingIdVO.create(query.campaignId));
  }
}
