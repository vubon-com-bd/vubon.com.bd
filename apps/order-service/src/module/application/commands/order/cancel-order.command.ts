import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelOrderCommand extends BaseCommand {
  readonly type = 'order.cancel';

  constructor(
    public readonly orderId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
