import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveOrderItemCommand extends BaseCommand {
  readonly type = 'order.item.remove';

  constructor(public readonly itemId: string) {
    super();
  }
}
