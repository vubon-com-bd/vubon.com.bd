/**
 * DeleteAddressCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteAddressCommand extends BaseCommand {
  readonly type = 'address.delete';

  constructor(
    public readonly userId: string,
    public readonly addressId: string
  ) {
    super();
  }
}
