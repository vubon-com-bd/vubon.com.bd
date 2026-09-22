import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetDefaultAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank-account.set-default';

  constructor(
    public readonly accountId: string,
    public readonly vendorId: string,
  ) {
    super();
  }
}
