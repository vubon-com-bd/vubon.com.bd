import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSmsCampaignCommand } from './create-sms-campaign.command';
import type { SmsMarketingServiceInterface } from '../../services/interfaces/sms-marketing.service.interface';
import type { SmsCampaignResponseDTO } from '../../dtos/responses/sms-campaign-response.dto';

@CommandHandler(CreateSmsCampaignCommand)
export class CreateSmsCampaignHandler
  extends BaseCommandHandler<CreateSmsCampaignCommand, SmsCampaignResponseDTO>
  implements ICommandHandler<CreateSmsCampaignCommand>
{
  readonly commandType = 'marketing.sms-marketing.create';
  constructor(private readonly service: SmsMarketingServiceInterface) { super(); }
  async execute(command: CreateSmsCampaignCommand): Promise<SmsCampaignResponseDTO> {
    return this.service.create({ name: command.name, content: command.content } as never);
  }
}
