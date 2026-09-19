import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAddressCommand extends BaseCommand {
  readonly type = 'user.update-address';

  constructor(
    public readonly addressId: string,
    public readonly line1?: string,
    public readonly city?: string,
    public readonly country?: string,
    public readonly isDefault?: boolean,
    public readonly line2?: string,
    public readonly state?: string,
    public readonly postalCode?: string,
    public readonly label?: string,
  ) {
    super();
  }
}
