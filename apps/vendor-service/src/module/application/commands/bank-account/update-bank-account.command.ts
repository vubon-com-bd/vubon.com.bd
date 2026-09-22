import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateBankAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank-account.update';

  constructor(
    public readonly accountId: string,
    public readonly accountHolderName?: string,
    public readonly branchName?: string,
    public readonly routingNumber?: string,
  ) {
    super();
  }
}
