/**
 * HoldOrderCommand
 * @module order-service/application/commands/order
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HoldOrderCommandDTO } from '../../dtos/requests/order/index.js';

export class HoldOrderCommand extends BaseCommand {
  readonly type = 'order.order.hold';

  constructor(
    public readonly dto: HoldOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
