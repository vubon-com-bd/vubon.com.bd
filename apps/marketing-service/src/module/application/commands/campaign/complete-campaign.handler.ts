import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteCampaignCommand } from './complete-campaign.command';
import type { CampaignServiceInterface } from '../../services/interfaces/campaign.service.interface';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';

@CommandHandler(CompleteCampaignCommand)
export class CompleteCampaignHandler
  extends BaseCommandHandler<CompleteCampaignCommand, CampaignResponseDTO>
  implements ICommandHandler<CompleteCampaignCommand>
{
  readonly commandType = 'marketing.campaign.complete';

  constructor(private readonly campaignService: CampaignServiceInterface) {
    super();
  }

  async execute(command: CompleteCampaignCommand): Promise<CampaignResponseDTO> {
    return this.campaignService.complete(command.campaignId);
  }
}
