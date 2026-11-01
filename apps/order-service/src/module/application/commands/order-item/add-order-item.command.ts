/**
 * AddOrderItemCommand
 * @module order-service/application/commands/order-item
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddOrderItemCommandDTO } from '../../dtos/requests/order-item/index.js';

export class AddOrderItemCommand extends BaseCommand {
  readonly type = 'order.order-item.add';

  constructor(
    public readonly dto: AddOrderItemCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
