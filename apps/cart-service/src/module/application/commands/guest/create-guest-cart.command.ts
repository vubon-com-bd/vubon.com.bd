import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateGuestCartCommand extends BaseCommand {
  readonly type = 'cart.guest.create';

  constructor(
    public readonly currency: string,
    public readonly ttlHours?: number,
  ) {
    super();
  }
}
