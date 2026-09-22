import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyCustomerCommand extends BaseSagaCommand {
  readonly type = 'saga.order.notify-customer';

  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly event: string,
  ) {
    super();
  }
}
