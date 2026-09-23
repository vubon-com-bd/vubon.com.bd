import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PauseCampaignCommand } from './pause-campaign.command';
import type { CampaignServiceInterface } from '../../services/interfaces/campaign.service.interface';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';

@CommandHandler(PauseCampaignCommand)
export class PauseCampaignHandler
  extends BaseCommandHandler<PauseCampaignCommand, CampaignResponseDTO>
  implements ICommandHandler<PauseCampaignCommand>
{
  readonly commandType = 'marketing.campaign.pause';

  constructor(private readonly campaignService: CampaignServiceInterface) {
    super();
  }

  async execute(command: PauseCampaignCommand): Promise<CampaignResponseDTO> {
    return this.campaignService.pause(command.campaignId, command.reason);
  }
}
