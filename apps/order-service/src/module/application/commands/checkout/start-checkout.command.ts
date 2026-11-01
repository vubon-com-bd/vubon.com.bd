/**
 * StartCheckoutCommand
 * @module order-service/application/commands/checkout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartCheckoutCommandDTO } from '../../dtos/requests/checkout/index.js';

export class StartCheckoutCommand extends BaseCommand {
  readonly type = 'order.checkout.start';

  constructor(
    public readonly dto: StartCheckoutCommandDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
