import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApplyCouponRequestDTO } from '../../dtos/requests/coupon/apply-coupon.dto.js';

export class ApplyCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.apply';
  constructor(public readonly dto: ApplyCouponRequestDTO) { super(); }
}
