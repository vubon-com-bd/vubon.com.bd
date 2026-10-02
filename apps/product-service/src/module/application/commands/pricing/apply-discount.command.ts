/**
 * ApplyDiscountCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ApplyDiscountCommand extends BaseCommand {
  readonly type = 'pricing.discount.apply';
  constructor(
    public readonly productId: string,
    public readonly discountPercent: number,
    public readonly actorId: string,
  ) { super(); }
}
