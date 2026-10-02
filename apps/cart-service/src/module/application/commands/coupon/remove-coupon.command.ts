import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveCouponRequestDTO } from '../../dtos/requests/coupon/remove-coupon.dto.js';

export class RemoveCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.remove';
  constructor(public readonly dto: RemoveCouponRequestDTO) { super(); }
}
