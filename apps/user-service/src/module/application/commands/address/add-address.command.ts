import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddAddressCommand extends BaseCommand {
  readonly type = 'user.address.add';

  constructor(
    public readonly userId: string,
    public readonly line1: string,
    public readonly city: string,
    public readonly district: string,
    public readonly division: string,
    public readonly country: string = 'BD',
    public readonly isDefault: boolean = false,
    public readonly line2?: string,
    public readonly postalCode?: string,
    public readonly label?: string,
  ) {
    super();
  }
}
