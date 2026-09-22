import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddBankAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank-account.add';

  constructor(
    public readonly vendorId: string,
    public readonly accountNumber: string,
    public readonly bankName: string,
    public readonly accountHolderName: string,
    public readonly branchName?: string,
    public readonly routingNumber?: string,
    public readonly isDefault?: boolean,
  ) {
    super();
  }
}
