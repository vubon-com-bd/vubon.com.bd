import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpgradeTierCommand } from './upgrade-tier.command';
import type { LoyaltyServiceInterface } from '../../services/interfaces/loyalty.service.interface';
import type { LoyaltyResponseDTO } from '../../dtos/responses/loyalty-response.dto';

@CommandHandler(UpgradeTierCommand)
export class UpgradeTierHandler
  extends BaseCommandHandler<UpgradeTierCommand, LoyaltyResponseDTO>
  implements ICommandHandler<UpgradeTierCommand>
{
  readonly commandType = 'marketing.loyalty.upgrade-tier';

  constructor(private readonly loyaltyService: LoyaltyServiceInterface) {
    super();
  }

  async execute(command: UpgradeTierCommand): Promise<LoyaltyResponseDTO> {
    return this.loyaltyService.upgradeTier(command.userId, command.targetTier);
  }
}
