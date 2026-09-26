import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ConfirmOrderCommand extends BaseCommand {
  readonly type = 'order.confirm';

  constructor(
    public readonly orderId: string,
    public readonly paymentId: string,
  ) {
    super();
  }
}
