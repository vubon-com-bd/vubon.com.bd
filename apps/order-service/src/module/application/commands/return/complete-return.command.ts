import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteReturnCommand extends BaseCommand {
  readonly type = 'order.return.complete';

  constructor(public readonly returnId: string) {
    super();
  }
}
