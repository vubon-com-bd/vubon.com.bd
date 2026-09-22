import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class MergeGuestCartCommand extends BaseCommand {
  readonly type = 'cart.guest.merge';

  constructor(
    public readonly guestToken: string,
    public readonly userId: string,
    public readonly strategy?: string,
  ) {
    super();
  }
}
