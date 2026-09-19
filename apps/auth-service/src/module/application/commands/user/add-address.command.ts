import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddAddressCommand extends BaseCommand {
  readonly type = 'user.add-address';

  constructor(
    public readonly userId: string,
    public readonly line1: string,
    public readonly city: string,
    public readonly country: string,
    public readonly isDefault: boolean = false,
    public readonly isDefaultShipping: boolean = false,
    public readonly isDefaultBilling: boolean = false,
    public readonly addressType: string = 'home',
    public readonly line2?: string,
    public readonly state?: string,
    public readonly postalCode?: string,
    public readonly label?: string,
  ) {
    super();
  }
}
