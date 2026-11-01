/**
 * AbandonCheckoutCommand
 * @module order-service/application/commands/checkout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AbandonCheckoutCommandDTO } from '../../dtos/requests/checkout/index.js';

export class AbandonCheckoutCommand extends BaseCommand {
  readonly type = 'order.checkout.abandon';

  constructor(
    public readonly dto: AbandonCheckoutCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
