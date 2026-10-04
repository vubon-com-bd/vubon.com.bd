import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class NotifyCustomerCommand extends BaseCommand {
  readonly type = 'saga.notify_customer';
  constructor(
    public readonly customerId: string,
    public readonly orderId: string,
    public readonly event: string,
    public readonly payload?: Readonly<Record<string, unknown>>,
  ) { super(); }
}
