import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CalculateShippingRequestDTO } from '../../dtos/requests/shipping/index.js';

export class CalculateShippingCommand extends BaseCommand {
  readonly type = 'cart.shipping.calculate';

  constructor(public readonly dto: CalculateShippingRequestDTO) {
    super();
  }
}
