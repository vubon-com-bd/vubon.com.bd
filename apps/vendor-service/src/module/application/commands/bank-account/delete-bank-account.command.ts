import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteBankAccountRequestDTO } from '../../dtos/requests/bank-account/index.js';

export class DeleteBankAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank_account.delete';
  constructor(public readonly dto: DeleteBankAccountRequestDTO) {
    super();
  }
}
