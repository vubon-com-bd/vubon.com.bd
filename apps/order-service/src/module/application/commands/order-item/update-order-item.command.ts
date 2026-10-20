/**
 * UpdateOrderItemCommand
 * @module order-service/application/commands/order-item
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateOrderItemCommandDTO } from '../../dtos/requests/order-item/index.js';

export class UpdateOrderItemCommand extends BaseCommand {
  readonly type = 'order.order-item.update';

  constructor(
    public readonly dto: UpdateOrderItemCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
