/**
 * DeleteOrderCommand
 * @module order-service/application/commands/order
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteOrderCommandDTO } from '../../dtos/requests/order/index.js';

export class DeleteOrderCommand extends BaseCommand {
  readonly type = 'order.order.delete';

  constructor(
    public readonly dto: DeleteOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
