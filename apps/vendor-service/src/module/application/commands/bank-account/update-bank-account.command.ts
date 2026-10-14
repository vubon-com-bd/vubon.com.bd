import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateBankAccountRequestDTO } from '../../dtos/requests/bank-account/index.js';

export class UpdateBankAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank_account.update';
  constructor(
    public readonly dto: UpdateBankAccountRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
