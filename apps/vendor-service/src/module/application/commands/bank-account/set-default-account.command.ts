import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetDefaultAccountRequestDTO } from '../../dtos/requests/bank-account/index.js';

export class SetDefaultAccountCommand extends BaseCommand {
  readonly type = 'vendor.bank_account.set_default';
  constructor(
    public readonly dto: SetDefaultAccountRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
