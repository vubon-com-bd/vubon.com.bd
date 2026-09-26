import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestReturnCommand extends BaseCommand {
  readonly type = 'order.return.request';

  constructor(
    public readonly orderId: string,
    public readonly reason: string,
    public readonly itemIds?: readonly string[],
  ) {
    super();
  }
}
