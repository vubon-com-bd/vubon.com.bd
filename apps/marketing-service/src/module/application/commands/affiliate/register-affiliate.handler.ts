import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterAffiliateCommand } from './register-affiliate.command';
import type { AffiliateServiceInterface } from '../../services/interfaces/affiliate.service.interface';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';

@CommandHandler(RegisterAffiliateCommand)
export class RegisterAffiliateHandler
  extends BaseCommandHandler<RegisterAffiliateCommand, AffiliateResponseDTO>
  implements ICommandHandler<RegisterAffiliateCommand>
{
  readonly commandType = 'marketing.affiliate.register';

  constructor(private readonly affiliateService: AffiliateServiceInterface) {
    super();
  }

  async execute(command: RegisterAffiliateCommand): Promise<AffiliateResponseDTO> {
    return this.affiliateService.register({
      userId: command.userId,
      commissionRate: command.commissionRate,
    });
  }
}
