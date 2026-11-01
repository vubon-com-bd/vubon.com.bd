import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetShippingMethodRequestDTO } from '../../dtos/requests/shipping/index.js';

export class SetShippingMethodCommand extends BaseCommand {
  readonly type = 'cart.shipping.set_method';

  constructor(
    public readonly dto: SetShippingMethodRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
