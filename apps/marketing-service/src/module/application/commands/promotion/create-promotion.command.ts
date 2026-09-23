import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreatePromotionCommand extends BaseCommand {
  readonly type = 'marketing.promotion.create';

  constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly promotionType: string,
    public readonly maxUsage?: number,
    public readonly startDate?: string,
    public readonly endDate?: string,
  ) {
    super();
  }
}
