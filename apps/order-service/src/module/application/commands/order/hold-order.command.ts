import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class HoldOrderCommand extends BaseCommand {
  readonly type = 'order.hold';

  constructor(
    public readonly orderId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
