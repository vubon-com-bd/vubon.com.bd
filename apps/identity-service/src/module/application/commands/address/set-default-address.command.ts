import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
export class SetDefaultAddressCommand extends BaseCommand {
  readonly type = 'user.set-default-address';
  readonly commandType = 'user.set-default-address';
  constructor(
    public readonly addressId: string,
    public readonly scope: 'shipping' | 'billing' | 'both',
  ) { super(); }
}
