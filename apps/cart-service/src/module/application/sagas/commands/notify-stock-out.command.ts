import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyStockOutCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-stock-out';
  constructor(public readonly cartId: string, public readonly productId: string) { super(); }
}
