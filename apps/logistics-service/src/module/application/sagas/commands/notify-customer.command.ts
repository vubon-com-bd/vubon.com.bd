import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyCustomerCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.notify-customer';

  constructor(
    public readonly userId: string,
    public readonly eventType: string,
    public readonly message: string,
  ) {
    super();
  }
}
