import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EarnPointsCommand extends BaseCommand {
  readonly type = 'marketing.loyalty.earn-points';

  constructor(
    public readonly userId: string,
    public readonly points: number,
    public readonly reason?: string,
    public readonly orderId?: string,
  ) {
    super();
  }
}
