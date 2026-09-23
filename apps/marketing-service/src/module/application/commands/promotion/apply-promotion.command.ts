import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApplyPromotionCommand extends BaseCommand {
  readonly type = 'marketing.promotion.apply';

  constructor(
    public readonly code: string,
    public readonly userId: string,
    public readonly orderAmount: number,
  ) {
    super();
  }
}
