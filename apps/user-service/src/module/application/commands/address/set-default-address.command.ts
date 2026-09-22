import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetDefaultAddressCommand extends BaseCommand {
  readonly type = 'user.address.set-default';

  constructor(
    public readonly userId: string,
    public readonly addressId: string,
  ) {
    super();
  }
}
