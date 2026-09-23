import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetEmailCampaignQuery } from './get-email-campaign.query';
import type { EmailMarketingRepository } from '../../../domain/repositories/email-marketing.repository.interface';
import { EmailMarketingIdVO } from '../../../domain/value-objects/primitives/email-marketing-id.vo';
import type { EmailCampaignResponseDTO } from '../../dtos/responses/email-campaign-response.dto';

@QueryHandler(GetEmailCampaignQuery)
export class GetEmailCampaignHandler
  extends BaseQueryHandler<GetEmailCampaignQuery, EmailCampaignResponseDTO | null>
  implements IQueryHandler<GetEmailCampaignQuery> {
  readonly queryType = 'marketing.email.get';

  constructor(private readonly repo: EmailMarketingRepository) { super(); }

  async execute(query: GetEmailCampaignQuery): Promise<EmailCampaignResponseDTO | null> {
    const entity = await this.repo.findById(EmailMarketingIdVO.create(query.campaignId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      name: entity.name,
      subject: entity.subject,
      content: entity.content,
      status: entity.status.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as EmailCampaignResponseDTO;
  }
}
