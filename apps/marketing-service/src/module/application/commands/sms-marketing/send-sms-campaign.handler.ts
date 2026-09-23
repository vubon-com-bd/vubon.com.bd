import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendSmsCampaignCommand } from './send-sms-campaign.command';
import type { SmsMarketingServiceInterface } from '../../services/interfaces/sms-marketing.service.interface';
import type { SmsCampaignResponseDTO } from '../../dtos/responses/sms-campaign-response.dto';

@CommandHandler(SendSmsCampaignCommand)
export class SendSmsCampaignHandler
  extends BaseCommandHandler<SendSmsCampaignCommand, SmsCampaignResponseDTO>
  implements ICommandHandler<SendSmsCampaignCommand>
{
  readonly commandType = 'marketing.sms-marketing.send';
  constructor(private readonly service: SmsMarketingServiceInterface) { super(); }
  async execute(command: SendSmsCampaignCommand): Promise<SmsCampaignResponseDTO> {
    return this.service.send(command.campaignId, command.recipientIds);
  }
}
