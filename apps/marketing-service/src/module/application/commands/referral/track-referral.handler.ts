import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrackReferralCommand } from './track-referral.command';
import type { ReferralServiceInterface } from '../../services/interfaces/referral.service.interface';

@CommandHandler(TrackReferralCommand)
export class TrackReferralHandler
  extends BaseCommandHandler<TrackReferralCommand, void>
  implements ICommandHandler<TrackReferralCommand>
{
  readonly commandType = 'marketing.referral.track';

  constructor(private readonly referralService: ReferralServiceInterface) {
    super();
  }

  async execute(command: TrackReferralCommand): Promise<void> {
    await this.referralService.track({
      code: command.code,
      refereeId: command.refereeId,
    });
  }
}
