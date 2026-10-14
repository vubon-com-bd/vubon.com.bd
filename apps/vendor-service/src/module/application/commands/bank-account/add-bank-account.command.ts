import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddBankAccountRequestDTO } from '../../dtos/requests/bank-account/index.js';

export class AddBankAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank_account.add';
  constructor(
    public readonly dto: AddBankAccountRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
