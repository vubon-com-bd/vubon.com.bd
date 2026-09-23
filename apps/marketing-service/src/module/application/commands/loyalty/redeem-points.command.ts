import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RedeemPointsCommand extends BaseCommand {
  readonly type = 'marketing.loyalty.redeem-points';

  constructor(
    public readonly userId: string,
    public readonly points: number,
  ) {
    super();
  }
}
