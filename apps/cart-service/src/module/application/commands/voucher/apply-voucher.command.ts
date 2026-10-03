import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApplyVoucherRequestDTO } from '../../dtos/requests/voucher/apply-voucher.dto.js';

export class ApplyVoucherCommand extends BaseCommand {
  readonly type = 'cart.voucher.apply';
  constructor(public readonly dto: ApplyVoucherRequestDTO) { super(); }
}
