import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class NotifyCustomerCommand extends BaseCommand {
  readonly type = 'saga.notify_customer';
  constructor(
    public readonly customerId: string,
    public readonly paymentId: string,
    public readonly template: string,
    public readonly data?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
