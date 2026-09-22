import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PauseRecurringCommand extends BaseCommand {
  readonly type = 'recurring.pause';

  constructor(
    public readonly recurringId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
