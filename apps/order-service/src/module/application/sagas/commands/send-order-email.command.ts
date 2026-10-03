import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SendOrderEmailCommand extends BaseCommand {
  readonly type = 'saga.send_order_email';
  constructor(
    public readonly orderId: string,
    public readonly recipientEmail: string,
    public readonly template: 'created' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned',
  ) { super(); }
}
