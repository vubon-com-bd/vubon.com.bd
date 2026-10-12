import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InitiateCheckoutRequestDTO } from '../../dtos/requests/checkout/initiate-checkout.dto.js';

export class InitiateCartCheckoutCommand extends BaseCommand {
  readonly type = 'cart.checkout.initiate';
  constructor(
    public readonly dto: InitiateCheckoutRequestDTO,
    public readonly actorId?: string,
  ) { super(); }
}
