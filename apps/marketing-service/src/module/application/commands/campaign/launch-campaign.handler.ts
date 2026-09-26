import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LaunchCampaignCommand } from './launch-campaign.command';
import type { CampaignServiceInterface } from '../../services/interfaces/campaign.service.interface';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';

@CommandHandler(LaunchCampaignCommand)
export class LaunchCampaignHandler
  extends BaseCommandHandler<LaunchCampaignCommand, CampaignResponseDTO>
  implements ICommandHandler<LaunchCampaignCommand>
{
  readonly commandType = 'marketing.campaign.launch';

  constructor(private readonly campaignService: CampaignServiceInterface) {
    super();
  }

  async execute(command: LaunchCampaignCommand): Promise<CampaignResponseDTO> {
    return this.campaignService.launch({
      campaignId: command.campaignId,
      userId: command.userId,
    });
  }
}
