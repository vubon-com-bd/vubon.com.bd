import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListEmailCampaignsQuery } from './list-email-campaigns.query';
import type { EmailCampaignRepository } from '../../../domain/repositories/email-campaign.repository.interface';
import { EmailCampaignStatusVO } from '../../../domain/value-objects/primitives/email-campaign-status.vo';

@QueryHandler(ListEmailCampaignsQuery)
export class ListEmailCampaignsHandler
  extends BaseQueryHandler<ListEmailCampaignsQuery, readonly unknown[]>
  implements IQueryHandler<ListEmailCampaignsQuery> {
  readonly queryType = 'marketing.email.list';
  constructor(private readonly repo: EmailCampaignRepository) { super(); }
  async execute(query: ListEmailCampaignsQuery): Promise<readonly unknown[]> {
    if (!query.status) return [];
    return this.repo.findByStatus(EmailCampaignStatusVO.create(query.status));
  }
}
