import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.approve';

  constructor(
    public readonly cancelId: string,
    public readonly approvedBy: string,
  ) {
    super();
  }
}
