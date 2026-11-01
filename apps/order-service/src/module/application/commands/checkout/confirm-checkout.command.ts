/**
 * ConfirmCheckoutCommand
 * @module order-service/application/commands/checkout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmCheckoutCommandDTO } from '../../dtos/requests/checkout/index.js';

export class ConfirmCheckoutCommand extends BaseCommand {
  readonly type = 'order.checkout.confirm';

  constructor(
    public readonly dto: ConfirmCheckoutCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
