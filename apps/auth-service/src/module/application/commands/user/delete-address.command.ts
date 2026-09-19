import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteAddressCommand extends BaseCommand {
  readonly type = 'user.delete-address';

  constructor(public readonly addressId: string) {
    super();
  }
}
