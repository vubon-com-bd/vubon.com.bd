import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ValidatePromotionCommand extends BaseCommand {
  readonly type = 'marketing.promotion.validate';

  constructor(
    public readonly code: string,
    public readonly userId: string,
    public readonly orderAmount: number,
  ) {
    super();
  }
}
