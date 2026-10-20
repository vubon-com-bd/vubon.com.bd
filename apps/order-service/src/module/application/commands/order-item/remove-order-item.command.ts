/**
 * RemoveOrderItemCommand
 * @module order-service/application/commands/order-item
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveOrderItemCommandDTO } from '../../dtos/requests/order-item/index.js';

export class RemoveOrderItemCommand extends BaseCommand {
  readonly type = 'order.order-item.remove';

  constructor(
    public readonly dto: RemoveOrderItemCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
