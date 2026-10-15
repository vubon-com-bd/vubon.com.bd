import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveCouponRequestDTO } from '../../dtos/requests/coupon/index.js';

export class RemoveCouponCommand extends BaseCommand {
  readonly type = 'cart.coupon.remove';

  constructor(
    public readonly dto: RemoveCouponRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
