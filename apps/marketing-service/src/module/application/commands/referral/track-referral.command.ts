import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrackReferralCommand extends BaseCommand {
  readonly type = 'marketing.referral.track';

  constructor(
    public readonly code: string,
    public readonly refereeId?: string,
  ) {
    super();
  }
}
