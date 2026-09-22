import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.request';

  constructor(
    public readonly orderId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
