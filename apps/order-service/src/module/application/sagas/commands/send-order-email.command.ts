import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendOrderEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.order.send-email';

  constructor(
    public readonly orderId: string,
    public readonly template: string,
  ) {
    super();
  }
}
