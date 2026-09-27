/**
 * SetDefaultAddressCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SetDefaultAddressCommand extends BaseCommand {
  readonly type = 'address.set.default';

  constructor(
    public readonly userId: string,
    public readonly addressId: string,
    public readonly asShipping: boolean = false,
    public readonly asBilling: boolean = false
  ) {
    super();
  }
}
