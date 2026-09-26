import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteBankAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank-account.delete';

  constructor(public readonly accountId: string) {
    super();
  }
}
