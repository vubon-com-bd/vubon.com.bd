/**
 * SelectAddressCommand
 * @module order-service/application/commands/checkout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectAddressCommandDTO } from '../../dtos/requests/checkout/index.js';

export class SelectAddressCommand extends BaseCommand {
  readonly type = 'order.checkout.select-address';

  constructor(
    public readonly dto: SelectAddressCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
