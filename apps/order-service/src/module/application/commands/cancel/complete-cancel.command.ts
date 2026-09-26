import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteCancelCommand extends BaseCommand {
  readonly type = 'order.cancel.complete';

  constructor(public readonly cancelId: string) {
    super();
  }
}
