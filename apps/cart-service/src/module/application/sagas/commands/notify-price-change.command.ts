import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyPriceChangeCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-price-change';
  constructor(public readonly cartId: string, public readonly productId: string) { super(); }
}
