import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RedeemReferralRewardCommand } from './redeem-reward.command';
import type { ReferralServiceInterface } from '../../services/interfaces/referral.service.interface';

@CommandHandler(RedeemReferralRewardCommand)
export class RedeemReferralRewardHandler
  extends BaseCommandHandler<RedeemReferralRewardCommand, void>
  implements ICommandHandler<RedeemReferralRewardCommand>
{
  readonly commandType = 'marketing.referral.redeem';

  constructor(private readonly referralService: ReferralServiceInterface) {
    super();
  }

  async execute(command: RedeemReferralRewardCommand): Promise<void> {
    await this.referralService.redeem(command.referralId, command.userId);
  }
}
