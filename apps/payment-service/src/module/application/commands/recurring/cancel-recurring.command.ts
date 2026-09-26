import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelRecurringCommand extends BaseCommand {
  readonly type = 'recurring.cancel';

  constructor(
    public readonly recurringId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
