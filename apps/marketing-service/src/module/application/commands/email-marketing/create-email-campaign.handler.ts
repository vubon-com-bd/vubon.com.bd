import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateEmailCampaignCommand } from './create-email-campaign.command';
import type { EmailMarketingServiceInterface } from '../../services/interfaces/email-marketing.service.interface';
import type { EmailCampaignResponseDTO } from '../../dtos/responses/email-campaign-response.dto';

@CommandHandler(CreateEmailCampaignCommand)
export class CreateEmailCampaignHandler
  extends BaseCommandHandler<CreateEmailCampaignCommand, EmailCampaignResponseDTO>
  implements ICommandHandler<CreateEmailCampaignCommand>
{
  readonly commandType = 'marketing.email-marketing.create-campaign';

  constructor(private readonly service: EmailMarketingServiceInterface) {
    super();
  }

  async execute(command: CreateEmailCampaignCommand): Promise<EmailCampaignResponseDTO> {
    return this.service.create({
      name: command.name,
      subject: command.subject,
      content: command.content,
      templateId: command.templateId,
    } as never);
  }
}
