/**
 * UpdateOrderCommand
 * @module order-service/application/commands/order
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateOrderCommandDTO } from '../../dtos/requests/order/index.js';

export class UpdateOrderCommand extends BaseCommand {
  readonly type = 'order.order.update';

  constructor(
    public readonly dto: UpdateOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
