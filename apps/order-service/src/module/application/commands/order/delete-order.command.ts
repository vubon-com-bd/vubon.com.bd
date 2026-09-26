import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteOrderCommand extends BaseCommand {
  readonly type = 'order.delete';

  constructor(public readonly orderId: string) {
    super();
  }
}
