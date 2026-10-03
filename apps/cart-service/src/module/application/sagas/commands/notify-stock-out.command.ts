import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class NotifyStockOutCommand extends BaseCommand {
  readonly type = 'saga.stock.notify-out';
  constructor(
    public readonly cartId: string,
    public readonly itemId: string,
    public readonly productId: string,
  ) { super(); }
}
