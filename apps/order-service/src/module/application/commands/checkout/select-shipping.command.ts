/**
 * SelectShippingCommand
 * @module order-service/application/commands/checkout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectShippingCommandDTO } from '../../dtos/requests/checkout/index.js';

export class SelectShippingCommand extends BaseCommand {
  readonly type = 'order.checkout.select-shipping';

  constructor(
    public readonly dto: SelectShippingCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
