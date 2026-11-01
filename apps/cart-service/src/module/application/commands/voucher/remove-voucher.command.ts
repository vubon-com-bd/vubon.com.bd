import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveVoucherRequestDTO } from '../../dtos/requests/voucher/index.js';

export class RemoveVoucherCommand extends BaseCommand {
  readonly type = 'cart.voucher.remove';

  constructor(
    public readonly dto: RemoveVoucherRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
