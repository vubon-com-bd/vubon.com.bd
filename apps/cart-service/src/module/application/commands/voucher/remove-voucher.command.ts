import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveVoucherRequestDTO } from '../../dtos/requests/voucher/remove-voucher.dto.js';

export class RemoveVoucherCommand extends BaseCommand {
  readonly type = 'cart.voucher.remove';
  constructor(public readonly dto: RemoveVoucherRequestDTO) { super(); }
}
