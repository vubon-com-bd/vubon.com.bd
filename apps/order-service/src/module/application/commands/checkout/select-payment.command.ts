/**
 * SelectPaymentCommand
 * @module order-service/application/commands/checkout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectPaymentCommandDTO } from '../../dtos/requests/checkout/index.js';

export class SelectPaymentCommand extends BaseCommand {
  readonly type = 'order.checkout.select-payment';

  constructor(
    public readonly dto: SelectPaymentCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
