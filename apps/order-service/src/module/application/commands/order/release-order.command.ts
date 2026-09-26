import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReleaseOrderCommand extends BaseCommand {
  readonly type = 'order.release';

  constructor(public readonly orderId: string) {
    super();
  }
}
