import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateOrderCommand extends BaseCommand {
  readonly type = 'order.update';

  constructor(
    public readonly orderId: string,
    public readonly note?: string,
    public readonly channel?: string,
    public readonly source?: string,
  ) {
    super();
  }
}
