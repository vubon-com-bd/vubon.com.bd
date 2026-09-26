import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleEmailCampaignCommand } from './schedule-email-campaign.command';
import type { EmailMarketingServiceInterface } from '../../services/interfaces/email-marketing.service.interface';
import type { EmailCampaignResponseDTO } from '../../dtos/responses/email-campaign-response.dto';

@CommandHandler(ScheduleEmailCampaignCommand)
export class ScheduleEmailCampaignHandler
  extends BaseCommandHandler<ScheduleEmailCampaignCommand, EmailCampaignResponseDTO>
  implements ICommandHandler<ScheduleEmailCampaignCommand>
{
  readonly commandType = 'marketing.email-marketing.schedule';

  constructor(private readonly service: EmailMarketingServiceInterface) {
    super();
  }

  async execute(command: ScheduleEmailCampaignCommand): Promise<EmailCampaignResponseDTO> {
    return this.service.schedule(command.campaignId, command.scheduledAt);
  }
}
