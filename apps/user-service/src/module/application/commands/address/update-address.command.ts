import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAddressCommand extends BaseCommand {
  readonly type = 'user.address.update';

  constructor(
    public readonly addressId: string,
    public readonly line1?: string,
    public readonly line2?: string,
    public readonly city?: string,
    public readonly district?: string,
    public readonly division?: string,
    public readonly postalCode?: string,
    public readonly label?: string,
    public readonly isDefault?: boolean,
  ) {
    super();
  }
}
