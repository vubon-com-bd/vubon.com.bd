import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class NotifyPriceChangeCommand extends BaseCommand {
  readonly type = 'saga.price.notify-change';
  constructor(
    public readonly cartId: string,
    public readonly productId: string,
    public readonly oldPrice: number,
    public readonly newPrice: number,
    public readonly currency: string,
  ) { super(); }
}
