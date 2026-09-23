import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateCampaignCommand } from './create-campaign.command';
import type { CampaignServiceInterface } from '../../services/interfaces/campaign.service.interface';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';

@CommandHandler(CreateCampaignCommand)
export class CreateCampaignHandler
  extends BaseCommandHandler<CreateCampaignCommand, CampaignResponseDTO>
  implements ICommandHandler<CreateCampaignCommand>
{
  readonly commandType = 'marketing.campaign.create';

  constructor(private readonly campaignService: CampaignServiceInterface) {
    super();
  }

  async execute(command: CreateCampaignCommand): Promise<CampaignResponseDTO> {
    return this.campaignService.create({
      name: command.name,
      type: command.campaignType,
      channel: command.channel,
      createdBy: command.createdBy,
      startDate: command.startDate,
      endDate: command.endDate,
    } as never);
  }
}
