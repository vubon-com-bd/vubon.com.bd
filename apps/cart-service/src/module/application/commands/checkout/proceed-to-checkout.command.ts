import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ProceedToCheckoutRequestDTO } from '../../dtos/requests/checkout/index.js';

export class ProceedToCheckoutCommand extends BaseCommand {
  readonly type = 'cart.checkout.proceed';

  constructor(
    public readonly dto: ProceedToCheckoutRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
