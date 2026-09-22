import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectReturnCommand extends BaseCommand {
  readonly type = 'order.return.reject';

  constructor(
    public readonly returnId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
