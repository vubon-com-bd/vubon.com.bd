import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetShippingMethodRequestDTO } from '../../dtos/requests/shipping/set-shipping-method.dto.js';

export class SetShippingMethodCommand extends BaseCommand {
  readonly type = 'cart.shipping.set-method';
  constructor(public readonly dto: SetShippingMethodRequestDTO) { super(); }
}
