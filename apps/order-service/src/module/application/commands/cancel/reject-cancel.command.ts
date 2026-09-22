import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.reject';

  constructor(
    public readonly cancelId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
