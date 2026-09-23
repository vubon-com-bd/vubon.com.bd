import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ApproveAffiliateCommand } from './approve-affiliate.command';
import type { AffiliateServiceInterface } from '../../services/interfaces/affiliate.service.interface';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';

@CommandHandler(ApproveAffiliateCommand)
export class ApproveAffiliateHandler
  extends BaseCommandHandler<ApproveAffiliateCommand, AffiliateResponseDTO>
  implements ICommandHandler<ApproveAffiliateCommand>
{
  readonly commandType = 'marketing.affiliate.approve';

  constructor(private readonly affiliateService: AffiliateServiceInterface) {
    super();
  }

  async execute(command: ApproveAffiliateCommand): Promise<AffiliateResponseDTO> {
    return this.affiliateService.approve({
      affiliateId: command.affiliateId,
      approvedBy: command.approvedBy,
    });
  }
}
