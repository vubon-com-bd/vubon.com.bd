import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveReturnCommand extends BaseCommand {
  readonly type = 'order.return.approve';

  constructor(
    public readonly returnId: string,
    public readonly approvedBy: string,
  ) {
    super();
  }
}
