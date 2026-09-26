import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendEmailCampaignCommand } from './send-email-campaign.command';
import type { EmailMarketingServiceInterface } from '../../services/interfaces/email-marketing.service.interface';
import type { EmailCampaignResponseDTO } from '../../dtos/responses/email-campaign-response.dto';

@CommandHandler(SendEmailCampaignCommand)
export class SendEmailCampaignHandler
  extends BaseCommandHandler<SendEmailCampaignCommand, EmailCampaignResponseDTO>
  implements ICommandHandler<SendEmailCampaignCommand>
{
  readonly commandType = 'marketing.email-marketing.send';

  constructor(private readonly service: EmailMarketingServiceInterface) {
    super();
  }

  async execute(command: SendEmailCampaignCommand): Promise<EmailCampaignResponseDTO> {
    return this.service.send(command.campaignId, command.recipientIds);
  }
}
