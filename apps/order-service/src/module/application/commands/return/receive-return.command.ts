import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReceiveReturnCommand extends BaseCommand {
  readonly type = 'order.return.receive';

  constructor(
    public readonly returnId: string,
    public readonly receivedBy: string,
  ) {
    super();
  }
}
