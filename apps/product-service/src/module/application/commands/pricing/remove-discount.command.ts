/**
 * RemoveDiscountCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveDiscountCommand extends BaseCommand {
  readonly type = 'pricing.discount.remove';
  constructor(
    public readonly productId: string,
    public readonly actorId: string,
  ) { super(); }
}
