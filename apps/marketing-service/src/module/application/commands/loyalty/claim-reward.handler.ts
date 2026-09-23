import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ClaimRewardCommand } from './claim-reward.command';
import type { LoyaltyRewardServiceInterface } from '../../services/interfaces/loyalty-reward.service.interface';

@CommandHandler(ClaimRewardCommand)
export class ClaimRewardHandler
  extends BaseCommandHandler<ClaimRewardCommand, void>
  implements ICommandHandler<ClaimRewardCommand>
{
  readonly commandType = 'marketing.loyalty.claim-reward';

  constructor(private readonly rewardService: LoyaltyRewardServiceInterface) {
    super();
  }

  async execute(command: ClaimRewardCommand): Promise<void> {
    await this.rewardService.claim(command.userId, command.rewardId);
  }
}
