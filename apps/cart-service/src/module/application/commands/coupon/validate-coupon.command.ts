import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ValidateCouponRequestDTO } from '../../dtos/requests/coupon/index.js';

export class ValidateCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.validate';

  constructor(public readonly dto: ValidateCouponRequestDTO) {
    super();
  }
}
