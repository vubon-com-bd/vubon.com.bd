import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveSavedCommand extends BaseCommand {
  readonly type = 'cart.saved.remove';

  constructor(public readonly savedItemId: string) {
    super();
  }
}
